

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('mousemove', handleMouseMove, { passive: true });

  setInterval(makeStarsTwinkle, 500);

  setupScrollAnimations();

  onScroll();
});

function onScroll() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;


  document.querySelectorAll('.parallax-section').forEach(section => {
    if (isPartlyVisible(section)) moveBackgroundLayers(section, scrollPosition);
  });

  moveSpaceObjects(scrollPosition);
  fadeTitleOnScroll(scrollPosition);


  const legacySpeeds = { '.layer-1': -0.25, '.layer-2': -0.5, '.layer-3': -0.75 };
  Object.keys(legacySpeeds).forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.style.transform = `translateY(${scrollPosition * legacySpeeds[sel]}px)`;
  });


  const rockOffsets = { '.rock-1': 400,'.rock-2':200,'.rock-3':500,'.rock-4':600,'.rock-5':600,'.rock-6':400,'.rock-7':600,'.rock-8':200,'.rock-9':200 };
  const rockSpeeds  = { '.rock-1': .8, '.rock-2':.6, '.rock-3':.4, '.rock-4':.5, '.rock-5':.7, '.rock-6':.7, '.rock-7':.5, '.rock-8':.2, '.rock-9':.4 };
  Object.keys(rockSpeeds).forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const y = (rockOffsets[sel] || 400) - scrollPosition * rockSpeeds[sel];
    el.style.transform = `translateY(${y}px)`;
  });
}

function moveBackgroundLayers(section, scrollPosition) {
  const layers = section.querySelectorAll('.parallax-layer');
  layers.forEach((layer, index) => {
    const speed = 0.2 + (index * 0.2); 
    layer.style.transform = `translateY(${scrollPosition * speed}px)`;
  });
}

function moveSpaceObjects(scrollPosition) {
  const spaceObjects = document.querySelectorAll('.space-object');
  spaceObjects.forEach((object, index) => {
    const speed = 0.3 + (index * 0.05);
    object.style.transform = `translateY(${scrollPosition * speed}px)`;
  });

  
  document.querySelectorAll('.planet').forEach(planet => {
    planet.style.transform = `translateY(${scrollPosition * 0.5}px) rotate(${scrollPosition * 0.05}deg)`;
  });
}

function fadeTitleOnScroll(scrollPosition) {
  const title = document.querySelector('.main-title');
  const tagline = document.querySelector('.tagline');
  const scrollHint = document.querySelector('.scroll-hint');
  if (!title || !tagline || !scrollHint) return;

  const fadeAmount = 1 - (scrollPosition / 500);
  title.style.opacity = Math.max(fadeAmount, 0);
  tagline.style.opacity = Math.max(fadeAmount, 0);
  scrollHint.style.opacity = Math.max(fadeAmount, 0);
}

function makeStarsTwinkle() {
  const stars = document.querySelectorAll('.star');
  const y = (window.pageYOffset || 0) * 0.5;

  stars.forEach(star => {
    if (Math.random() > 0.7) {
      const scale = 0.5 + Math.random() * 1.5;
      const opacity = 0.3 + Math.random() * 0.7;
      star.style.transform = `translateY(${y}px) scale(${scale})`;
      star.style.opacity = opacity;
    }
  });


  const wiggle = Math.sin(Date.now() / 1000) * 5;
  document.querySelectorAll('.comet').forEach(comet => {
    comet.style.transform = `translateX(${wiggle}px) translateY(${(window.pageYOffset||0)*0.4}px)`;
  });
}

function setupScrollAnimations() {
  const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -100px 0px' };
  const contentObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const contentBlocks = document.querySelectorAll('.text-block, .image-block');
  contentBlocks.forEach(block => {
    block.style.opacity = 0;
    block.style.transform = 'translateY(20px)';
    block.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    contentObserver.observe(block);
  });
}

function handleMouseMove(event) {
  const spaceObjects = document.querySelectorAll('.space-object');
  const mouseX = event.clientX / window.innerWidth;
  const mouseY = event.clientY / window.innerHeight;

  spaceObjects.forEach((object, index) => {
    const moveX = (mouseX - 0.5) * 20 * (index % 3 + 1);
    const moveY = (mouseY - 0.5) * 20 * (index % 3 + 1);
    const scrollY = (window.pageYOffset || 0) * (0.3 + (index * 0.05));

    object.style.transform = `translate(${moveX}px, ${scrollY + moveY}px)`;

    if (object.classList.contains('planet')) {
      object.style.transform += ` rotate(${moveX * 2}deg)`;
    }
  });
}

function isPartlyVisible(el) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const h = (window.innerHeight || document.documentElement.clientHeight);
  const w = (window.innerWidth  || document.documentElement.clientWidth);
  return r.right >= 0 && r.bottom >= 0 && r.left <= w && r.top <= h;
}


function fadeTitleOnScroll(scrollPosition) {
  const title = document.querySelector('.main-title');
  const tagline = document.querySelector('.tagline');
  const scrollHint = document.querySelector('.scroll-hint');
  if (!title || !tagline || !scrollHint) return;

  const fadeAmount = Math.max(0, Math.min(1, 1 - (scrollPosition / 500)));
  title.style.opacity = fadeAmount;
  tagline.style.opacity = fadeAmount;
  scrollHint.style.opacity = fadeAmount;
}
