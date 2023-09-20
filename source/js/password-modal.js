// Password modal
let openPasswordModalBtn = document.querySelector(".profile__btn1");
let passwordModal = document.querySelector(".passwordHidden");
let closeModalBtn = document.querySelector(".modal__close");

openPasswordModalBtn.addEventListener('click', () => {
  passwordModal.classList.add("modal");
});

closeModalBtn.addEventListener('click', () => {
  passwordModal.classList.remove("modal");
});


//Snowflakes in input
const inputElement1 = document.getElementById('oldPassword');
const snowflakeOutput1 = document.querySelector('.modal__snowflake-output1');

inputElement1.addEventListener('input', function() {
    const inputValue1 = inputElement1.value;

    snowflakeOutput1.textContent = '*'.repeat(inputValue1.length);
});

const inputElement2 = document.getElementById('newPassword');
const snowflakeOutput2 = document.querySelector('.modal__snowflake-output2');

inputElement2.addEventListener('input', function() {
    const inputValue2 = inputElement2.value;

    snowflakeOutput2.textContent = '*'.repeat(inputValue2.length);
});

const inputElement3 = document.getElementById('repeatNewPassword');
const snowflakeOutput3 = document.querySelector('.modal__snowflake-output3');

inputElement3.addEventListener('input', function() {
    const inputValue3 = inputElement3.value;

    snowflakeOutput3.textContent = '*'.repeat(inputValue3.length);
});
