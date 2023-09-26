(function () {
  const slider = document.querySelector(".banner__slider");
  const wrapper = slider.querySelector(".banner__slider-wrapper");
  const innerWrapper = wrapper.querySelector(".banner__slider-inner");
  const buttonBack = slider.querySelector(".banner__pagination-btn-back_js");
  const buttonNext = slider.querySelector(".banner__pagination-btn-next_js");
  const slides = [...innerWrapper.querySelectorAll(".banner__slider-slide")];
  const slidesCount = slides.length;

  let siledWidth = wrapper.offsetWidth;
  let activeSlideIndex = 0;

  setActiveSlide(0);
  initWidth();

  window.addEventListener("resize", () => {
    initWidth();
    setActiveSlide(activeSlideIndex);
  })

  buttonBack.addEventListener("click", () => {
    setActiveSlide(activeSlideIndex - 1);
  });

  buttonNext.addEventListener("click", () => {
    setActiveSlide(activeSlideIndex + 1);
  });

  function setActiveSlide(index) {
    if (index < 0 || index >= slidesCount) return; //проверка на кол-во слайдов
    innerWrapper.style.transform = `translateX(${index * siledWidth * -1}px)`;

    buttonBack.removeAttribute("disabled");
    buttonNext.removeAttribute("disabled");

    if (index === 0) {
      buttonBack.setAttribute("disabled", "disabled");
    }

    if (index === slidesCount - 1) {
      buttonNext.setAttribute("disabled", "disabled");
    }

    activeSlideIndex = index;
  }

  function initWidth() {
    siledWidth = wrapper.offsetWidth;

    slides.forEach(slide => {
      slide.style.width = `${siledWidth}px`;
    })
  }

  function createDot(index) {
    const dot = document.createElement("button");
    dot.classList.add("banner__slider-dot");
  }
})();
