(function () {
  function renderGrid() {
    var grid = document.getElementById('project-grid');
    if (!grid) return;
    grid.innerHTML = '';
    window.PROJECTS.forEach(function (p) {
      var a = document.createElement('a');
      a.href = 'proyectos/template.html?p=' + encodeURIComponent(p.slug);
      a.className = 'project-card';

      var media = document.createElement('div');
      media.className = 'project-card__media';

      var iframe = document.createElement('iframe');
      iframe.src = window.vimeoBackgroundSrc(p.videoId);
      iframe.setAttribute('allow', 'autoplay');
      iframe.setAttribute('title', p.title);
      iframe.loading = 'lazy';
      media.appendChild(iframe);

      var overlay = document.createElement('div');
      overlay.className = 'project-card__overlay';
      var left = document.createElement('span');
      left.textContent = p.director;
      var right = document.createElement('span');
      right.textContent = p.productora;
      overlay.appendChild(left);
      overlay.appendChild(right);
      media.appendChild(overlay);

      var title = document.createElement('div');
      title.className = 'project-card__title';
      title.textContent = p.title;

      a.appendChild(media);
      a.appendChild(title);
      grid.appendChild(a);
    });
  }

  function renderTitle() {
    var h1 = document.getElementById('category-title');
    var category = document.body.getAttribute('data-category');
    if (h1 && category && window.I18N) {
      h1.textContent = window.I18N.t('category.' + category + '.title');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderGrid();
    renderTitle();
  });
  document.addEventListener('i18n:change', renderTitle);
})();
