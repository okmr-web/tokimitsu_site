document.addEventListener('DOMContentLoaded', () => {

  const header    = document.querySelector('.header');
  const hamburger = document.querySelector('.header__hamburger');
  const drawer    = document.querySelector('.header__drawer');
  const overlay   = document.querySelector('.header__overlay');

  // ---- スクロールでヘッダー切り替え ----
  window.addEventListener('scroll', () => {
    const pastFv = window.scrollY > window.innerHeight;
    header.classList.toggle('is-scrolled', pastFv);
    hamburger.classList.toggle('is-scrolled', pastFv);
  });

  // ---- ドロワー開閉 ----
  const toggleMenu = (open) => {
    const isOpen = typeof open === 'boolean' ? open : !hamburger.classList.contains('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    drawer.classList.toggle('is-open', isOpen);
    overlay.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  };

  hamburger.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // ---- FVアニメーション ----
  document.querySelectorAll('.fv .matrix.anim').forEach((el, index) => {
    setTimeout(() => el.classList.add('is-animated'), index * 600);
  });

  const fvLine = document.querySelector('.fv__main-line');
  if (fvLine) {
    setTimeout(() => fvLine.classList.add('is-visible'), 800);
  }

  // ---- FAQアコーディオン ----
  document.querySelectorAll('.faq__item').forEach(item => {
    item.querySelector('.faq__question').addEventListener('click', () => {
      item.classList.toggle('is-open');
    });
  });

  // ---- スクロールアニメーション ----
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');

      if (entry.target.classList.contains('cta')) {
        const ribbons = entry.target.querySelectorAll('.js-ribbon');
        const total = ribbons.length;
        ribbons.forEach((ribbon, i) => {
          setTimeout(() => ribbon.classList.add('is-visible'), (total - 1 - i) * 200);
        });
      }

      scrollObserver.unobserve(entry.target);
    });
  }, observerOptions);

  document.querySelectorAll('.js-fadeup, .js-btn-delay, .js-fadeup-slow, .cta').forEach(el => {
    scrollObserver.observe(el);
  });

});
