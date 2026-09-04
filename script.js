(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smooth = value => value * value * (3 - 2 * value);

  requestAnimationFrame(() => body.classList.add('is-ready'));

  const menuButton = document.querySelector('.menu-toggle');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  const closeMenu = () => {
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Menü öffnen');
  };

  menuButton?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  });
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const selectTab = tab => {
    tabs.forEach(item => {
      const selected = item === tab;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      panel?.classList.toggle('is-active', selected);
      if (panel) panel.hidden = !selected;
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  const hero = document.querySelector('.hero');
  const dayStory = document.querySelector('.day-story');
  const dayScenes = [...document.querySelectorAll('.day-scene')];
  const dayLabel = document.querySelector('.day-index-label');
  const filmstrip = document.querySelector('.filmstrip');
  const filmTrack = document.querySelector('.filmstrip-track');
  const parallaxImages = [...document.querySelectorAll('.parallax-media img')];
  let ticking = false;

  const sectionProgress = section => {
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
  };

  const updateHero = () => {
    if (!hero) return;
    const progress = smooth(sectionProgress(hero));
    root.style.setProperty('--hero-progress', progress.toFixed(4));
  };

  const updateDay = () => {
    if (!dayStory || !dayScenes.length) return;
    const progress = sectionProgress(dayStory);
    const position = progress * (dayScenes.length - 1);
    const base = Math.floor(position);
    const fraction = smooth(position - base);

    dayScenes.forEach((scene, index) => {
      let visibility = 0;
      if (index === base) visibility = base === dayScenes.length - 1 ? 1 : 1 - fraction;
      if (index === base + 1) visibility = fraction;
      scene.style.opacity = visibility.toFixed(4);
      scene.style.setProperty('--scene-visible', visibility.toFixed(4));
      scene.style.pointerEvents = visibility > .5 ? 'auto' : 'none';
    });

    root.style.setProperty('--day-progress', progress.toFixed(4));
    const activeIndex = Math.min(dayScenes.length - 1, Math.round(position));
    if (dayLabel) dayLabel.textContent = dayScenes[activeIndex].dataset.label || '';
  };

  const updateFilmstrip = () => {
    if (!filmstrip || !filmTrack) return;
    const progress = smooth(sectionProgress(filmstrip));
    const maxTravel = Math.max(0, filmTrack.scrollWidth - window.innerWidth + 32);
    filmTrack.style.transform = `translate3d(${-maxTravel * progress}px,-22%,0)`;
    root.style.setProperty('--film-progress', progress.toFixed(4));
  };

  const updateParallax = () => {
    if (reduceMotion) return;
    parallaxImages.forEach(image => {
      const rect = image.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      image.style.setProperty('--parallax', `${clamp(centerOffset, -.8, .8) * -55}px`);
    });
  };

  const update = () => {
    updateHero();
    updateDay();
    updateFilmstrip();
    updateParallax();
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  if (!reduceMotion) {
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('resize', requestUpdate);
  } else {
    dayScenes.forEach((scene, index) => {
      scene.style.opacity = index === 0 ? '1' : '0';
      scene.style.setProperty('--scene-visible', index === 0 ? '1' : '0');
    });
  }

  update();
})();
