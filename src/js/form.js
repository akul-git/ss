document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const fields = ["name", "email", "phone", "subject", "message"];
  

  // Submit-time validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      const input = form.elements[field];
      const error = document.getElementById(`error-${field}`);

      if (!input.checkValidity()) {
        input.setAttribute("aria-invalid", "true");
        error.classList.remove("hidden");
        error.classList.remove("opacity-0");
        isValid = false;
      } else {
        input.setAttribute("aria-invalid", "false");
        error.classList.add("opacity-0");
        setTimeout(() => error.classList.add("hidden"), 300);
      }
    });

    if (isValid) {
      form.requestSubmit(); // More reliable than form.submit()
    }
  });

  // Real-time correction
  fields.forEach((field) => {
    const input = form.elements[field];
    const error = document.getElementById(`error-${field}`);

    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        input.setAttribute("aria-invalid", "false");
        error.classList.add("opacity-0");
        setTimeout(() => error.classList.add("hidden"), 300);
      }
    });
  });
});

const captchaResponse = grecaptcha.getResponse();
const captchaError = document.getElementById("error-captcha");

if (!captchaResponse) {
  captchaError.classList.remove("hidden");
  captchaError.classList.remove("opacity-0");
  isValid = false;
} else {
  captchaError.classList.add("opacity-0");
  setTimeout(() => captchaError.classList.add("hidden"), 300);
}