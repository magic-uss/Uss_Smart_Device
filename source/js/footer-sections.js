'use strict';

(function () {
  var footerSections = document.querySelectorAll('.footer-section');

  footerSections.forEach(function (footerSection) {
    if (footerSection) {
      var sectionToggle = footerSection.querySelector('.footer-section__toggle');

      if (sectionToggle) {
        footerSection.classList.remove('footer-section--nojs');

        sectionToggle.addEventListener('click', function () {
          if (footerSection.classList.contains('footer-section--closed')) {
            for (var i = 0; i < footerSections.length; i++) {
              footerSections[i].classList.add('footer-section--closed');
            }

            footerSection.classList.remove('footer-section--closed');
            footerSection.classList.add('footer-section--opened');

          } else {
            footerSection.classList.add('footer-section--closed');
            footerSection.classList.remove('footer-section--opened');
          }
        });
      }
    }
  });
})();
