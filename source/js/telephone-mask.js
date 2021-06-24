'use strict';

(function () {
  var telephoneInputs = document.querySelectorAll('.form__input-text[name="tel"]');

  if (telephoneInputs) {
    telephoneInputs.forEach(function (telephoneInput) {
      window.addEventListener('DOMContentLoaded', function () {
        function setCursorPosition(pos, elem) {
          elem.focus();

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
