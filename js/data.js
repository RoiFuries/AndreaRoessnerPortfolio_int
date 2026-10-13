/* Shared project data.
   category must be one of: 'commercials' | 'videoclips' | 'stagedesign'
   (matches the data-category attribute on each category page's <body>).
   dop = director of photography, shown on the category card hover (right
   side) and in the detail meta row, when present. productora (production
   company) is the fallback for both of those when a project has no dop
   (e.g. documentary-style productions credited to a company, not a DOP).
   song is optional, for music videos — shown in the detail meta row.
   gallery is an array of filenames living in assets/img/<CategoryFolder>/<slug>/
   (see CATEGORY_IMG_FOLDER below for the folder per category) — omit it
   (or leave it empty) and the detail page hides the carousel section
   entirely until real photos are added. */
(function () {
  var CATEGORY_IMG_FOLDER = {
    commercials: 'Comerciales',
    videoclips: 'FiccionVideoClips',
    stagedesign: 'Escenografias'
  };

  window.PROJECTS = [
    // Comerciales (fuente: PROYECTOS ANDREA ROESSNER - comerciales.pdf)
    // Orden curado a mano por Andrea — no alfabético ni cronológico.
    { slug: 'tonal-1', title: 'Tonal — Spot 1', videoId: '1225140948', director: 'Leigh Powis', dop: 'Chuck Owens', category: 'commercials',
      gallery: ['TonalPilates_1.jpg', 'TonalPilates_2.jpg', 'TonalPilates_3.jpg', 'TonalPilates_4.jpg'] },
    { slug: 'upper-deck', title: 'Upper Deck', videoId: '1225140277', director: 'Adam Tilman Young', dop: 'Guille Vázquez', category: 'commercials',
      gallery: ['8_1.4.1.JPG', 'A011_1.6.3.JPG', 'IMG_0097.jpg', 'IMG_0098.jpg', 'IMG_0099.jpg', 'IMG_0100.jpg', 'IMG_0101.jpg', 'IMG_0102.jpg', 'IMG_0103.jpg', 'IMG_9039.jpg', 'IMG_9045.JPG', 'IMG_9073.JPG'] },
    { slug: 'nike-jogger', title: 'Nike Jogger', videoId: '406013458', director: 'Martin Marcos Levi', dop: 'Juan Guillermo Peña', category: 'commercials' },
    { slug: 'farmacias-similares', title: 'Farmacias Similares', videoId: '1225140590', director: 'Vicky Torres', dop: 'Manuel Caballero AMC', category: 'commercials' },
    { slug: 'mabe', title: 'Mabe', videoId: '1228980284', director: 'Pablo Nieto', dop: 'Javier Zarco AMC', category: 'commercials',
      gallery: ['Mabe_1.jpg', 'Mabe_2.jpg', 'Mabe_3.jpg', 'Mabe_4.jpg', 'Mabe_5.jpg', 'Mabe_6.jpg'] },
    { slug: 'tonal-2', title: 'Tonal — Spot 2', videoId: '1225139324', director: 'Leigh Powis', dop: 'Chuck Owens', category: 'commercials',
      gallery: ['TonalSpot2_4.jpg', 'TonalSpot2_5.jpg', 'TonalSpot2_6.jpg', 'TonalSpot2_8.jpg', 'TonalSpot2_9.jpg'] },
    { slug: 'doritos', title: 'Doritos', videoId: '1225143374', director: 'Rodrigo Valdez "Rorraz"', dop: 'Javier Zarco AMC', category: 'commercials',
      gallery: ['Doritos_1.jpeg', 'Doritos_2.jpeg', 'Doritos_3.jpeg', 'Doritos_4.jpeg', 'Doritos_5.jpeg'] },
    { slug: 'coffee-mate', title: 'Coffee Mate', videoId: '406012668', director: 'Jose Pablo Milone', dop: 'Lluis Marti', category: 'commercials' },
    { slug: 'lala-sabores-de-mexico', title: 'Lala. Sabores De México', videoId: '406014876', director: 'Rodrigo Fiallega', dop: 'Alfonso Aguilar', category: 'commercials' },
    { slug: 'baz', title: 'Baz', videoId: '1225141349', director: 'Audrey Laham', dop: 'Manuel Caballero AMC', category: 'commercials' },
    { slug: 'pepto-bismol', title: 'Pepto-Bismol', videoId: '1235150529', dop: 'Jordi Planell AMC', category: 'commercials' },
    { slug: 'price-travel', title: 'Price Travel', videoId: '1235145680', director: 'Poncho Aguilar', dop: 'Rocco Rodríguez AMC', category: 'commercials',
      gallery: ['PriceTravel_Andrea_Roessner_1.png', 'PriceTravel_Andrea_Roessner_2.png', 'PriceTravel_Andrea_Roessner_3.png', 'PriceTravel_Andrea_Roessner_4.png', 'PriceTravel_Andrea_Roessner_5.png'] },
    { slug: 'gr-yaris-toyota', title: 'GR Yaris Toyota', videoId: '1228986255', director: 'Poncho Guerrero', dop: 'Rocco Rodríguez AMC', category: 'commercials',
      gallery: ['GRYarisToyota_1.jpg', 'GRYarisToyota_2.jpg', 'GRYarisToyota_3.jpg', 'GRYarisToyota_4.jpg'] },
    { slug: 'gayoso', title: 'Gayoso', videoId: '1235144504', director: 'Poncho Aguilar', dop: 'Rocco Rodríguez AMC', category: 'commercials',
      gallery: ['Gayosso_Andrea_Roessner_1.png', 'Gayosso_Andrea_Roessner_2.png', 'Gayosso_Andrea_Roessner_3.png', 'Gayosso_Andrea_Roessner_4.png', 'Gayosso_Andrea_Roessner_5.png', 'Gayosso_Andrea_Roessner_6.png'] },
    { slug: 'bineo', title: 'Bineo', videoId: '1225142102', director: 'Romarico Cibrian', dop: 'Rocco Rodríguez AMC', category: 'commercials' },
    { slug: 'monte-de-piedad', title: 'Monte De Piedad', videoId: '406009857', director: 'Hans Hoj', dop: 'Leo Calzoni', category: 'commercials' },

    // Ficción & Videoclips
    { slug: 'el-llamado', title: 'El Llamado', videoId: '1229014110', director: 'Bernardo De La Rosa', dop: 'Rocco Rodríguez AMC', category: 'videoclips',
      gallery: ['FMF_Seleccion_1.jpeg', 'FMF_Seleccion_2.jpeg', 'FMF_Seleccion_3.jpeg'] },
    { slug: 'road-to-a-million', title: 'Road To A Million', videoId: '1229017148', director: 'Craig Pickles', productora: '72 Films', category: 'videoclips',
      gallery: ['RTAM_1.JPG', 'RTAM_2.jpg', 'RTAM_3.JPG', 'RTAM_4.JPG', 'RTAM_5.JPG', 'RTAM_6.jpg'] },
    { slug: 'control-z', title: 'Control Z', videoId: '1228981993', director: 'Pato Marin', dop: 'Andrea Arochi', category: 'videoclips',
      gallery: ['ControlZ_2.jpg', 'ControlZ_3.jpg', 'ControlZ_4.jpg', 'ControlZ_5.jpg'] },
    { slug: 'el-sonido-de-las-celulas', title: 'El Sonido De Las Células', videoId: '175774795', director: 'Martín Almilcar', dop: 'Rocco Rodríguez AMC', category: 'videoclips' },
    { slug: 'wave-to-earth', title: 'Wave To Earth', song: 'Heaven And Hell', videoId: '1225139956', director: 'Maureen Hufnagel', dop: 'Leo Calzoni', category: 'videoclips',
      gallery: ['WaveToEarth_1.jpg', 'WaveToEarth_2.jpg', 'WaveToEarth_3.jpg', 'WaveToEarth_4.jpg', 'WaveToEarth_5.jpg', 'WaveToEarth_6.jpg', 'WaveToEarth_7.png', 'WaveToEarth_8.jpg', 'WaveToEarth_9.jpg'] },

    // Escenografías — sin videoId: el hero muestra un carrusel de fotos
    // en vez de video. Faltan director/DOP, avísame cuando los tengas.
    { slug: 'corona-capital-music-festival', title: 'Corona Capital — Music Festival', videoId: '', category: 'stagedesign',
      gallery: ['CoronaCapital_MusicFestival_1.jpg', 'CoronaCapital_MusicFestival_2.jpg', 'CoronaCapital_MusicFestival_3.jpg', 'CoronaCapital_MusicFestival_4.jpg', 'CoronaCapital_MusicFestival_5.jpg'] },
    { slug: 'corona-capital-music-festival-2017', title: 'Corona Capital — Music Festival 2017', videoId: '', category: 'stagedesign',
      gallery: ['CoronaCapital_MusicFestival2017_1.jpg', 'CoronaCapital_MusicFestival2017_2.jpg', 'CoronaCapital_MusicFestival2017_3.jpg', 'CoronaCapital_MusicFestival2017_4.jpg', 'CoronaCapital_MusicFestival2017_5.jpg'] },
    { slug: 'heaven-and-hell-music-festival', title: 'Heaven And Hell — Music Festival', videoId: '', category: 'stagedesign',
      gallery: ['HeavenAndHell_MusicFestival__1.jpg', 'HeavenAndHell_MusicFestival__2.jpg', 'HeavenAndHell_MusicFestival__3.jpg', 'HeavenAndHell_MusicFestival__4.jpg'] },
    { slug: 'lol-argentina', title: 'LOL Argentina', videoId: '', category: 'stagedesign',
      gallery: ['LOLArgentina_1.jpg', 'LOLArgentina_2.jpg', 'LOLArgentina_3.jpg', 'LOLArgentina_4.jpg', 'LOLArgentina_5.jpg', 'LOLArgentina_6.jpg'] },
    { slug: 'leo-netflix-branding', title: 'Leo — Netflix Branding', videoId: '', category: 'stagedesign',
      gallery: ['LepNETFLIXBranding_1.jpg', 'LepNETFLIXBranding_2.jpg', 'LepNETFLIXBranding_3.jpg'] },
    { slug: 'leo-netflix-stunt', title: 'Leo — Netflix Stunt', videoId: '', category: 'stagedesign',
      gallery: ['LeoNETFLIXStunt_1.jpg', 'LeoNETFLIXStunt_2.jpg', 'LeoNETFLIXStunt_3.jpg', 'LeoNETFLIXStunt_4.jpg', 'LeoNETFLIXStunt_5.jpg', 'LeoNETFLIXStunt_6.jpg', 'LeoNETFLIXStunt_7.jpg', 'LeoNETFLIXStunt_8.jpg'] },
    { slug: 'mujeres-asesinas', title: 'Mujeres Asesinas', videoId: '', category: 'stagedesign',
      gallery: ['MujeresAsesinas_1.jpg', 'MujeresAsesinas_2.jpg', 'MujeresAsesinas_3.jpg', 'MujeresAsesinas_4.jpg', 'MujeresAsesinas_5.jpg', 'MujeresAsesinas_6.jpg', 'MujeresAsesinas_7.jpg', 'MujeresAsesinas_8.jpg'] }

    // Ejemplo de proyecto real con categoría y galería propia:
    // { slug: 'mi-videoclip', title: 'Mi Videoclip', videoId: '123456789',
    //   director: 'Nombre', dop: 'Nombre',
    //   category: 'videoclips',
    //   gallery: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'] }
    // (las imágenes van en assets/img/mi-videoclip/foto1.jpg, etc.)
  ];

  window.getProjectBySlug = function (slug) {
    return window.PROJECTS.filter(function (p) { return p.slug === slug; })[0] || window.PROJECTS[0];
  };

  window.galleryImageSrc = function (project, file, base) {
    var folder = CATEGORY_IMG_FOLDER[project.category] || 'Template';
    return (base || '../assets/img/') + folder + '/' + project.slug + '/' + file;
  };

  window.vimeoBackgroundSrc = function (id) {
    return 'https://player.vimeo.com/video/' + id + '?background=1&autoplay=1&loop=1&muted=1&transparent=0';
  };
})();
