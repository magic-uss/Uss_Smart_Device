'use strict';

(function () {
  var forms = document.querySelectorAll('.form');
  var isStorageSupport = true;
  var storageName = '';
  var storageTelephone = '';
  var storageQuestion = '';

  forms.forEach((function (form) {
    var nameInput = form.querySelector('.form__input-text[name="name"]');
    var telephoneInput = form.querySelector('.form__input-text[name="tel"]');
    var questionInput = form.querySelector('.form__textarea');
    var formButton = form.querySelector('.form__button');

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
      formButton.addEventListener('submit', function () {
        if (isStorageSupport) {
          localStorage.setItem('name', nameInput.value);
          localStorage.setItem('tel', telephoneInput.value);
          localStorage.setItem('question', questionInput.value);
        }
      });
    }
  }));
})();
