/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Designs Slider (Prev / Next)
 ---------------------------------------- */

(() => {
    const slides = document.querySelectorAll(".designs__slide");
    if (!slides.length) return;

    const prevBtn = document.getElementById("designPrev");
    const nextBtn = document.getElementById("designNext");
    const indexEl = document.getElementById("designIndex");
    const totalEl = document.getElementById("designTotal");

    // If buttons or counter not found, stop (prevents errors)
    if (!prevBtn || !nextBtn || !indexEl || !totalEl) return;

    let current = 0;
    totalEl.textContent = slides.length;

    const showSlide = (i) => {
        slides[current].classList.remove("is-active");
        current = (i + slides.length) % slides.length;
        slides[current].classList.add("is-active");
        indexEl.textContent = String(current + 1);
    };

    prevBtn.addEventListener("click", () => showSlide(current - 1));
    nextBtn.addEventListener("click", () => showSlide(current + 1));

    // Optional: keyboard support (left/right arrows)
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") showSlide(current - 1);
        if (e.key === "ArrowRight") showSlide(current + 1);
    });
})();
