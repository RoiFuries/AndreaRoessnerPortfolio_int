/* Lightweight i18n engine — no build step, no fetch (works from file:// too).
   Translations are embedded below. Usage:
     data-i18n="home.about"                -> sets textContent
     data-i18n-html="home.about"           -> sets innerHTML (rich text)
     data-i18n-attr="aria-label:nav.home"  -> sets an attribute
     I18N.t('home.about')                  -> read a string from JS
     document.addEventListener('i18n:change', fn) -> re-render dynamic bits
*/
(function () {
  var DICT = {
    es: {
      nav: { home: 'HOME', commercials: 'COMERCIALES', videoclips: 'FICCIÓN & VIDEOCLIPS', stagedesign: 'ESCENOGRAFÍAS', contact: 'CONTACTO' },
      footer: { credit: 'With love by Roi Furies', copyright: '© 2026 Andrea Roessner Todos los derechos reservados' },
      home: {
        role: 'PRODUCTION DESIGNER',
        location: 'BASADO EN MÉXICO',
        whatWeDo: 'Lo que hago ↴',
        serviceCommercials: 'Comerciales',
        serviceVideoclips: 'Ficción & Videoclips',
        serviceStagedesign: 'Escenografías',
        about: 'Andrea Roessner es diseñadora de producción con más de una década de experiencia. Su trabajo combina una mirada narrativa con precisión visual, construyendo mundos con carácter propio para marcas, artistas y producciones audiovisuales.',
        cta: 'Más Sobre Mi ✦'
      },
      category: {
        commercials: { title: 'Comerciales' },
        videoclips: { title: 'Ficción & Videoclips' },
        stagedesign: { title: 'Escenografías' }
      },
      detail: { client: 'Cliente', director: 'Director', dop: 'Director de Fotografía', productora: 'Productora', song: 'Canción', designer: 'Production Designer', watch: 'VER', close: 'CERRAR ✕', set: 'Set' },
      contact: {
        title: "Let's Talk",
        email: 'Correo',
        instagram: 'Instagram',
        vimeo: 'Vimeo',
        basedIn: 'Ubicado en',
        location: 'Ciudad de México',
        aboutLabel: 'Sobre consultas',
        aboutText: 'Disponible para proyectos de comerciales, videoclips y escenografía. Cuéntame sobre tu producción, timeline y referencias — respondo en 24–48 horas.'
      },
      common: { close: 'CERRAR ✕' }
    },
    en: {
      nav: { home: 'HOME', commercials: 'COMMERCIALS', videoclips: 'FICTION & MUSIC VIDEO', stagedesign: 'STAGE DESIGN', contact: 'CONTACT' },
      footer: { credit: 'With love by Roi Furies', copyright: '© 2026 Andrea Roessner All rights reserved' },
      home: {
        role: 'PRODUCTION DESIGNER',
        location: 'BASED IN MEXICO',
        whatWeDo: 'What we do ↴',
        serviceCommercials: 'Commercials',
        serviceVideoclips: 'Fiction & Music Video',
        serviceStagedesign: 'Stage Design',
        about: 'Andrea Roessner is a production designer with more than a decade of experience. Her work blends a narrative eye with visual precision, building worlds with their own character for brands, artists, and audiovisual productions.',
        cta: 'More About Me ✦'
      },
      category: {
        commercials: { title: 'Commercials' },
        videoclips: { title: 'Fiction & Music Video' },
        stagedesign: { title: 'Stage Design' }
      },
      detail: { client: 'Client', director: 'Director', dop: 'Director of Photography', productora: 'Production Company', song: 'Song', designer: 'Production Designer', watch: 'WATCH', close: 'CLOSE ✕', set: 'Set' },
      contact: {
        title: "Let's Talk",
        email: 'Email',
        instagram: 'Instagram',
        vimeo: 'Vimeo',
        basedIn: 'Based in',
        location: 'Mexico City',
        aboutLabel: 'About inquiries',
        aboutText: 'Available for commercial, music video, and stage design projects. Tell me about your production, timeline, and references — I respond within 24–48 hours.'
      },
      common: { close: 'CLOSE ✕' }
    },
    de: {
      nav: { home: 'HOME', commercials: 'WERBUNG', videoclips: 'FIKTION & VIDEOCLIPS', stagedesign: 'BÜHNENBILD', contact: 'KONTAKT' },
      footer: { credit: 'With love by Roi Furies', copyright: '© 2026 Andrea Roessner Alle Rechte vorbehalten' },
      home: {
        role: 'PRODUCTION DESIGNER',
        location: 'BASIERT IN MEXIKO-STADT',
        whatWeDo: 'Was ich tue ↴',
        serviceCommercials: 'Werbung',
        serviceVideoclips: 'Fiktion & Videoclips',
        serviceStagedesign: 'Bühnenbild',
        about: 'Andrea Roessner ist Szenenbildnerin mit mehr als einem Jahrzehnt Erfahrung. Ihre Arbeit verbindet einen narrativen Blick mit visueller Präzision und erschafft eigenständige Bildwelten für Marken, Künstler und audiovisuelle Produktionen.',
        cta: 'Mehr über mich ✦'
      },
      category: {
        commercials: { title: 'Werbung' },
        videoclips: { title: 'Fiktion & Videoclips' },
        stagedesign: { title: 'Bühnenbild' }
      },
      detail: { client: 'Kunde', director: 'Regie', dop: 'Kamera', productora: 'Produktionsfirma', song: 'Song', designer: 'Production Designer', watch: 'ANSEHEN', close: 'SCHLIESSEN ✕', set: 'Set' },
      contact: {
        title: "Let's Talk",
        email: 'E-Mail',
        instagram: 'Instagram',
        vimeo: 'Vimeo',
        basedIn: 'Standort',
        location: 'Mexiko-Stadt',
        aboutLabel: 'Über Anfragen',
        aboutText: 'Verfügbar für Projekte in den Bereichen Werbung, Musikvideos und Bühnenbild. Erzähl mir von deiner Produktion, deinem Zeitplan und Referenzen — ich antworte innerhalb von 24–48 Stunden.'
      },
      common: { close: 'SCHLIESSEN ✕' }
    }
  };

  var SUPPORTED = Object.keys(DICT);
  var STORAGE_KEY = 'ar_lang';

  function detectDefault() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : 'es';
  }

  var currentLang = detectDefault();

  function resolve(dict, path) {
    var parts = path.split('.');
    var cur = dict;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function t(key) {
    var val = resolve(DICT[currentLang], key);
    if (val === undefined) val = resolve(DICT.es, key);
    return val === undefined ? key : val;
  }

  function applyTranslations(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        pair = pair.trim();
        if (!pair) return;
        var idx = pair.indexOf(':');
        var attr = pair.slice(0, idx).trim();
        var key = pair.slice(idx + 1).trim();
        el.setAttribute(attr, t(key));
      });
    });
    document.documentElement.setAttribute('lang', currentLang);
    root.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.setAttribute('aria-current', String(btn.getAttribute('data-lang') === currentLang));
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations(document);
    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: lang } }));
  }

  function getLang() { return currentLang; }

  function initLangSwitchers() {
    // Delegated: nav/footer markup (including .lang-switch buttons) is
    // injected after this file loads, so per-button listeners would miss it.
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.lang-switch button');
      if (!btn) return;
      setLang(btn.getAttribute('data-lang'));
    });
  }

  window.I18N = { t: t, setLang: setLang, getLang: getLang, applyTranslations: applyTranslations, SUPPORTED: SUPPORTED };

  initLangSwitchers();
  document.addEventListener('DOMContentLoaded', function () {
    applyTranslations(document);
  });
})();
