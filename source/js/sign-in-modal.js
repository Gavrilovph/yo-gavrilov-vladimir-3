let openSignInModalBtn = document.querySelector(".header__signIn-js");
let signInModal = document.querySelector(".signInHidden");
let closesignInModalBtn = document.querySelector(".signInModal__close");

openSignInModalBtn.addEventListener('click', () => {
  signInModal.classList.add("signInModal");
});

closesignInModalBtn.addEventListener('click', () => {
  signInModal.classList.remove("signInModal");
});


//Snowflakes in input
const inputElement4 = document.getElementById("signInPassword");
const snowflakeOutput4 = document.querySelector(".signInModal__snowflake-output");

inputElement4.addEventListener('input', function() {
    const inputValue4 = inputElement4.value;

    snowflakeOutput4.textContent = '*'.repeat(inputValue4.length);
});
