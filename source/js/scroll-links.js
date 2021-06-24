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
