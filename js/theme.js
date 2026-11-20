/* Light / dark theme.
   Default: automatic by the visitor's local time — dark from 18:00 to 06:00,
   light from 06:00 to 18:00 (re-checked every minute while the page is open).
   The toggle button is a manual override that lasts for the browser session
   (sessionStorage, key 'ar_theme'); in a new session it goes back to automatic.
   The theme is applied immediately (script runs in <head>) to avoid a flash;
   the button is added next to every language switch. */
(function () {
  var KEY = 'ar_theme';
  var DARK_FROM = 18, DARK_UNTIL = 6; // local hours
  var root = document.documentElement;

  function manual() {
    try {
      var s = sessionStorage.getItem(KEY);
      return s === 'dark' || s === 'light' ? s : null;
    } catch (e) { return null; }
  }
  // Testing aid: add ?hora=22 (0-23) to the URL to simulate that hour.
  function testHour() {
    var m = /[?&]hora=(\d{1,2})(?:&|$)/.exec(location.search);
    return m && +m[1] < 24 ? +m[1] : null;
  }
  function byTime() {
    var h = testHour();
    if (h === null) h = new Date().getHours();
    return h >= DARK_FROM || h < DARK_UNTIL ? 'dark' : 'light';
  }
  function initial() { return manual() || byTime(); }
  function apply(t) {
    root.setAttribute('data-theme', t);
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // Follow the clock while the page stays open, unless the user chose manually.
  setInterval(function () {
    if (!manual()) apply(byTime());
  }, 60000);

  apply(initial());

  var ICONS =
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  function addButtons() {
    document.querySelectorAll('.lang-switch').forEach(function (ls) {
      if (ls.querySelector('.theme-toggle')) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'theme-toggle';
      b.innerHTML = ICONS;
      ls.appendChild(b);
    });
    apply(root.getAttribute('data-theme'));
  }

  // This script loads in <head>, so its DOMContentLoaded handler runs before
  // partials.js builds the nav. Defer to a timeout so the nav exists by then.
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(addButtons, 0);
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.theme-toggle');
    if (!b) return;
    var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { sessionStorage.setItem(KEY, t); } catch (err) {}
    apply(t);
  });
})();
