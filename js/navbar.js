(function () {
  var NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'workwithus.html', label: 'Work With Us' },
    { href: 'bazi_con.html', label: 'Imperial BaZi Consultation' },
    { href: 'fs_con.html', label: 'Imperial Feng Shui Consultation' },
    { href: 'heritage.html', label: 'Heritage' },
    { href: 'heritage_qianlong.html', label: 'Emperor Qianlong' },
    { href: 'art.html', label: 'The Art of Jadeite' },
    { href: 'craftmanship.html', label: 'Imperial Selection' },
    { href: 'story.html', label: 'Our Story' }
  ];

  var LOGO_SVG =
    '<svg viewBox="0 0 64 64" fill="none" class="h-full w-full">' +
      '<circle cx="32" cy="32" r="29" stroke="currentColor" stroke-width="1.5" />' +
      '<circle cx="32" cy="32" r="24.5" stroke="currentColor" stroke-width="1.5" />' +
      '<rect x="21" y="21" width="22" height="22" stroke="currentColor" stroke-width="1.5" />' +
      '<rect x="26" y="26" width="12" height="12" stroke="currentColor" stroke-width="1.5" />' +
      '<line x1="32" y1="9" x2="32" y2="14" stroke="currentColor" stroke-width="1.5" />' +
      '<line x1="32" y1="50" x2="32" y2="55" stroke="currentColor" stroke-width="1.5" />' +
      '<line x1="9" y1="32" x2="14" y2="32" stroke="currentColor" stroke-width="1.5" />' +
      '<line x1="50" y1="32" x2="55" y2="32" stroke="currentColor" stroke-width="1.5" />' +
    '</svg>';

  var linksHTML = NAV_LINKS.map(function (l) {
    return '<a href="' + l.href + '" data-nav-link="' + l.href + '" ' +
      'class="font-serif text-2xl text-white transition hover:text-gold sm:text-3xl">' + l.label + '</a>';
  }).join('');

  var navHTML =
    '<nav id="site-nav" class="fixed inset-x-0 top-0 z-[100] bg-transparent transition-colors duration-300" style="color:#F0E5D4">' +
      '<div class="relative flex items-center justify-between px-6 py-5 md:px-10 md:py-6">' +
        '<button id="nav-burger" type="button" aria-label="Open menu" aria-expanded="false" ' +
          'class="flex items-center gap-2 text-current transition hover:opacity-70">' +
          '<svg width="20" height="14" viewBox="0 0 20 14" fill="none">' +
            '<line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" stroke-width="1.5" />' +
            '<line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="1.5" />' +
            '<line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" stroke-width="1.5" />' +
          '</svg>' +
          '<span class="label text-xs tracking-[0.25em]">MENU</span>' +
        '</button>' +
        '<a href="index.html" aria-label="Anggara Treasures — Home" ' +
          'class="absolute left-1/2 top-1/2 block h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-current">' +
          LOGO_SVG +
        '</a>' +
        '<div class="flex items-center gap-5 text-current">' +
          '<a href="#" aria-label="Collection" class="transition hover:opacity-70">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2 L22 9 L12 22 L2 9 Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" /><path d="M2 9 H22 M8.5 9 12 2 M15.5 9 12 2 M9 9 12 22 M15 9 12 22" stroke="currentColor" stroke-width="1" /></svg>' +
          '</a>' +
          '<button type="button" aria-label="Search" class="transition hover:opacity-70">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" /><line x1="16.2" y1="16.2" x2="21" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</nav>' +
    '<div id="nav-overlay" class="pointer-events-none fixed inset-0 z-[110]">' +
      '<div id="nav-backdrop" class="absolute inset-0 bg-black/0 transition-colors duration-300"></div>' +
      '<div id="nav-panel" class="absolute inset-y-0 left-0 w-full max-w-xs -translate-x-full overflow-y-auto bg-ink px-8 py-8 transition-transform duration-300 ease-out md:px-10 md:py-10">' +
        '<button id="nav-close" type="button" aria-label="Close menu" ' +
          'class="mb-12 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" stroke-width="1.5" />' +
            '<line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" stroke-width="1.5" />' +
          '</svg>' +
        '</button>' +
        '<nav aria-label="Main" class="flex flex-col gap-6">' + linksHTML + '</nav>' +
        '<p class="label mt-12 text-[10px] text-white/40">ANGGARA TREASURES</p>' +
      '</div>' +
    '</div>';

  function init() {
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    var burger = document.getElementById('nav-burger');
    var closeBtn = document.getElementById('nav-close');
    var overlay = document.getElementById('nav-overlay');
    var backdrop = document.getElementById('nav-backdrop');
    var panel = document.getElementById('nav-panel');
    var navRoot = document.getElementById('site-nav');

    function openMenu() {
      overlay.classList.remove('pointer-events-none');
      backdrop.classList.remove('bg-black/0');
      backdrop.classList.add('bg-black/50');
      panel.classList.remove('-translate-x-full');
      panel.classList.add('translate-x-0');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      overlay.classList.add('pointer-events-none');
      backdrop.classList.remove('bg-black/50');
      backdrop.classList.add('bg-black/0');
      panel.classList.add('-translate-x-full');
      panel.classList.remove('translate-x-0');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    panel.querySelectorAll('a[data-nav-link]').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    var current = (location.pathname.split('/').pop() || 'index.html');
    panel.querySelectorAll('a[data-nav-link]').forEach(function (a) {
      if (a.getAttribute('data-nav-link') === current) {
        a.classList.add('text-gold');
      }
    });

    // Adaptive nav color: switches between light (on photo/dark sections)
    // and dark (on white sections) based on whichever section currently
    // sits behind the fixed nav bar.
    var themedSections = Array.prototype.slice.call(document.querySelectorAll('[data-nav-theme]'));
    if (themedSections.length) {
      var ticking = false;
      var probe = 48;

      var updateTheme = function () {
        ticking = false;
        var theme = 'light';
        for (var i = 0; i < themedSections.length; i++) {
          var r = themedSections[i].getBoundingClientRect();
          if (r.top <= probe && r.bottom > probe) {
            theme = themedSections[i].getAttribute('data-nav-theme');
            break;
          }
        }
        navRoot.style.color = theme === 'dark' ? '#1A1612' : '#F0E5D4';
      };

      window.addEventListener('scroll', function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateTheme);
        }
      }, { passive: true });

      updateTheme();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
