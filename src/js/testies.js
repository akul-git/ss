window.addEventListener('load', () => {
  const activeSlide = testimonials[currentIndex];
  const container = document.querySelector('.testimonial-container');
  container.style.height = activeSlide.offsetHeight + 'px';
});


const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.getElementById('dots');
// const prevBtn = document.getElementById('prev');
// const nextBtn = document.getElementById('next');

let currentIndex = 0;
let pauseDuration = 10000; // 5 seconds
let autoSlide;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

 
  const activeSlide = testimonials[index];
  const container = document.querySelector('.testimonial-container');
  container.style.height = activeSlide.offsetHeight + 'px';

  currentIndex = index;
}


function createDots() {
  testimonials.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      showTestimonial(i);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function nextTestimonial() {
  let nextIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(nextIndex);
}

function prevTestimonial() {
  let prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextTestimonial, pauseDuration);
}

// Initialize
createDots();
showTestimonial(currentIndex);
autoSlide = setInterval(nextTestimonial, pauseDuration);

// nextBtn.addEventListener('click', () => {
//   nextTestimonial();
//   resetAutoSlide();
// });

// prevBtn.addEventListener('click', () => {
//   prevTestimonial();
//   resetAutoSlide();
// });