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
