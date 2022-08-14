import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { getImages, perPage } from '../services/api';
import { mapperImages } from './Utils/mapper';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { AppStyle } from './App.styled';

export const App = () => {
  const [page, setPage] = useState(1);
  const [queryValue, setQueryValue] = useState('');
  const [images, setImages] = useState([]);
  const [imageModal, setImageModal] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // --------- fetchImages ---------------
    const fetchImages = (queryValue, page) => {
      console.log(page);
      console.log(queryValue);
      //---------------------  isLoading: false  ----------------------------
      setLoading(true);

      getImages(queryValue, page)
        .then(data => {
          // console.log(data);

          setImages(prevState => [...prevState, ...mapperImages(data.hits)]);
          setHasNextPage(page * perPage < data.total);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          //---------------------  isLoading: false  ----------------------------
          setLoading(false);
        });
    };
    //----------------------------------------
    if (!queryValue) return;

    //---------------------  isLoading: true  ----------------------------
    setLoading(true);
    // --------- fetchImages ---------------
    fetchImages(queryValue, page);
  }, [queryValue, page]);

  const handleSearchBarSubmit = queryValue => {
    console.log(queryValue);

    setQueryValue(queryValue);
    setPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = imageLargeModal => {
    setImageModal(imageLargeModal);
  };

  const closeModal = () => {
    setImageModal('');
  };

  return (
    <AppStyle>
      <Searchbar onSubmitApp={handleSearchBarSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onLargeImage={openModal} />
      )}

      {imageModal && (
        <Modal imageLargeModal={imageModal} closeModal={closeModal} />
      )}

      {isLoading && <Loader />}

      {hasNextPage && <Button text="Load more" handleClick={incrementPage} />}
    </AppStyle>
  );
};
