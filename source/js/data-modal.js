let openDataModalBtn = document.querySelector(".profile__btn2");
let dataModal = document.querySelector(".dataHidden");
let closeDataModalBtn = document.querySelector(".modalData__close");

openDataModalBtn.addEventListener('click', () => {
  dataModal.classList.add("modalData");
});

closeDataModalBtn.addEventListener('click', () => {
  dataModal.classList.remove("modalData");
});
