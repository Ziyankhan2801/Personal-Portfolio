// File: assets/js/main.js

// safer scrollHeader using window.scrollY
function scrollHeader() {
  const header = document.getElementById("header");
  if (!header) return;
  if (window.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");
// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  if (!modalViews[modalClick]) return;
  modalViews[modalClick].classList.add("active-modal");
};
modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});
modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

let mixer = null;
if (typeof mixitup !== "undefined") {
  mixer = mixitup(".work__container", {
    selectors: {
      target: ".work__card",
    },
    animation: {
      duration: 300,
    },
  });
}

const workLinks = document.querySelectorAll(".work__item");
function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}
workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

// Swiper init (guard)
let swiperTestimonial = null;
if (typeof Swiper !== "undefined") {
  swiperTestimonial = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 48,
      },
    },
  });
}

const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    const selector = `.nav__menu a[href*="${sectionId}"]`;
    const link = document.querySelector(selector);
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Theme toggle
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "light" : "dark";
const getCurrentIcon = () =>
  themeButton && themeButton.classList.contains(iconTheme) ? "bx bx-sun" : "bx bx-moon";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // apply saved theme: 'light' or 'dark'
  document.body.classList[selectedTheme === "light" ? "add" : "remove"](lightTheme);
}
if (selectedIcon && themeButton) {
  // selectedIcon stored as "bx bx-sun" or "bx bx-moon"
  // if saved icon is sun, ensure iconTheme class is present
  themeButton.classList[selectedIcon === "bx bx-sun" ? "add" : "remove"](iconTheme);
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
  themeButton.addEventListener("click", () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

/* ===== ScrollReveal ===== */
const sr = (typeof ScrollReveal !== "undefined") ? ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
}) : null;

if (sr) {
  sr.reveal(`.nav__menu`, {
    delay: 100,
    scale: 0.1,
    origin: "bottom",
    distance: "300px",
  });
  sr.reveal(`.home__data`);
  sr.reveal(`.home__handle`, {
    delay: 100,
  });
  sr.reveal(`.home__social, .home__scroll`, {
    delay: 100,
    origin: "bottom",
  });
  sr.reveal(`.about__img`, {
    delay: 100,
    origin: "left",
    scale: 0.9,
    distance: "30px",
  });
  sr.reveal(`.about__data, .about__description, .about__button-contact`, {
    delay: 100,
    scale: 0.9,
    origin: "right",
    distance: "30px",
  });
  sr.reveal(`.skills__content`, {
    delay: 100,
    scale: 0.9,
    origin: "bottom",
    distance: "30px",
  });
  // fixed selector - add dots before class names
  sr.reveal(`.services__title, .services__button`, {
    delay: 100,
    scale: 0.9,
    origin: "top",
    distance: "30px",
  });
  sr.reveal(`.work__card`, {
    delay: 100,
    scale: 0.9,
    origin: "bottom",
    distance: "30px",
  });
  sr.reveal(`.testimonial__container`, {
    delay: 100,
    scale: 0.9,
    origin: "bottom",
    distance: "30px",
  });
  sr.reveal(`.contact__info, .contact__title-info`, {
    delay: 100,
    scale: 0.9,
    origin: "left",
    distance: "30px",
  });
  sr.reveal(`.contact__form, .contact__title-form`, {
    delay: 100,
    scale: 0.9,
    origin: "right",
    distance: "30px",
  });
  // fixed footer selector
  sr.reveal(`.footer, .footer__container`, {
    delay: 100,
    scale: 0.9,
    origin: "bottom",
    distance: "30px",
  });

  const srExp = ScrollReveal({
    distance: "40px",
    duration: 1200,
    easing: "ease-out",
    origin: "bottom",
  });
  srExp.reveal(".experience__card", { interval: 150 });
  srExp.reveal(".education__card", { interval: 150 });
}

/* ===================== UPDATED Timeline Progress ===================== */
(function () {
  const timelines = document.querySelectorAll(".timeline");
  if (!timelines.length) return;

  function clamp(v, min = 0, max = 1) {
    return Math.max(min, Math.min(max, v));
  }

  const instances = [...timelines].map((timeline) => {
    const progressEl = document.createElement("div");
    progressEl.className = "timeline-progress";
    progressEl.innerHTML = `
      <div class="track"><div class="fill"></div></div>
      <div class="dot"></div>
    `;
    timeline.appendChild(progressEl);

    const fill = progressEl.querySelector(".fill");
    const dot = progressEl.querySelector(".dot");
    const items = [...timeline.querySelectorAll(".timeline-item")];

    function update() {
      const rect = timeline.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const height = rect.height || 1;
      const viewMid = window.scrollY + window.innerHeight * 0.5;

      const raw = (viewMid - top) / height;
      const pct = clamp(raw) * 100;

      fill.style.height = pct + "%";
      dot.style.top = pct + "%";

      let closest = null;
      let closestDist = Infinity;

      items.forEach((i) => {
        const r = i.getBoundingClientRect();
        const mid = window.scrollY + r.top + r.height / 2;
        const d = Math.abs(mid - viewMid);
        if (d < closestDist) {
          closestDist = d;
          closest = i;
        }
      });

      items.forEach((i) => i.classList.remove("in-view"));

      if (closest) {
        closest.classList.add("in-view");
        dot.classList.add("dot-active");
      } else {
        dot.classList.remove("dot-active");
      }
    }

    return { update };
  });

  function updateAll() {
    instances.forEach((i) => i.update());
  }

  updateAll();
  window.addEventListener("scroll", updateAll);
  window.addEventListener("resize", updateAll);
})();
