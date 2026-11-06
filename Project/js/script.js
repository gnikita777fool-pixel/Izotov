
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .hero > *");

  cards.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }

  const form = document.querySelector("#contact-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const status = document.querySelector("#form-status");

      status.textContent = `Спасибо, ${name}! Форма работает в демонстрационном режиме.`;
      form.reset();
    });
  }
});
