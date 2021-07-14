'use strict';

(function () {
  var modalPopup = document.querySelector('.feedback-modal');
  var callBackButton = document.querySelector('.page-header__feedback-link');
  var closeModalButton = document.querySelector('.feedback-modal__close-button');
  var nameInput = document.querySelector('input[id="name-modal"]');
  var modalContent = document.querySelector('.feedback-modal__form-wrapper');

  function changeAlignment() {
    if (modalContent.clientHeight > modalPopup.clientHeight) {
      if (modalPopup.classList.contains('feedback-modal--show')) {
        modalPopup.classList.remove('feedback-modal--show');
      }
      modalPopup.classList.add('feedback-modal--show-overflow');
    } else {
      if (modalPopup.classList.contains('feedback-modal--show-overflow')) {
        modalPopup.classList.remove('feedback-modal--show-overflow');
      }
      modalPopup.classList.add('feedback-modal--show');
    }
  }

  function isEscEvent(evt) {
    return evt.key === ('Escape' || 'Esc');
  }

  function onModalEscPress(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onModalOverlayPress(evt) {
    if (evt.target !== modalPopup) {
      evt.stopPropagation();
    } else {
      closeModal();
    }
  }

  function openModal() {
    modalPopup.classList.add('feedback-modal--show');
    changeAlignment();
    document.body.style.overflow = 'hidden';
    nameInput.focus();

    window.addEventListener('resize', changeAlignment, false);
    window.addEventListener('keydown', onModalEscPress);
    closeModalButton.addEventListener('click', closeModal);
    modalPopup.addEventListener('click', onModalOverlayPress);
  }

  function closeModal() {
    if (modalPopup.classList.contains('feedback-modal--show')) {
      modalPopup.classList.remove('feedback-modal--show');
    }
    if (modalPopup.classList.contains('feedback-modal--show-overflow')) {
      modalPopup.classList.remove('feedback-modal--show-overflow');
    }
    document.body.removeAttribute('style');

    window.removeEventListener('resize', changeAlignment, false);
    window.removeEventListener('keydown', onModalEscPress);
    closeModalButton.removeEventListener('click', closeModal);
    modalPopup.removeEventListener('click', onModalOverlayPress);
  }

  callBackButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openModal();
  });
})();
