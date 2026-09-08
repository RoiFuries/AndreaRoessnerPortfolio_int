/* Builds the nav + footer markup shared by every page, and applies the
   "exclude current category" nav rule described in the design chat:
   a category page's nav shows Home + the OTHER two categories + Contact. */
(function () {
  var CATEGORIES = [
    { key: 'commercials', file: 'comerciales.html', labelKey: 'nav.commercials' },
    { key: 'videoclips', file: 'videoclips.html', labelKey: 'nav.videoclips' },
    { key: 'stagedesign', file: 'escenografias.html', labelKey: 'nav.stagedesign' }
  ];

  function langSwitchHTML() {
    return (
      '<span class="lang-switch">' +
      '<button type="button" data-lang="es">ES</button>' +
      '<button type="button" data-lang="en">EN</button>' +
      '<button type="button" data-lang="de">DE</button>' +
      '</span>'
    );
  }

  function linkHTML(href, labelKey, active) {
    return (
      '<a href="' + href + '" data-i18n="' + labelKey + '"' +
      (active ? ' aria-current="page"' : '') + '></a>'
    );
  }

  function buildNav(variant, basePath) {
    basePath = basePath || '';
    var links = '';
    var showLogo = variant !== 'home';

    if (variant === 'home') {
      links += linkHTML(basePath + 'index.html', 'nav.home', true);
      links += linkHTML(basePath + 'contacto.html', 'nav.contact', false);
    } else {
      links += linkHTML(basePath + 'index.html', 'nav.home', false);
      CATEGORIES.forEach(function (cat) {
        if (cat.key === variant) return; // exclude current category, per design brief
        links += linkHTML(basePath + cat.file, cat.labelKey, false);
      });
      links += linkHTML(basePath + 'contacto.html', 'nav.contact', variant === 'contact');
    }

    var navClass = variant === 'home' ? 'nav nav--transparent' : 'nav';
    return (
      '<nav class="' + navClass + '"' + (variant === 'home' ? ' id="home-nav"' : '') + '>' +
      langSwitchHTML() +
      '<div class="nav__right">' +
      (showLogo ? '<a href="' + basePath + 'index.html" class="nav__logo">ANDREA ROESSNER</a>' : '') +
      '<div class="nav__links">' + links + '</div>' +
      '</div>' +
      '</nav>'
    );
  }

  function buildFooter() {
    return (
      '<footer class="footer">' +
      '<a class="footer__credit" href="https://rmqz.mx/" target="_blank" rel="noopener" data-i18n="footer.credit"></a>' +
      '<span class="footer__copy" data-i18n="footer.copyright"></span>' +
      '<div class="footer__social">' +
      '<a href="https://www.instagram.com/andrea.roessner/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></svg></a>' +
      '<a href="https://vimeo.com/andrearoessner" target="_blank" rel="noopener" aria-label="Vimeo"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22.4 6.4c-.1 2.1-1.6 5-4.4 8.6-2.9 3.8-5.3 5.6-7.4 5.6-1.3 0-2.4-1.2-3.3-3.6L5.9 12c-.6-2.3-1.2-3.4-1.9-3.4-.1 0-.6.3-1.6 1L1.6 8.2c1-.9 2.1-1.9 3.1-2.8 1.4-1.2 2.4-1.9 3.1-1.9 1.6-.2 2.6 1 3 3.4.5 2.7.8 4.3 1 5 .5 2.4 1.1 3.6 1.8 3.6.5 0 1.3-.8 2.3-2.5 1-1.6 1.6-2.9 1.6-3.7.1-1.4-.5-2.1-1.8-2.1-.6 0-1.3.1-2 .4 1.3-4.4 3.9-6.5 7.6-6.4 2.1.1 3.2 1.5 3.1 4.2z"></path></svg></a>' +
      '<a href="mailto:hello@andrearoessner.com" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="4.5" width="19" height="15" rx="2"></rect><path d="M3 6.5l9 6.5 9-6.5"></path></svg></a>' +
      '</div>' +
      '</footer>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var navHost = document.querySelector('[data-nav]');
    if (navHost) navHost.innerHTML = buildNav(navHost.getAttribute('data-nav'), navHost.getAttribute('data-base'));
    var footerHost = document.querySelector('[data-footer]');
    if (footerHost && footerHost.getAttribute('data-footer') !== 'none') {
      footerHost.innerHTML = buildFooter();
    }
    if (window.I18N) window.I18N.applyTranslations(document);
  });
})();
