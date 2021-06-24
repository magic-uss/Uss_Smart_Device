'use strict';

(function () {
  var modalPopup = document.querySelector('.feedback-modal');
  var callBackButton = document.querySelector('.page-header__feedback-link');
  var closeModalButton = document.querySelector('.feedback-modal__close-button');
  var nameInput = document.querySelector('.feedback-modal__input-text[id="name"]');

  callBackButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalPopup.classList.add('feedback-modal--show');
    document.body.style.overflow = 'hidden';
    nameInput.focus();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (modalPopup.classList.contains('feedback-modal--show')) {
        evt.preventDefault();
        modalPopup.classList.remove('feedback-modal--show');
        document.body.removeAttribute('style');
      }
    }
  });

  closeModalButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalPopup.classList.remove('feedback-modal--show');
    document.body.removeAttribute('style');
  });

  modalPopup.addEventListener('click', function (evt) {
    if (evt.target !== modalPopup) {
      evt.stopPropagation();
    } else {
      modalPopup.classList.remove('feedback-modal--show');
      document.body.removeAttribute('style');
    }
  });
})();
