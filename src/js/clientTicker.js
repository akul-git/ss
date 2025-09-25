(() => {
  const track = document.getElementById("logoTrack");
  const slider = document.getElementById("logoSlider");

  let visibleCount = 4;  // number of logos visible at once
  let direction = 1;     // 1 = left-to-right, -1 = right-to-left
  let isPaused = false;
  let currentIndex = 0;
  let slideInterval = 2000; // time in ms between slides
  let timer;

  // clone logos for infinite effect
  const originalLogos = [...track.children];
  originalLogos.forEach(logo => track.appendChild(logo.cloneNode(true)));

  function slide() {
    if (!isPaused) {
      currentIndex += direction;
      const logoWidth = slider.offsetWidth / visibleCount;
      track.style.transform = `translateX(${-currentIndex * logoWidth}px)`;

      // reset when half way through duplicated list
      if (currentIndex >= originalLogos.length) {
        track.style.transition = "none"; // disable animation
        currentIndex = 0;
        track.style.transform = `translateX(0)`;
        setTimeout(() => track.style.transition = "transform 0.6s ease", 20);
      }
      if (currentIndex < 0) {
        track.style.transition = "none";
        currentIndex = originalLogos.length - 1;
        const logoWidth = slider.offsetWidth / visibleCount;
        track.style.transform = `translateX(${-currentIndex * logoWidth}px)`;
        setTimeout(() => track.style.transition = "transform 0.6s ease", 20);
      }
    }
  }

  function startSlider() {
    timer = setInterval(slide, slideInterval);
  }

  function stopSlider() {
    clearInterval(timer);
  }

  // auto start
  startSlider();

  // pause/resume on hover
  slider.addEventListener("mouseenter", () => { isPaused = true; });
  slider.addEventListener("mouseleave", () => { isPaused = false; });

  // touch swipe
  let startX = 0;
  slider.addEventListener("touchstart", e => {
    stopSlider();
    startX = e.touches[0].clientX;
  });
  slider.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      direction = -1; // swipe right → show previous
      slide();
    } else if (startX - endX > 50) {
      direction = 1; // swipe left → show next
      slide();
    }
    startSlider();
  });
})();