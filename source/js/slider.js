(function () {
  const slider = document.querySelector(".banner__slider");
  const wrapper = slider.querySelector(".banner__slider-wrapper");
  const innerWrapper = wrapper.querySelector(".banner__slider-inner");
  const buttonBack = slider.querySelector(".banner__pagination-btn-back_js");
  const buttonNext = slider.querySelector(".banner__pagination-btn-next_js");
  const pagination = slider.querySelector(".banner__slider-pagination_js");
  const slides = [...innerWrapper.querySelectorAll(".banner__slider-slide")];
  const slidesCount = slides.length;
  const dots = [];
  const animationDuration = 500;

  let timer = null;
  let siledWidth = wrapper.offsetWidth;
  let activeSlideIndex = 0;

  initWidth();
  createDots();
  setActiveSlide(0);

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

  function setActiveSlide(index, withAnimation = true) {
    if (index < 0 || index >= slidesCount) return; //проверка на кол-во слайдов
    innerWrapper.style.transform = `translateX(${index * siledWidth * -1}px)`;

    buttonBack.removeAttribute("disabled");
    buttonNext.removeAttribute("disabled");

    if (withAnimation) {
      clearTimeout(timer);
      innerWrapper.style.transition = `transform ${animationDuration}ms`;
      timer = setTimeout(() => {
        innerWrapper.style.transition = "";
      }, animationDuration);
    }

    if (index === 0) {
      buttonBack.setAttribute("disabled", "disabled");
    }

    if (index === slidesCount - 1) {
      buttonNext.setAttribute("disabled", "disabled");
    }

    dots[activeSlideIndex].classList.remove("banner__slider-dot_active");
    dots[index].classList.add("banner__slider-dot_active");
    activeSlideIndex = index;
  }

  function initWidth() {
    siledWidth = wrapper.offsetWidth;

    slides.forEach(slide => {
      slide.style.width = `${siledWidth}px`;
    })
  }

  function createDots() {
    for (let i = 0; i < slidesCount; i++) {
      const dot = createDot(i);
      dots.push(dot);
      pagination.insertAdjacentElement("beforeend", dot);
    }
  }

  function createDot(index) {
    const dot = document.createElement("button");
    dot.classList.add("banner__slider-dot");

    if (index === activeSlideIndex) {
      dot.classList.add("banner__slider-dot_active");
    }

    dot.addEventListener("click", () => {
      setActiveSlide(index);
    })
    return dot;
  }
})();
