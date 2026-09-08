/* Shared behavior across all pages: burger menu, reveal-on-scroll. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Hamburger dropdown (used on Home)
    document.querySelectorAll('[data-burger]').forEach(function (burger) {
      var dropdown = document.querySelector(burger.getAttribute('data-burger'));
      if (!dropdown) return;
      burger.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && e.target !== burger) {
          dropdown.classList.remove('open');
        }
      });
    });

    // Reveal-on-scroll
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }
  });
})();
