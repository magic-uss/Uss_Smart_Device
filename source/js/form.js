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
        telephoneInput.setCustomValidity('Номер телефона должен иметь 10 цифр');
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
