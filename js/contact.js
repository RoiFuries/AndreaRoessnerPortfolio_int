(function () {
  function render() {
    var host = document.getElementById('contact-grid');
    if (!host || !window.I18N) return;
    var t = window.I18N.t;
    var rows = [
      { label: t('contact.email'), value: 'hello@andrearoessner.com', href: 'mailto:hello@andrearoessner.com', target: '_self' },
      { label: t('contact.instagram'), value: '@andrea.roessner', href: 'https://www.instagram.com/andrea.roessner/', target: '_blank' },
      { label: t('contact.vimeo'), value: 'vimeo.com/andrearoessner', href: 'https://vimeo.com/andrearoessner', target: '_blank' }
    ];
    host.innerHTML = '';
    rows.forEach(function (row) {
      var a = document.createElement('a');
      a.className = 'contact-grid__cell';
      a.href = row.href;
      a.target = row.target;
      if (row.target === '_blank') a.rel = 'noopener';
      a.innerHTML =
        '<span class="contact-grid__label">' + row.label + '</span>' +
        '<span class="contact-grid__value">' + row.value + '</span>';
      host.appendChild(a);
    });
    var based = document.createElement('div');
    based.className = 'contact-grid__cell';
    based.innerHTML =
      '<span class="contact-grid__label">' + t('contact.basedIn') + '</span>' +
      '<span class="contact-grid__value">' + t('contact.location') + '</span>';
    host.appendChild(based);
  }

  document.addEventListener('DOMContentLoaded', render);
  document.addEventListener('i18n:change', render);
})();
