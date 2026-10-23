/* Pour Cloclo — enveloppe, lettre, cadenas, photo. */

(function () {
  'use strict';

  var body     = document.body;
  var seal     = document.getElementById('seal');
  var openBtn  = document.getElementById('openBtn');
  var env      = openBtn.querySelector('.env');
  var hint     = document.getElementById('hint');
  var wipe     = document.getElementById('wipe');
  var letter   = document.getElementById('letter');
  var progress = document.getElementById('progress');
  var bar      = progress.querySelector('i');
  var lockBtn  = document.getElementById('lockBtn');
  var photo    = document.getElementById('photo');
  var bridge   = document.getElementById('bridge');
  var end      = document.getElementById('end');
  var replay   = document.getElementById('replayBtn');
  var ambient  = document.getElementById('ambient');

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = function (ms) { return calm ? Math.min(ms, 120) : ms; };

  // une petite vibration, là où le téléphone le permet (Android)
  function buzz(pattern) {
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
  }

  /* ----------------------------------------------------------
     1. Ouvrir l'enveloppe
     ---------------------------------------------------------- */

  var opened = false;

  function open() {
    if (opened) return;
    opened = true;

    // les deux photos se chargent pendant la lecture de la lettre,
    // pour qu'aucune révélation ne soit retardée par un téléchargement
    ['pic.jpeg', 'pic2.jpeg'].forEach(function (src) {
      var warm = new Image();
      warm.src = src;
    });

    hint.classList.add('is-hidden');
    openBtn.disabled = true;
    env.classList.add('is-open');
    buzz(14);

    setTimeout(function () { env.classList.add('is-lifting'); }, t(520));

    // le fondu part (1100 ms) et devient complètement opaque à 2400
    setTimeout(function () { wipe.classList.add('is-on'); }, t(1300));

    // ... et on n'échange les scènes qu'une fois l'écran entièrement couvert
    setTimeout(function () {
      seal.classList.add('is-gone', 'is-done');
      seal.setAttribute('aria-hidden', 'true');

      letter.hidden = false;
      body.classList.remove('is-sealed');
      window.scrollTo(0, 0);
      watchReveals();
      progress.classList.add('is-on');
      updateProgress();

      // papier sur papier : l'effacement ne se voit pas,
      // seuls les mots apparaissent
      setTimeout(function () { wipe.classList.add('is-off'); }, t(110));
    }, t(2550));
  }

  openBtn.addEventListener('click', open);

  /* ----------------------------------------------------------
     2. Les paragraphes apparaissent au fil de la lecture
     ---------------------------------------------------------- */

  var watching = false;

  function watchReveals() {
    if (watching) return;
    watching = true;

    var items = letter.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    // petit décalage entre les premiers paragraphes, pour le rythme
    for (var j = 0; j < items.length; j++) {
      items[j].style.transitionDelay = j < 3 ? (j * 110 + 40) + 'ms' : '0ms';
      io.observe(items[j]);
    }
  }

  /* ----------------------------------------------------------
     3. Le fil de progression
     ---------------------------------------------------------- */

  var ticking = false;

  function updateProgress() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? window.pageYOffset / h : 0;
    p = Math.max(0, Math.min(1, p));

    bar.style.width = (p * 100) + '%';

    // le fond se réchauffe : papier crème en haut, ciel de la photo en bas
    ambient.style.opacity = Math.pow(p, 1.35).toFixed(3);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });

  window.addEventListener('resize', updateProgress, { passive: true });

  /* ----------------------------------------------------------
     4. Le cadenas
     ---------------------------------------------------------- */

  var unlocked = false;

  lockBtn.addEventListener('click', function () {
    if (unlocked) return;
    unlocked = true;

    lockBtn.disabled = true;
    lockBtn.classList.add('is-open');
    buzz([10, 50, 22]);

    setTimeout(function () { lockBtn.classList.add('is-done'); }, t(620));

    setTimeout(function () {
      photo.classList.add('is-shown');
      photo.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
    }, t(980));

    setTimeout(function () { bridge.classList.add('is-shown'); }, t(2100));

    setTimeout(function () {
      end.classList.add('is-shown');
      updateProgress();
    }, t(2600));
  });

  /* ----------------------------------------------------------
     5. Relire
     ---------------------------------------------------------- */

  replay.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
  });
})();
