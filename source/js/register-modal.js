let openRegisterModalBtn = document.querySelector(".header__register-js");
let registerModal = document.querySelector(".registerHidden");
let closeRegisterModalBtn = document.querySelector(".registerModal__close");

openRegisterModalBtn.addEventListener('click', () => {
  registerModal.classList.add("registerModal");
});

closeRegisterModalBtn.addEventListener('click', () => {
  registerModal.classList.remove("registerModal");
});
