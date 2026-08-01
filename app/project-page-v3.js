(() => {
  'use strict';

  const two = value => String(value).padStart(2, '0');
  const numbered = (start, end, extension = 'png') =>
    Array.from({ length: end - start + 1 }, (_, index) => `${two(start + index)}.${extension}`);
  const mediaPath = (folder, file, mediaFolder = 'media') =>
    ['asst', folder, mediaFolder, file].filter(Boolean).map(encodeURIComponent).join('/');
  const coverPath = (folder, file = 'cover.png') =>
    ['asst', folder, file].map(encodeURIComponent).join('/');

  const projects = {
    'visit-siwa-travel': {
      title: 'Visit Siwa Travel',
      type: 'Travel Brand Identity',
      year: '2026',
      folder: 'Siwa',
      cover: 'cover 2.png',
      mediaFolder: '',
      accent: '#f2c078',
      behance: 'https://www.behance.net/gallery/250160241/Visit-Siwa-Travel-Brand-Identity',
      brief: 'A destination identity that translates the soul of Siwa into a warm, premium and unmistakably Egyptian travel brand.',
      challenge: 'The system balances desert heritage, oasis calm and contemporary tourism across campaign, print and experience touchpoints.',
      caseTitle: 'A land that tells a thousand stories.',
      caseIntro: 'The complete visual journey, presented in the same deliberate sequence as the original case study.',
      media: ['1.png', 'logo.mp4', '2.mp4', '3.png', '4.mp4', ...Array.from({ length: 15 }, (_, index) => `${index + 4}.png`)]
    },
    'sage-brand-identity': {
      title: 'SAGE Brand Identity',
      type: 'Strategic Brand System',
      year: '2026',
      folder: 'SAGE Brand identity',
      accent: '#b8ff39',
      behance: 'https://www.behance.net/gallery/246552875/SAGE-Brand-identity?platform=direct',
      brief: 'A refined identity built around clarity, consistency and confident communication.',
      challenge: 'The design language needed to feel premium and calm while remaining flexible across every brand application.',
      caseTitle: 'Nature meets refined living.',
      caseIntro: 'A complete brand system shaped through typography, image direction, color and considered applications.',
      media: [...numbered(1, 6), '07.mp4', ...numbered(8, 16)]
    },
    'west-reb-identity': {
      title: 'West Reb Brand Identity',
      type: 'Real Estate Branding',
      year: '2025',
      folder: 'west reb Brand Identity',
      accent: '#e8b779',
      behance: 'https://www.behance.net/gallery/238525745/west-reb-Brand-Identity?platform=direct',
      brief: 'A contemporary real-estate identity designed to communicate place, structure and lasting value.',
      challenge: 'The visual system unifies architectural confidence with an accessible tone for modern property audiences.',
      caseTitle: 'Built for modern destinations.',
      caseIntro: 'The identity moves from its core mark into a cohesive real-estate experience across every branded surface.',
      media: ['01.png', '02.gif', ...numbered(3, 20)]
    },
    'hunger-station': {
      title: 'Hunger Station Identity & Packaging',
      type: 'Identity & Packaging',
      year: '2026',
      folder: 'Hunger Station identity & Packaging',
      accent: '#ffb62f',
      behance: 'https://www.behance.net/gallery/245087451/Hunger-Station-identity-Packaging-Fried-Chicken?platform=direct',
      brief: 'A bold fried-chicken identity where flavor, speed and attitude meet in one energetic visual system.',
      challenge: 'The packaging had to feel instantly recognizable, appetite-led and powerful enough to own every delivery moment.',
      caseTitle: 'Flavor made impossible to ignore.',
      caseIntro: 'From the core identity to animated moments and packaging, every piece is designed to arrive with impact.',
      media: [...numbered(1, 3), '04.mp4', '05.mp4', ...numbered(6, 22)]
    },
    'fashion-for-ajurs': {
      title: 'AI Photoshoot Fashion For Ajurs',
      type: 'AI Fashion Photoshoot',
      year: '2026',
      folder: 'Ai Photoshoot Fashion For Ajurs',
      accent: '#db84ff',
      behance: 'https://www.behance.net/gallery/244431391/Ai-Photoshoot-Fashion-For-Ajurs?platform=direct',
      brief: 'An AI-directed fashion story combining stylized art direction, cinematic environments and a consistent editorial mood.',
      challenge: 'The goal was to keep the collection visually coherent while exploring new frames, motion and expressive fashion imagery.',
      caseTitle: 'Fashion beyond the expected.',
      caseIntro: 'A long-form visual editorial that moves between still photography, AI motion and campaign-ready compositions.',
      media: [...numbered(1, 6), '07.mp4', ...numbered(8, 39), '40.mp4', '41.mp4', '42.png']
    },
    overthinking: {
      title: 'OVERTHINKING - Poster Design',
      type: 'Poster Design',
      year: '2025',
      folder: 'OVERTHINKING - Poster Design',
      accent: '#ff604c',
      behance: 'https://www.behance.net/gallery/230891259/OVERTHINKING-Poster-Design?platform=direct',
      brief: 'An expressive poster series that turns mental repetition, pressure and visual tension into a graphic narrative.',
      challenge: 'Typography and image treatment work together to capture the restless rhythm of an overactive mind.',
      caseTitle: 'When thoughts become visual noise.',
      caseIntro: 'A focused poster experiment built from distortion, contrast, movement and deliberate visual discomfort.',
      media: [...numbered(1, 3), '04.gif', ...numbered(5, 15)]
    },
    'dsat-real-estate': {
      title: 'DSAT Real Estate Brand Identity',
      type: 'Real Estate Identity',
      year: '2025',
      folder: 'Dsat Real Estate Brand Identity',
      accent: '#55d9d0',
      behance: 'https://www.behance.net/gallery/237714435/Dsat-Real-Estate-Brand-Identity?platform=direct',
      brief: 'A distinctive property identity built to express trust, modern ambition and a clear sense of place.',
      challenge: 'The system needed to work equally well across corporate communication, property marketing and physical applications.',
      caseTitle: 'A sharper point of view.',
      caseIntro: 'A structured identity system developed from a confident mark into a complete real-estate brand language.',
      media: ['01.png', '02.gif', ...numbered(3, 8), '09.gif', ...numbered(10, 19)]
    },
    'skincare-identity': {
      title: 'Skincare Identity - Cosmetics Packaging',
      type: 'Cosmetics Packaging',
      year: '2025',
      folder: 'Skincare Identity — cosmetics Packaging',
      accent: '#f1a6bc',
      behance: 'https://www.behance.net/gallery/229304933/Skincare-Identity-cosmetics-Packaging?platform=direct',
      brief: 'A clean skincare identity with a soft visual character and a packaging system designed for shelf clarity.',
      challenge: 'The brand had to feel gentle and credible while keeping every product family consistent and easy to navigate.',
      caseTitle: 'A cleaner ritual for everyday care.',
      caseIntro: 'A compact beauty system combining a clear hierarchy, tactile packaging and calm campaign imagery.',
      media: ['01.png', ...numbered(2, 8, 'jpg'), ...numbered(9, 12)]
    },
    'ta3lmha-rebranding': {
      title: 'Ta3lmha Rebranding',
      type: 'Brand Refresh',
      year: '2025',
      folder: 'Ta3lmha Rebranding',
      accent: '#64d2ff',
      behance: 'https://www.behance.net/gallery/236425173/Rebranding-Brand-Identity?platform=direct',
      brief: 'A purposeful rebrand that keeps the familiar spirit of Ta3lmha while giving it a clearer, more adaptable identity.',
      challenge: 'The refresh needed to modernize the brand without losing the recognition and personality already built with its audience.',
      caseTitle: 'A familiar brand, ready for what is next.',
      caseIntro: 'The transformation is shown from before and after through a complete, practical and expressive identity system.',
      media: ['01.png', '02.png', '03.mp4', '04-before.png', '05-after.png', ...numbered(6, 25)]
    }
  };

  const escapeHtml = value => String(value).replace(/[&<>"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
  }[character]));
  const isVideo = file => /\.(mp4|webm|mov)$/i.test(file);

  function projectMedia(item, file, index) {
    const source = mediaPath(item.folder, file, item.mediaFolder);
    const caption = `${two(index + 1)} / ${item.title}`;
    if (isVideo(file)) {
      return `<figure class="projectMedia in"><video autoplay muted loop controls playsinline preload="metadata" aria-label="${escapeHtml(caption)}"><source src="${source}"></video><figcaption>${escapeHtml(caption)} - Motion</figcaption></figure>`;
    }
    return `<figure class="projectMedia"><img src="${source}" alt="${escapeHtml(caption)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  }

  function render(item) {
    const root = document.querySelector('#project');
    const cover = coverPath(item.folder, item.cover || 'cover.png');
    const firstImage = item.media.find(file => !isVideo(file));
    const selectedVisual = firstImage ? mediaPath(item.folder, firstImage, item.mediaFolder) : cover;
    const longTitle = item.title.length > 25 ? 'longProjectTitle' : '';
    document.title = `${item.title} - Petro Designer`;
    root.style.setProperty('--project-accent', item.accent);
    root.innerHTML = `
      <section class="hero">
        <img class="heroImage" src="${cover}" alt="${escapeHtml(item.title)} cover">
        <div class="heroCopy">
          <div class="eyebrow"><span>${escapeHtml(item.type)}</span><span>PETRO DESIGNER / ${escapeHtml(item.year)}</span></div>
          <h1 class="${longTitle}">${escapeHtml(item.title)}</h1>
        </div>
      </section>
      <section class="summary">
        <h2>IDEA INTO<br><span>IDENTITY.</span></h2>
        <div class="summaryText"><p>${escapeHtml(item.brief)}</p><p>${escapeHtml(item.challenge)}</p></div>
      </section>
      <section class="facts" aria-label="Project facts">
        <div><small>01 / SERVICE</small><b>${escapeHtml(item.type)}</b></div>
        <div><small>02 / ROLE</small><b>Art Direction &amp; Design</b></div>
        <div><small>03 / YEAR</small><b>${escapeHtml(item.year)}</b></div>
        <div><small>04 / OUTPUT</small><b>Identity &amp; Visual System</b></div>
      </section>
      <section class="visual">
        <img src="${selectedVisual}" alt="Selected visual from ${escapeHtml(item.title)}" loading="eager" decoding="async">
        <div class="visualMeta"><span>SELECTED VISUAL</span><span>01 / PROJECT SYSTEM</span></div>
      </section>
      <section class="process">
        <small>DESIGN PROCESS / 01-04</small>
        <div class="steps">
          <article><b>01</b><h3>Discover</h3><p>Understanding the audience, context and central opportunity behind the project.</p></article>
          <article><b>02</b><h3>Define</h3><p>Building the strategic idea, tone and creative direction that guide every decision.</p></article>
          <article><b>03</b><h3>Design</h3><p>Turning the concept into a distinctive identity with a consistent visual language.</p></article>
          <article><b>04</b><h3>Deliver</h3><p>Extending the system across the applications that make the brand feel complete.</p></article>
        </div>
      </section>
      <section class="localCase">
        <div class="localCaseHead">
          <div><small>FULL CASE STUDY</small><h2>${escapeHtml(item.caseTitle)}</h2></div>
          <p>${escapeHtml(item.caseIntro)}</p>
        </div>
        <div class="projectGallery">${item.media.map((file, index) => projectMedia(item, file, index)).join('')}</div>
      </section>
      <section class="cta">
        <p>VIEW THE ORIGINAL PRESENTATION</p>
        <h2>LIKE WHAT<br>YOU SEE?</h2>
        <a href="${item.behance}" target="_blank" rel="noopener">VIEW ON BEHANCE &nearr;</a>
      </section>`;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '160px 0px', threshold: 0.02 });
    root.querySelectorAll('.projectMedia:not(.in)').forEach(media => observer.observe(media));
  }

  function showMissing() {
    document.querySelector('#project').innerHTML = '<section class="missing"><div><h1>PROJECT NOT FOUND</h1><a href="index.html">BACK TO PROJECTS</a></div></section>';
  }

  const themeButton = document.querySelector('#themeBtn');
  const updateThemeButton = () => {
    const light = document.documentElement.dataset.theme === 'light';
    themeButton.textContent = light ? 'DARK' : 'LIGHT';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  };
  themeButton.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('petroTheme', next);
    updateThemeButton();
  });
  updateThemeButton();

  const id = new URLSearchParams(window.location.search).get('id');
  if (id && projects[id]) render(projects[id]);
  else showMissing();
})();
