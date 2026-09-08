(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var hero = document.getElementById('hero');
    var nav = document.getElementById('home-nav'); // exists once partials.js injects it
    var list = document.getElementById('what-we-do-list');
    if (!hero || !list) return;

    function setHover(key) {
      hero.classList.toggle('on-image', !!key);
      var homeNav = document.getElementById('home-nav');
      if (homeNav) homeNav.classList.toggle('on-image', !!key);

      hero.querySelectorAll('[data-bg]').forEach(function (el) {
        el.classList.toggle('active', el.getAttribute('data-bg') === key);
      });
      hero.querySelectorAll('[data-overlay]').forEach(function (el) {
        el.classList.toggle('active', el.getAttribute('data-overlay') === key);
      });
      list.querySelectorAll('.hero__list-item').forEach(function (el) {
        el.classList.toggle('active', el.getAttribute('data-hover') === key);
      });
    }

    list.querySelectorAll('.hero__list-item').forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        setHover(item.getAttribute('data-hover'));
      });
    });
    list.addEventListener('mouseleave', function () { setHover(null); });

    // ANDREA hover -> justify that line to the left (no-op visually, kept for consistency).
    var andrea = document.getElementById('name-andrea');
    if (andrea) {
      andrea.addEventListener('mouseenter', function () { andrea.classList.add('justify-left'); });
      andrea.addEventListener('mouseleave', function () { andrea.classList.remove('justify-left'); });
    }
  });
})();
