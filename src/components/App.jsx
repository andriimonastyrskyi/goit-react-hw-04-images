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
  //  const [error]: '',
  //  const [totalImages]: 0,

  // componentDidUpdate(prevProps, prevState) {
  //   const { inputValue, page } = this.state;
  //   if (prevState.inputValue !== inputValue || prevState.page !== page) {
  //     this.getImages(inputValue);
  //   }
  // }

  // useEffect(() => {
  //   const { inputValue, page } = this.state;
  //   this.setState({ isLoading: true, error: '' });

  //   fetchImages(inputValue, page)
  //     .then(({ hits, totalHits }) => {
  //       const images = hits.map(({ id, tag }) => ({ id, tags }));
  //       this.setState(prevState => {
  //         return {
  //           images: [...prevState.images, ...hits],
  //           totalImages: totalHits,
  //         };
  //       });
  //     })
  //     .catch(error => this.setState({ error: 'something went wrong' }))
  //     .finally(() => {
  //       this.setState({ isLoading: false });
  //     });
  // };

  // getInputValue = value => {
  //   this.setState({ inputValue: value, images: [], page: 1, totalImages: 0 });
  // };

  // loadMore = () => {
  //   this.setState(prevState => {
  //     return {
  //       page: prevState.page + 1,
  //     };
  //   });
  // };

  // openModal = url => {
  //   this.setState({ currentPreview: url });
  // };

  // closeModal = () => {
  //   this.setState({ currentPreview: '' });
  // };

  // render() {
  //   const { images, currentPreview, isLoading, error, totalImages } =
  //     this.state;
  //   return (
  //     <>
  //       <Searchbar onSubmit={this.getInputValue} />
  //       {images.length !== 0 && (
  //         <>
  //           <ImageGallery
  //             images={this.state.images}
  //             openModal={this.openModal}
  //           />

  //           {!isLoading && totalImages !== images.length && (
  //             <Button text="Load more" clickHandler={this.loadMore} />
  //           )}
  //         </>
  //       )}
  //       {isLoading && (
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}
  //         >
  //           <InfinitySpin width="400" color="#4c2ef7" />
  //         </div>
  //       )}
  //       {error && <p>{error}</p>}
  //       {currentPreview && (
  //         <Modal closeModal={this.closeModal} showModal={currentPreview} />
  //       )}
  //     </>
  //   );
  // }
  useEffect(() => {
    if (inputValue) {
      setisLoading(true);
      fetchImages(inputValue, page)
        .then(({ data: { hits } }) => {
          setImages(prevImages => {
            return [...prevImages, ...hits];
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          setisLoading(false);
        });
    }
  }, [page, inputValue]);

  const getInputValue = value => {
    setinputValue(value);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
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
        <>
          <ImageGallery images={images} openModal={openModal} />

          {!isLoading && <Button text="Load more" clickHandler={loadMore} />}
        </>
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
