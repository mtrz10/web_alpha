(function () {
  var NAV_LINKS = [
    { href: 'home.html', label: 'HOME' },
    { href: 'about.html', label: 'ABOUT' },
    { href: 'workwithus.html', label: 'WORK WITH US' },
    { href: 'bazi_con.html', label: 'IMPERIAL BAZI CONSULTATION' },
    { href: 'fs_con.html', label: 'IMPERIAL FENG SHUI CONSULTATION' },
    { href: 'heritage.html', label: 'HERITAGE' },
    { href: 'heritage_qianlong.html', label: 'EMPEROR QIANLONG' },
    { href: 'art.html', label: 'THE ART OF JADEITE' },
    { href: 'craftmanship.html', label: 'IMPERIAL SELECTION' },
    { href: 'story.html', label: 'OUR STORY' }
  ];

  var linksHTML = NAV_LINKS.map(function (l) {
    return '<a href="' + l.href + '" class="transition hover:text-gold">' + l.label + '</a>';
  }).join('');

  var footerHTML =
    '<footer data-nav-theme="light" class="section-divider w-full bg-ink px-6 py-10 md:px-14 lg:px-16">' +
      '<div class="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">' +
        '<a href="home.html" class="flex items-center gap-3">' +
          '<svg viewBox="0 0 64 64" fill="none" class="h-8 w-8 text-white">' +
            '<circle cx="32" cy="32" r="29" stroke="currentColor" stroke-width="1.5" />' +
            '<circle cx="32" cy="32" r="24.5" stroke="currentColor" stroke-width="1.5" />' +
            '<rect x="21" y="21" width="22" height="22" stroke="currentColor" stroke-width="1.5" />' +
            '<rect x="26" y="26" width="12" height="12" stroke="currentColor" stroke-width="1.5" />' +
            '<line x1="32" y1="9" x2="32" y2="14" stroke="currentColor" stroke-width="1.5" />' +
            '<line x1="32" y1="50" x2="32" y2="55" stroke="currentColor" stroke-width="1.5" />' +
            '<line x1="9" y1="32" x2="14" y2="32" stroke="currentColor" stroke-width="1.5" />' +
            '<line x1="50" y1="32" x2="55" y2="32" stroke="currentColor" stroke-width="1.5" />' +
          '</svg>' +
          '<span class="brand-mark text-sm text-white">ANGGARA TREASURES</span>' +
        '</a>' +
        '<nav aria-label="Site" class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] tracking-widest text-white/70">' +
          linksHTML +
        '</nav>' +
      '</div>' +
      '<p class="label mt-6 text-center text-[10px] text-white/40">© 2026 ANGGARA TREASURES. ALL RIGHTS RESERVED.</p>' +
    '</footer>';

  // Inserted at this script tag's own position, so the footer lands exactly
  // where <footer>...</footer> used to sit in the page's markup — and
  // before navbar.js runs, so its data-nav-theme is already in the DOM
  // when the adaptive nav color logic scans for themed sections.
  document.currentScript.insertAdjacentHTML('beforebegin', footerHTML);
})();
