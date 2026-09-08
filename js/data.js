/* Shared project data. Comerciales / Videoclips / Escenografías currently
   reuse this same placeholder list (per project decision) — swap in real
   per-category projects later by editing this file only. */
(function () {
  window.PROJECTS = [
    { slug: 'umbral', title: 'Umbral', videoId: '406014876', director: 'Director Name', productora: 'Production company', client: 'Nimbus' },
    { slug: 'litoral', title: 'Litoral', videoId: '250800592', director: 'Pablo Herrero', productora: 'Niebla Morada', client: 'Client Name' },
    { slug: 'cristal', title: 'Cristal', videoId: '250796559', director: 'Director Name', productora: 'Production company', client: 'Client Name' },
    { slug: 'nocturno', title: 'Nocturno', videoId: '175904938', director: 'Armond Cohen', productora: 'Kuter', client: 'Client Name' },
    { slug: 'silueta', title: 'Silueta', videoId: '406013988', director: 'Director Name', productora: 'Production company', client: 'Client Name' },
    { slug: 'deriva', title: 'Deriva', videoId: '406012668', director: 'Director Name', productora: 'Production company', client: 'Client Name' },
    { slug: 'full-life', title: 'Full Life', videoId: '406011381', director: 'Vicky Torres', productora: 'Árbol TV', client: 'Client Name' },
    { slug: 'marejada', title: 'Marejada', videoId: '304723774', director: 'Gustavo Pérez', productora: 'Central Films', client: 'Client Name' },
    { slug: 'solsticio', title: 'Solsticio', videoId: '311807966', director: 'Bernardo de la Rosa', productora: 'DELICIOUS', client: 'Client Name' },
    { slug: 'cauce', title: 'Cauce', videoId: '311808450', director: 'Bernardo de la Rosa', productora: 'DELICIOUS', client: 'Client Name' },
    { slug: 'vertigo', title: 'Vértigo', videoId: '175780882', director: 'José Sierra', productora: 'Emigre Films', client: 'Client Name' },
    { slug: 'bruma', title: 'Bruma', videoId: '250800592', director: 'Pablo Herrero', productora: 'Niebla Morada', client: 'Client Name' }
  ];

  window.GALLERY = [
    { id: 'detail-g1', src: '../assets/img/template/detail-g1.png' },
    { id: 'detail-g2', src: '../assets/img/template/detail-g2.png' },
    { id: 'detail-g3', src: '../assets/img/template/detail-g3.png' },
    { id: 'detail-g4', src: '../assets/img/template/detail-g4.png' },
    { id: 'detail-g5', src: '../assets/img/template/detail-g5.png' },
    { id: 'detail-g6', src: '../assets/img/template/detail-g6.png' },
    { id: 'detail-g7', src: '../assets/img/template/detail-g7.png' }
  ];

  window.getProjectBySlug = function (slug) {
    return window.PROJECTS.filter(function (p) { return p.slug === slug; })[0] || window.PROJECTS[0];
  };

  window.vimeoBackgroundSrc = function (id) {
    return 'https://player.vimeo.com/video/' + id + '?background=1&autoplay=1&loop=1&muted=1&transparent=0';
  };
})();
