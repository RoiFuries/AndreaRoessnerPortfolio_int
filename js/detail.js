(function () {
  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    return params.get('p') || (window.PROJECTS && window.PROJECTS[0].slug);
  }

  var project = null;
  var vimeoPlayer = null;
  var heroCarouselTimer = null;

  function renderStatic() {
    project = window.getProjectBySlug(getSlug());
    document.title = 'Andrea Roessner — ' + project.title;

    var titleEl = document.getElementById('detail-title');
    if (titleEl) titleEl.textContent = project.title;

    var hasVideo = !!project.videoId;
    var videoBox = document.getElementById('detail-video');
    var bg = document.getElementById('detail-video-bg');
    var watchTrigger = document.getElementById('watch-trigger');

    if (videoBox) videoBox.classList.toggle('detail-video--stills', !hasVideo);
    if (watchTrigger) watchTrigger.hidden = !hasVideo;

    if (hasVideo) {
      stopHeroCarousel();
      if (bg) {
        bg.hidden = false;
        bg.src = window.vimeoBackgroundSrc(project.videoId);
        bg.title = project.title;
      }
    } else {
      if (bg) { bg.hidden = true; bg.removeAttribute('src'); }
      renderHeroCarousel();
    }

    renderMeta();
    renderGallery();
  }

  function renderHeroCarousel() {
    var host = document.getElementById('detail-hero-carousel');
    stopHeroCarousel();
    if (!host || !project) return;
    host.innerHTML = '';
    var images = project.gallery || [];
    if (!images.length) { host.hidden = true; return; }
    host.hidden = false;

    var srcs = images.map(function (file) { return window.galleryImageSrc(project, file); });

    srcs.forEach(function (src, i) {
      var img = document.createElement('img');
      img.src = src;
      img.alt = '';
      if (i === 0) img.classList.add('active');
      img.addEventListener('click', function () { openLightbox(srcs, i); });
      host.appendChild(img);
    });

    if (images.length > 1) {
      var idx = 0;
      heroCarouselTimer = setInterval(function () {
        var imgs = host.querySelectorAll('img');
        imgs[idx].classList.remove('active');
        idx = (idx + 1) % imgs.length;
        imgs[idx].classList.add('active');
      }, 3500);
    }
  }

  function stopHeroCarousel() {
    if (heroCarouselTimer) { clearInterval(heroCarouselTimer); heroCarouselTimer = null; }
  }

  function renderMeta() {
    var host = document.getElementById('detail-meta');
    if (!host || !window.I18N || !project) return;
    var t = window.I18N.t;
    var rows = [
      { label: t('detail.client'), value: project.client },
      { label: t('detail.song'), value: project.song },
      { label: t('detail.director'), value: project.director },
      { label: t('detail.dop'), value: project.dop },
      { label: t('detail.productora'), value: project.dop ? null : project.productora },
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
          return { id: project.slug + '-' + file, src: window.galleryImageSrc(project, file) };
        })
      : [];

    if (!images.length) {
      if (section) section.hidden = true;
      track.innerHTML = '';
      return;
    }
    if (section) section.hidden = false;

    var srcs = images.map(function (g) { return g.src; });

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
      item.addEventListener('click', function () { openLightbox(srcs, i % images.length); });
      track.appendChild(item);
    });

    track.addEventListener('mouseenter', function () { track.classList.add('paused'); });
    track.addEventListener('mouseleave', function () { track.classList.remove('paused'); });
  }

  var lightboxImages = [];
  var lightboxIndex = 0;
  var lightboxTimer = null;

  function showLightboxImage() {
    var img = document.getElementById('lightbox-img');
    if (img) img.src = lightboxImages[lightboxIndex];
  }

  function advanceLightboxImage() {
    var img = document.getElementById('lightbox-img');
    if (!img) return;
    img.style.opacity = '0';
    setTimeout(function () {
      lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
      showLightboxImage();
      img.style.opacity = '1';
    }, 300);
  }

  function openLightbox(images, startIndex) {
    var lightbox = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');
    if (!lightbox || !img) return;

    lightboxImages = images;
    lightboxIndex = startIndex || 0;
    img.style.opacity = '1';
    showLightboxImage();
    lightbox.hidden = false;

    stopLightboxSlideshow();
    if (lightboxImages.length > 1) {
      lightboxTimer = setInterval(advanceLightboxImage, 2000);
    }
  }

  function stopLightboxSlideshow() {
    if (lightboxTimer) { clearInterval(lightboxTimer); lightboxTimer = null; }
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.hidden = true;
    stopLightboxSlideshow();
  }

  function openFullscreenVideo() {
    var modal = document.getElementById('video-fullscreen');
    var mount = document.getElementById('video-fullscreen-mount');
    if (!modal || !mount || !project || !project.videoId) return;
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
