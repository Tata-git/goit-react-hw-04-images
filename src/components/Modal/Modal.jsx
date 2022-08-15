import PropTypes from 'prop-types';
import { ModalStyled, Overlay } from './Modal.styled.js';
import { useEffect } from 'react';

export const Modal = ({ imageLargeModal, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  });

  const onEsc = e => {
    if (e.code === 'Escape') closeModal();
  };

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
