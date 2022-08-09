import { useState, useEffect } from 'react';
// import { Audio } from 'react-loader-spinner';
import { getImages, perPage } from '../services/api';
import { mapperImages } from './Utils/mapper';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { AppStyle } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export const App = () => {
  const [page, setPage] = useState(1);
  const [queryValue, setQueryValue] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [imageModal, setImageModal] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchImages = (queryValue, page) => {
      console.log(page);
      console.log(queryValue);

      getImages(queryValue, page)
        .then(data => {
          console.log(data);

          setImages(prevState => [
            ...prevState.images,
            ...mapperImages(data.hits),
          ]);
          setStatus(Status.RESOLVED);
          setHasNextPage(page * perPage < data.total);
        })
        .catch(error => {
          setStatus(Status.REJECTED);
        });
    };
    //----------------------------------------
    if (!queryValue) return;
    // ---------Status.PENDING---------------
    setStatus(Status.PENDING);

    // --------- fetchImages ---------------
    fetchImages();
  }, [queryValue, page, perPage]);

  const handleSearchBarSubmit = queryValue => {
    console.log(queryValue);

    setQueryValue(queryValue);
    setPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setPage(prevState => prevState.page + 1);
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

      <ImageGallery images={images} onLargeImage={openModal} />

      {imageModal && (
        <Modal imageLargeModal={imageModal} closeModal={closeModal} />
      )}

      {hasNextPage && <Button text="Load more" handleClick={incrementPage} />}
    </AppStyle>
  );
};

//-----------------------------
// {
//   status && (
//     <Audio
//       height="80"
//       width="80"
//       radius="9"
//       color="green"
//       ariaLabel="three-dots-loading"
//       wrapperStyle
//       wrapperClass
//     />
//   );
// }
