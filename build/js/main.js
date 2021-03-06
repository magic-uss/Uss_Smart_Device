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

'use strict';

(function () {
  var footerSections = document.querySelectorAll('.footer-section');

  footerSections.forEach(function (footerSection) {
    if (footerSection) {
      footerSection.classList.remove('footer-section--nojs');

      footerSection.addEventListener('click', function () {
        if (footerSection.classList.contains('footer-section--closed')) {
          for (var i = 0; i < footerSections.length; i++) {
            if (footerSections[i].classList.contains('footer-section--opened')) {
              footerSections[i].classList.remove('footer-section--opened');
              footerSections[i].classList.add('footer-section--closed');
            }
          }

          footerSection.classList.remove('footer-section--closed');
          footerSection.classList.add('footer-section--opened');

        } else {
          footerSection.classList.add('footer-section--closed');
          footerSection.classList.remove('footer-section--opened');
        }
      });
    }
  });
})();

'use strict';

(function () {
  var forms = document.querySelectorAll('.form');
  var isStorageSupport = true;
  var storageName = '';
  var storageTelephone = '';
  var storageQuestion = '';
  var minTelephoneLength = 14;

  forms.forEach((function (form) {
    var nameInput = form.querySelector('input[name="name"]');
    var telephoneInput = form.querySelector('input[name="tel"]');
    var questionInput = form.querySelector('textarea');
    var formButton = form.querySelector('button');

    var checkTelephoneLength = function (evt) {
      if (telephoneInput.value.length < minTelephoneLength) {
        evt.preventDefault();
        telephoneInput.setCustomValidity('?????????? ???????????????? ???????????? ?????????? 10 ????????');
      } else {
        telephoneInput.setCustomValidity('');
      }

      telephoneInput.reportValidity();
    };

    try {
      storageName = localStorage.getItem('name');
      storageTelephone = localStorage.getItem('tel');
      storageQuestion = localStorage.getItem('question');
    } catch (err) {
      isStorageSupport = false;
    }

    if (storageName && storageTelephone && storageQuestion) {
      nameInput.value = storageName;
      telephoneInput.value = storageTelephone;
      questionInput.value = storageQuestion;
    }

    if (nameInput && telephoneInput && questionInput && formButton) {
      form.addEventListener('submit', function () {
        if (isStorageSupport) {
          localStorage.setItem('name', nameInput.value);
          localStorage.setItem('tel', telephoneInput.value);
          localStorage.setItem('question', questionInput.value);
        }
      });

      formButton.addEventListener('click', function (evt) {
        checkTelephoneLength(evt);

        telephoneInput.addEventListener('input', function () {
          telephoneInput.setCustomValidity('');
        });
      });
    }
  }));
})();

'use strict';

(function () {
  var scrollLinks = document.querySelectorAll('a[href^="#"]');

  if (scrollLinks) {
    scrollLinks.forEach(function (scrollLink) {
      scrollLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var id = scrollLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }
})();

'use strict';

(function () {
  var telephoneInputs = document.querySelectorAll('input[name="tel"]');

  if (telephoneInputs) {
    telephoneInputs.forEach(function (telephoneInput) {
      window.addEventListener('DOMContentLoaded', function () {
        function setCursorPosition(pos, elem) {
          if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
          } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
          }
        }

        function mask(event) {
          var matrix = '+7(___)_______';
          var i = 0;
          var def = matrix.replace(/\D/g, '');
          var val = telephoneInput.value.replace(/\D/g, '');

          if (def.length >= val.length) {
            val = def;
          }

          function repl(a) {
            var b;
            if (/[_\d]/.test(a) && i < val.length) {
              b = val.charAt(i++);
            } else if (i >= val.length) {
              b = '';
            } else {
              b = a;
            }

            return b;
          }

          telephoneInput.value = matrix.replace(/./g, repl);

          if (event.type === 'blur') {
            if (telephoneInput.value.length === 2) {
              telephoneInput.value = '';
            } else {
              setCursorPosition(telephoneInput.value.length, telephoneInput);
            }
          }
        }

        telephoneInput.addEventListener('input', mask, false);
        telephoneInput.addEventListener('focus', mask, false);
        telephoneInput.addEventListener('blur', mask, false);
      });
    });
  }
})();
