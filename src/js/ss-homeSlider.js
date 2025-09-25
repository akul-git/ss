        const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    hamburger.addEventListener('click', () => {
      mobileMenu.style.left = '0';
      overlay.classList.remove('hidden');
    });

    overlay.addEventListener('click', () => {
      mobileMenu.style.left = '-80%';
      overlay.classList.add('hidden');
    });

    (function(){
    const slider = document.querySelector('.slider');
    const track  = slider.querySelector('.slides');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const btnPrev = slider.querySelector('.arrow.left');
    const btnNext = slider.querySelector('.arrow.right');
    const dotsWrap = slider.querySelector('.dots');

    const AUTOPLAY_MS = 4000;    // change speed here
    let index = 0;
    let timer = null;

    // Build dots
    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Go to slide ' + (i+1));
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function updateUI(){
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i){
      index = (i + slides.length) % slides.length;
      updateUI();
    }
    function next(){ goTo(index + 1); }
    function prev(){ goTo(index - 1); }

    // Autoplay controls
    function play(){
      stop();
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop(){
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Init
    goTo(0);
    play();

    // Events
    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);

    // Pause on hover/focus; resume on leave/blur
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', play);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', play);

    // Pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else play();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    });

    // Optional: simple swipe (touch/pointer) support
    let startX = null, dragging = false;
    slider.addEventListener('pointerdown', (e) => {
      dragging = true;
      startX = e.clientX;
      stop(); // pause while dragging
    });
    window.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const threshold = Math.min(120, slider.clientWidth * 0.15);
      if (dx > threshold) prev();
      else if (dx < -threshold) next();
      dragging = false;
      play();
    });
  })();

  const logoStrip = document.getElementById('logoStrip');
const logos = logoStrip.querySelector('.logos');

logoStrip.addEventListener('mouseenter', () => {
  logos.style.animationPlayState = 'paused';
});

logoStrip.addEventListener('mouseleave', () => {
  logos.style.animationPlayState = 'running';
});