// スマホ用メニューの開閉
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('global-nav');
  var mobile = window.matchMedia('(max-width: 900px)');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!mobile.matches || !link) return;

    var destination = link.hash && document.getElementById(link.hash.slice(1));
    (destination || toggle).focus({ preventScroll: true });
    setMenu(false);
  });

  var header = toggle.closest('header');
  header.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.focus();
      setMenu(false);
    }
  });
  header.addEventListener('focusout', function (event) {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
  });
  mobile.addEventListener('change', function () {
    if (mobile.matches && nav.contains(document.activeElement)) toggle.focus();
    setMenu(false);
  });

  // スクロールで要素をふわっと表示
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = document.querySelectorAll('.section-head, .biz, .value-card, .tl-item, .sports-grid li, .plan, .support-box, .message-inner, .stat-list li');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (target) {
    target.classList.add('reveal');
    observer.observe(target);
  });
})();
