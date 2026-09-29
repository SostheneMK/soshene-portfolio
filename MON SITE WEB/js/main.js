/* Portfolio SK — script.js (version corrigée et consolidée) */
(() => {
  const NEWSLETTER_URL = "https://script.google.com/macros/s/AKfycbwQkZ1OfTNE_JX_9vM_NVPDwG1OmLETPxkDUOj58AnmNsS3eL0Sm6p0iNJVb4xAMU4j/exec";

  /* ---------- Utilitaires ---------- */
  const ready = fn => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn)
    : fn();

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* stockage indisponible */ } }
  };

  // Envoi vers Google Apps Script (no-cors : la réponse est opaque, mais l'envoi fonctionne)
  async function sendToScript(payload) {
    await fetch(NEWSLETTER_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
  }

  /* ---------- Données ---------- */
  const pages = [
    ['index.html', 'home'], ['about.html', 'about'], ['projects.html', 'projects'],
    ['services.html', 'services'], ['contact.html', 'contact'],
    ['gallery.html', 'gallery'], ['cv.html', 'cv']
  ];

  const c = {
    fr: {
      home: 'Accueil', about: 'À propos', projects: 'Projets', services: 'Prestations', contact: 'Contact',
      gallery: 'Galerie', cv: 'CV',
      social: 'Suivez-moi', newsletter: 'Newsletter',
      newsletterText: 'Recevez les prochaines réalisations et réflexions du studio.',
      email: 'Votre adresse e-mail', subscribe: "S'abonner", rights: 'Tous droits réservés',
      newsletterOk: 'Merci pour votre inscription à la newsletter !',
      newsletterError: "Erreur lors de l'inscription à la newsletter.",
      contactOk: 'Merci ! Votre message a bien été envoyé.',
      contactError: "Erreur lors de l'envoi du message. Veuillez réessayer.",
      details: 'Détails', close: 'Fermer', theme: 'Changer le thème',
      openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', backTop: 'Retour en haut', loading: 'Chargement',
      heroKicker: 'Portfolio · Architecture & construction',
      heroTitle: 'Imaginer des espaces qui ont du sens.',
      heroText: "Je suis SK, étudiant passionné d'architecture, de construction et d'informatique. Je conçois des lieux pensés pour les personnes, leur usage et leur avenir.",
      heroCta: 'Découvrir mes réalisations ↗', contactCta: 'Parlons de votre projet →',
      introKicker: 'Une approche attentive', introTitle: "L'architecture commence par une bonne écoute.",
      introText: "Chaque projet est une rencontre entre une idée, un lieu et celles et ceux qui l'habiteront. Mon travail associe sensibilité architecturale, précision technique et curiosité numérique.",
      projectsKicker: 'Sélection de projets', projectsTitle: 'Réalisations en lumière', allProjects: 'Voir tous les projets →',
      projectOne: 'Habitat contemporain', projectOneType: 'Étude conceptuelle',
      projectTwo: 'Pavillon des rencontres', projectTwoType: 'Espace culturel',
      projectThree: 'Vivre verticalement', projectThreeType: 'Habitat collectif',
      servicesKicker: 'Prestations', servicesTitle: "De l'esquisse à la représentation de votre idée.",
      serviceOne: 'Conception architecturale', serviceTwo: 'Plans & modélisation 3D', serviceThree: 'Visualisation de projets',
      servicesCta: 'Mes prestations ↗',
      profileKicker: 'Mon profil', profileTitle: 'Étudiant en génie civil, créatif et curieux.',
      profileText1: "Je suis un jeune passionné par l’architecture, la conception des bâtiments et l’informatique. J’aime transformer une idée en un espace cohérent, fonctionnel et agréable à vivre.",
      profileText2: "À travers ce portfolio, je partage mon évolution, mes projets et ma vision d’une architecture attentive aux personnes et à son environnement.",
      profileCta: 'En savoir plus sur mon parcours →',
      tagArchitecture: 'Architecture', tagConstruction: 'Construction', tag3d: 'Modélisation 3D', tagIt: 'Informatique'
    },
    en: {
      home: 'Home', about: 'About', projects: 'Projects', services: 'Services', contact: 'Contact',
      gallery: 'Gallery', cv: 'CV',
      social: 'Follow me', newsletter: 'Newsletter',
      newsletterText: 'Receive the studio’s latest projects and reflections.',
      email: 'Your email address', subscribe: 'Subscribe', rights: 'All rights reserved',
      newsletterOk: 'Thank you for subscribing to the newsletter!',
      newsletterError: 'Error while subscribing to the newsletter.',
      contactOk: 'Thank you! Your message has been sent.',
      contactError: 'Error while sending your message. Please try again.',
      details: 'Details', close: 'Close', theme: 'Change theme',
      openMenu: 'Open menu', closeMenu: 'Close menu', backTop: 'Back to top', loading: 'Loading',
      heroKicker: 'Portfolio · Architecture & construction',
      heroTitle: 'Imagining spaces that matter.',
      heroText: 'I am SK, a student passionate about architecture, construction and technology. I design places for people, their uses and their future.',
      heroCta: 'Discover my work ↗', contactCta: "Let's discuss your project →",
      introKicker: 'A thoughtful approach', introTitle: 'Architecture begins with careful listening.',
      introText: 'Each project is a meeting point between an idea, a place and the people who will inhabit it. My work brings together architectural sensitivity, technical precision and digital curiosity.',
      projectsKicker: 'Selected work', projectsTitle: 'Projects in focus', allProjects: 'View all projects →',
      projectOne: 'Contemporary home', projectOneType: 'Concept study',
      projectTwo: 'Gathering pavilion', projectTwoType: 'Cultural space',
      projectThree: 'Living vertically', projectThreeType: 'Collective housing',
      servicesKicker: 'Services', servicesTitle: 'From the first sketch to a clear representation of your idea.',
      serviceOne: 'Architectural design', serviceTwo: 'Plans & 3D modelling', serviceThree: 'Project visualisation',
      servicesCta: 'My services ↗',
      profileKicker: 'My profile', profileTitle: 'A civil engineering student, creative and curious.',
      profileText1: "I'm a young person passionate about architecture, building design and computing. I love turning an idea into a coherent, functional space that's pleasant to live in.",
      profileText2: "Through this portfolio, I share my progress, my projects and my vision of an architecture that pays attention to people and their environment.",
      profileCta: 'Learn more about my journey →',
      tagArchitecture: 'Architecture', tagConstruction: 'Construction', tag3d: '3D modelling', tagIt: 'Computing'
    }
  };

  const galleryDescriptions = {
    "Habitat contemporain — Étude conceptuelle": "Une étude résidentielle qui privilégie la lumière naturelle, les volumes simples et le lien avec le paysage.",
    "Lumière et espace public": "Un lieu pensé pour accueillir, se rencontrer et révéler les usages collectifs.",
    "Étude de matière": "Une recherche sur les textures, les teintes minérales et la matérialité du bâti.",
    "Maison et paysage": "Une maison ouverte sur son environnement, entre intimité, vues cadrées et confort quotidien.",
    "Architecture urbaine": "Une réflexion sur la densité, les mobilités et la place de l'architecture dans la ville.",
    "Jeu d'ombres": "Une composition de lumière, de rythme et de contrastes pour enrichir l'expérience de l'espace."
  };

  /* ---------- État ---------- */
  const saved = store.get('sk-language');
  let lang = saved in c ? saved : 'fr';
  const currentPage = document.body.dataset.page || 'home';

  const savedTheme = store.get('sk-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') document.documentElement.dataset.theme = savedTheme;

  /* ---------- Rendu (en-tête, pied de page, textes traduits) ---------- */
  function render(root) {
    const t = c[lang];
    document.documentElement.lang = lang;

    const header = document.querySelector('[data-site-header]');
    const footer = document.querySelector('[data-site-footer]');

    if (header) {
      header.querySelector('.nav-list').innerHTML = pages.map(([href, key]) =>
        `<li><a class="nav-link" href="${href}"${key === currentPage ? ' aria-current="page"' : ''}>${t[key]}</a></li>`
      ).join('');
      header.querySelector('.language-toggle').textContent = lang === 'fr' ? 'EN ▼' : 'FR ▼';
      header.querySelector('.theme-toggle').setAttribute('aria-label', t.theme);
      const menu = header.querySelector('.menu-toggle');
      const open = header.querySelector('.primary-nav').classList.contains('is-open');
      menu.setAttribute('aria-label', open ? t.closeMenu : t.openMenu);
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
    });

    if (footer) {
      footer.querySelector('.footer-social .footer-label').textContent = t.social;
      footer.querySelector('.nl-title').textContent = t.newsletter;
      footer.querySelector('.nl-text').textContent = t.newsletterText;
      footer.querySelector('input').placeholder = t.email;
      footer.querySelector('form button').textContent = t.subscribe;
      footer.querySelector('.footer-bottom span').textContent = '| ' + t.rights;
    }

    document.querySelector('.back-top')?.setAttribute('aria-label', t.backTop);
    document.querySelectorAll('.image-details').forEach(b => { b.firstChild.textContent = t.details + ' '; });
    document.querySelectorAll('.note-close').forEach(b => b.setAttribute('aria-label', t.close));
  }

  function buildLayout() {
    const header = document.querySelector('[data-site-header]');
    const footer = document.querySelector('[data-site-footer]');

    if (header) {
      header.innerHTML =
        '<header class="site-header"><div class="header-inner">' +
        '<a class="logo" href="index.html">SK</a>' +
        '<button class="menu-toggle" type="button" aria-expanded="false">☰</button>' +
        '<nav class="primary-nav"><ul class="nav-list"></ul></nav>' +
        '<button class="language-toggle" type="button"></button>' +
        '<button class="theme-toggle" type="button">◐</button>' +
        '</div></header>';
    }

    if (footer) {
      footer.innerHTML =
        '<footer class="site-footer"><div class="footer-main">' +
        '<a class="logo footer-logo" href="index.html">SK</a>' +
        '<div class="footer-social"><p class="footer-label"></p>' +
        '<a href="https://www.linkedin.com/in/sosth%C3%A8ne-kizinguere-365382433/" target="_blank" rel="noopener noreferrer"><img src="assets/icons/web/icons8-linkedin-ios-27-outlined-32.png" alt="">LinkedIn</a>' +
        '<a href="https://www.facebook.com/sosthene.kizinguere/" target="_blank" rel="noopener noreferrer"><img src="assets/icons/web/icons8-facebook-ios-27-outlined-32.png" alt="">Facebook</a>' +
        '<a href="https://x.com/SMokobena" target="_blank" rel="noopener noreferrer"><img src="assets/icons/x.webp" alt="">X</a>' +
        '<a href="https://t.me/sosthenekizinguere" target="_blank" rel="noopener noreferrer"><img src="assets/icons/telegram.svg" alt="">Telegram</a>' +
        '</div>' +
        '<div class="footer-newsletter"><p class="footer-label nl-title"></p><p class="nl-text"></p>' +
        '<form><input type="email" required><button type="submit"></button></form></div>' +
        '</div><div class="footer-bottom">©2026 SK <span></span></div></footer>';
    }
  }

  /* ---------- Comportements ---------- */
  function setupHeader() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;

    const menu = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.primary-nav');

    const setMenu = open => {
      nav.classList.toggle('is-open', open);
      menu.textContent = open ? '×' : '☰';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? c[lang].closeMenu : c[lang].openMenu);
    };
    setMenu(false);
    menu.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

    header.querySelector('.language-toggle').addEventListener('click', () => {
      lang = lang === 'fr' ? 'en' : 'fr';
      store.set('sk-language', lang);
      render();
    });

    const theme = header.querySelector('.theme-toggle');
    const updateThemeIcon = () => { theme.textContent = document.documentElement.dataset.theme === 'dark' ? '☀' : '◐'; };
    updateThemeIcon();
    theme.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      store.set('sk-theme', next);
      updateThemeIcon();
    });
  }

  function setupNewsletter() {
    const form = document.querySelector('[data-site-footer] form');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const button = form.querySelector('button');
      const email = form.querySelector('input[type="email"]').value.trim();
      button.disabled = true;
      try {
        await sendToScript({ email });
        alert(c[lang].newsletterOk);
        form.reset();
      } catch (error) {
        console.error(error);
        alert(c[lang].newsletterError);
      } finally {
        button.disabled = false;
      }
    });
  }

  function setupContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    const status = form.querySelector('.form-status');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      try {
        // Nécessite que le script Apps Script traite les données avec type "contact"
        await sendToScript({ type: 'contact', ...Object.fromEntries(new FormData(form)) });
        if (status) status.textContent = c[lang].contactOk;
        form.reset();
      } catch (error) {
        console.error(error);
        if (status) status.textContent = c[lang].contactError;
      } finally {
        if (button) button.disabled = false;
      }
    });
  }

  function setupLoader() {
    document.body.insertAdjacentHTML('afterbegin',
      `<div class="loader" aria-label="${c[lang].loading}"><span class="loader-mark">SK</span></div>`);
    const loader = document.querySelector('.loader');
    const hide = () => loader.classList.add('is-hidden');
    if (document.readyState === 'complete') setTimeout(hide, 350);
    else window.addEventListener('load', () => setTimeout(hide, 350));
    setTimeout(hide, 1800);
  }

  function setupScrollUI() {
    // Barre de progression (créée une seule fois)
    document.body.insertAdjacentHTML('afterbegin', '<div class="scroll-progress" aria-hidden="true"><span></span></div>');
    const fill = document.querySelector('.scroll-progress span');

    // Bouton retour en haut
    document.body.insertAdjacentHTML('beforeend',
      `<button class="back-top" type="button" aria-label="${c[lang].backTop}">↑</button>`);
    const backTop = document.querySelector('.back-top');
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      fill.style.width = Math.min(100, window.scrollY / max * 100) + '%';
      backTop.classList.toggle('is-visible', window.scrollY > 420);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  }

  function setupReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .15 });
    items.forEach(el => observer.observe(el));
  }

  function setupGallery() {
    // Cartes avec bouton « Détails »
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (item.closest('.gallery-card')) return;

      const card = document.createElement('article');
      card.className = 'gallery-card' + (item.classList.contains('wide') ? ' wide' : '');
      item.parentNode.insertBefore(card, item);
      card.appendChild(item);

      const caption = item.dataset.caption || '';
      const description = galleryDescriptions[caption] || 'Découvrez les intentions et les choix qui ont façonné ce projet.';

      const detailsBtn = document.createElement('button');
      detailsBtn.className = 'image-details';
      detailsBtn.type = 'button';
      detailsBtn.append(document.createTextNode(c[lang].details + ' '), Object.assign(document.createElement('span'), { textContent: '+' }));

      const note = document.createElement('div');
      note.className = 'image-note';
      const bg = getComputedStyle(item).backgroundImage;
      note.style.backgroundImage = bg && bg !== 'none'
        ? `linear-gradient(90deg, rgba(24,22,19,.92), rgba(24,22,19,.55)), ${bg}`
        : 'linear-gradient(90deg, rgba(24,22,19,.92), rgba(24,22,19,.55))';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'note-close';
      closeBtn.type = 'button';
      closeBtn.textContent = '×';
      closeBtn.setAttribute('aria-label', c[lang].close);

      const eyebrow = document.createElement('p');
      eyebrow.className = 'eyebrow';
      eyebrow.textContent = caption;
      const text = document.createElement('p');
      text.textContent = description;

      note.append(closeBtn, eyebrow, text);
      card.append(detailsBtn, note);

      detailsBtn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-card.details-open').forEach(x => { if (x !== card) x.classList.remove('details-open'); });
        card.classList.toggle('details-open');
      });
      closeBtn.addEventListener('click', () => card.classList.remove('details-open'));
    });

    // Filtres : on masque la CARTE entière (pas seulement l'image)
    const buttons = document.querySelectorAll('.gallery-filters button');
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(x => x.classList.toggle('is-active', x === button));
      document.querySelectorAll('.gallery-item').forEach(item => {
        const hide = button.dataset.filter !== 'all' && !item.classList.contains(button.dataset.filter);
        (item.closest('.gallery-card') || item).classList.toggle('is-hidden', hide);
      });
    }));

    // Fermeture de la lightbox
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      const close = () => { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); };
      lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
      lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
  }

  function setupMisc() {
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.insertAdjacentHTML('beforeend', '<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">');
    }
    const whatsapp = document.querySelector('.whatsapp-icon');
    if (whatsapp) whatsapp.innerHTML = '<img src="assets/icons/whatsapp.svg" alt="WhatsApp">';
  }

  /* ---------- Démarrage ---------- */
  ready(() => {
    buildLayout();
    setupHeader();
    setupNewsletter();
    setupContactForm();
    setupLoader();
    setupScrollUI();
    setupReveal();
    setupGallery();
    setupMisc();
    render();
  });
})();