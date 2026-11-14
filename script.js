(function () {
  var root = document.documentElement;
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  var store = function (key, value) { try { localStorage.setItem(key, value); } catch (e) {} };

  /* Language switch (FR / EN) */
  function showLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    each('.lang-toggle', function (b) { b.textContent = lang === 'fr' ? 'EN' : 'FR'; });
  }
  showLang(root.getAttribute('data-lang') || 'en');
  each('.lang-toggle', function (b) {
    b.addEventListener('click', function () {
      var next = root.getAttribute('data-lang') === 'fr' ? 'en' : 'fr';
      showLang(next);
      store('lang', next);
    });
  });

  /* Light / dark theme */
  each('.theme-toggle', function (b) {
    b.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
    });
  });

  /* Mobile menu */
  var menuButton = document.querySelector('.menu-toggle');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  menuButton.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('menu-open'));
  });
  each('.mobile-menu a', function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* Highlight the section being read in the navigation */
  var sections = document.querySelectorAll('main section[id]');
  function markActive() {
    var line = window.innerHeight * 0.3, current = sections[0];
    Array.prototype.forEach.call(sections, function (s) {
      if (s.getBoundingClientRect().top <= line) current = s;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    each('.nav-link', function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
  }
  var waiting = false;
  window.addEventListener('scroll', function () {
    if (waiting) return;
    waiting = true;
    requestAnimationFrame(function () { markActive(); waiting = false; });
  }, { passive: true });
  markActive();
})();
