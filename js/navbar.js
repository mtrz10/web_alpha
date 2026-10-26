(function () {
  var NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'workwithus.html', label: 'Work With Us' },
    { href: 'bazi_con.html', label: 'Imperial BaZi Consultation' },
    { href: 'fs_con.html', label: 'Imperial Feng Shui Consultation' }
  ];

  var linksHTML = NAV_LINKS.map(function (l) {
    return '<a href="' + l.href + '" data-nav-link="' + l.href + '" ' +
      'class="font-serif text-2xl text-white transition hover:text-gold sm:text-3xl">' + l.label + '</a>';
  }).join('');

  var navHTML =
    '<nav class="absolute inset-x-0 top-0 z-[100] bg-transparent">' +
      '<div class="relative flex items-center px-6 py-5 md:px-10 md:py-6">' +
        '<button id="nav-burger" type="button" aria-label="Open menu" aria-expanded="false" ' +
          'class="flex h-11 w-11 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/50">' +
          '<svg width="20" height="14" viewBox="0 0 20 14" fill="none">' +
            '<line x1="0" y1="1" x2="20" y2="1" stroke="white" stroke-width="1.5" />' +
            '<line x1="0" y1="7" x2="20" y2="7" stroke="white" stroke-width="1.5" />' +
            '<line x1="0" y1="13" x2="20" y2="13" stroke="white" stroke-width="1.5" />' +
          '</svg>' +
        '</button>' +
        '<a href="index.html" aria-label="Anggara Treasures — Home" ' +
          'class="absolute left-1/2 top-1/2 block h-11 w-11 -translate-x-1/2 -translate-y-1/2">' +
          '<img src="img/icon.png" alt="Anggara Treasures" class="h-11 w-11 object-contain" />' +
        '</a>' +
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
