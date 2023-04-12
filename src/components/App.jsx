import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../services/api';
import { Modal } from './Modal/Modal';
import { InfinitySpin } from 'react-loader-spinner';
import { Button } from './Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setinputValue] = useState('');
  const [currentPreview, setcurrentPreview] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!inputValue) return;

    setisLoading(true);
    fetchImages(inputValue, page)
      .then(({ data: { hits, totalHits } }) => {
        setImages(prevImages => {
          return [...prevImages, ...hits];
        });
        setTotalImages(totalHits);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setisLoading(false);
      });
  }, [page, inputValue]);

  const getInputValue = value => {
    setinputValue(value);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setcurrentPreview(url);
  };

  const closeModal = () => {
    setcurrentPreview('');
  };

  return (
    <>
      <Searchbar onSubmit={getInputValue} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {!isLoading && images.length !== totalImages && (
        <Button text="Load more" clickHandler={loadMore} />
      )}
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InfinitySpin width="400" color="#4c2ef7" />
        </div>
      )}
      {currentPreview && (
        <Modal closeModal={closeModal} showModal={currentPreview} />
      )}
    </>
  );
};
