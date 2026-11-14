(function () {
  var root = document.documentElement;
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  var store = function (key, value) { try { localStorage.setItem(key, value); } catch (e) {} };

  /* Language switch (FR / EN) */
  function showLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    each('.lang-toggle', function (b) { b.textContent = lang === 'fr' ? 'English' : 'Français'; });
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
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
    });
  });

  /* Accent colour picker */
  function closePickers() {
    each('.dropdown-results', function (d) { d.hidden = true; });
    each('.accent-toggle', function (b) { b.setAttribute('aria-expanded', 'false'); });
  }
  each('.accent-toggle', function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var panel = b.parentNode.querySelector('.dropdown-results');
      var open = panel.hidden;
      closePickers();
      panel.hidden = !open;
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  each('.dropdown-option', function (o) {
    o.addEventListener('click', function () {
      var accent = o.getAttribute('data-accent');
      root.setAttribute('data-accent', accent);
      store('accent', accent);
      closePickers();
    });
  });
  document.addEventListener('click', closePickers);

  /* Mobile menu */
  var menuButton = document.querySelector('.menu-toggle');
  menuButton.addEventListener('click', function () {
    var open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
