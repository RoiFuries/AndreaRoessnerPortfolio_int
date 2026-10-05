(function () {
  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    return params.get('p') || (window.PROJECTS && window.PROJECTS[0].slug);
  }

  var project = null;
  var vimeoPlayer = null;

  function renderStatic() {
    project = window.getProjectBySlug(getSlug());
    document.title = 'Andrea Roessner — ' + project.title;

    var titleEl = document.getElementById('detail-title');
    if (titleEl) titleEl.textContent = project.title;

    var bg = document.getElementById('detail-video-bg');
    if (bg) {
      bg.src = window.vimeoBackgroundSrc(project.videoId);
      bg.title = project.title;
    }

    renderMeta();
    renderGallery();
  }

  function renderMeta() {
    var host = document.getElementById('detail-meta');
    if (!host || !window.I18N || !project) return;
    var t = window.I18N.t;
    var rows = [
      { label: t('detail.client'), value: project.client },
      { label: t('detail.director'), value: project.director },
      { label: t('detail.dop'), value: project.dop },
      { label: t('detail.designer'), value: 'Andrea Roessner' }
    ].filter(function (row) { return row.value; });
    host.innerHTML = '';
    rows.forEach(function (row) {
      var item = document.createElement('div');
      item.className = 'detail-meta__item';
      item.innerHTML =
        '<div class="detail-meta__label">' + row.label + '</div>' +
        '<div class="detail-meta__value">' + row.value + '</div>';
      host.appendChild(item);
    });
  }

  function renderGallery() {
    var section = document.querySelector('.detail-gallery');
    var track = document.getElementById('gallery-track');
    if (!track || !project) return;

    var images = (project.gallery && project.gallery.length)
      ? project.gallery.map(function (file) {
          return { id: project.slug + '-' + file, src: '../assets/img/' + project.slug + '/' + file };
        })
      : [];

    if (!images.length) {
      if (section) section.hidden = true;
      track.innerHTML = '';
      return;
    }
    if (section) section.hidden = false;

    track.innerHTML = '';
    var doubled = images.concat(images);
    doubled.forEach(function (g, i) {
      var item = document.createElement('div');
      item.className = 'detail-gallery__item';
      var img = document.createElement('img');
      img.src = g.src;
      img.alt = '';
      img.loading = 'lazy';
      item.appendChild(img);
      item.addEventListener('click', function () { openLightbox(g.src); });
      track.appendChild(item);
    });

    track.addEventListener('mouseenter', function () { track.classList.add('paused'); });
    track.addEventListener('mouseleave', function () { track.classList.remove('paused'); });
  }

  function openLightbox(src) {
    var lightbox = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');
    if (!lightbox || !img) return;
    img.src = src;
    lightbox.hidden = false;
  }
  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.hidden = true;
  }

  function openFullscreenVideo() {
    var modal = document.getElementById('video-fullscreen');
    var mount = document.getElementById('video-fullscreen-mount');
    if (!modal || !mount || !project) return;
    mount.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://player.vimeo.com/video/' + project.videoId + '?title=0&byline=0&portrait=0');
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    mount.appendChild(iframe);
    modal.hidden = false;

    if (window.Vimeo && window.Vimeo.Player) {
      vimeoPlayer = new window.Vimeo.Player(iframe);
      vimeoPlayer.setLoop(true).catch(function () {});
      vimeoPlayer.play().catch(function () {});
    }
  }

  function closeFullscreenVideo() {
    var modal = document.getElementById('video-fullscreen');
    var mount = document.getElementById('video-fullscreen-mount');
    if (vimeoPlayer) {
      vimeoPlayer.unload().catch(function () {});
      vimeoPlayer = null;
    }
    if (mount) mount.innerHTML = '';
    if (modal) modal.hidden = true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderStatic();

    var watchTrigger = document.getElementById('watch-trigger');
    if (watchTrigger) watchTrigger.addEventListener('click', openFullscreenVideo);

    var closeVideoBtn = document.getElementById('video-fullscreen-close');
    if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeFullscreenVideo);

    var lightboxCloseBtn = document.getElementById('lightbox-close');
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    var lightboxFrame = document.getElementById('lightbox-frame');
    if (lightboxFrame) lightboxFrame.addEventListener('click', function (e) { e.stopPropagation(); });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeLightbox();
      closeFullscreenVideo();
    });
  });

  document.addEventListener('i18n:change', function () {
    renderMeta();
    if (project) {
      var titleEl = document.getElementById('detail-title');
      if (titleEl) titleEl.textContent = project.title;
    }
  });
})();
