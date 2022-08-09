import PropTypes from 'prop-types';
// import { Button } from '../Button/Button';
import { ModalStyled, Overlay } from './Modal.styled.js';
import { useEffect } from 'react';

export const Modal = ({imageLargeModal, closeModal}) => {

  useEffect(() => {
    const onEsc = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onEsc);
    //   window.removeEventListener('keydown', onEsc);
  });

  const onBackground = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={onBackground}>
      <ModalStyled>
        <img src={imageLargeModal} alt="" />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  imageLargeModal: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
