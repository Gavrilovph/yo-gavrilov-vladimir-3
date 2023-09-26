let openMessageModalBtn = document.querySelector(".footer__btn");
let messageModal = document.querySelector(".messageHidden");
let closeMessageModalBtn = document.querySelector(".modalMessage__close");

openMessageModalBtn.addEventListener('click', () => {
  messageModal.classList.add("modalMessage");
});

closeMessageModalBtn.addEventListener('click', () => {
  messageModal.classList.remove("modalMessage");
});
