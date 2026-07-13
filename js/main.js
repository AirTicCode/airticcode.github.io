/* Editorial theme — theme toggle + scroll reveal */
(function () {
  'use strict';

  /* ----- Theme toggle ----- */
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ----- Scroll reveal ----- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || !revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // small stagger for siblings revealed together
          var siblings = Array.prototype.slice.call(el.parentElement.children);
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = Math.min(idx * 60, 240) + 'ms';
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ----- Set active nav based on current path (for category pages) ----- */
  // (handled in template via is-active class, but normalize trailing slashes)
})();
