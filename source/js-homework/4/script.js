const userInputNumber = parseInt(prompt("Введите число:"));
const userInputExponent = parseInt(prompt("Введите степень:"));

if (isNaN(userInputNumber)) {
    alert("Ошибка! Числовое поле ввода не может содержать буквы.");
    location.reload(); // ребутит страницу, чтобы заново запустить прогу
} else if (isNaN(userInputExponent)) {
    alert("Ошибка! Степень не может содержать буквы.");
    location.reload(); // ребутит страницу, чтобы заново запустить прогу
} else {
    function power(number, exponent) {
        let result = 1;

        for (let i = 0; i < exponent; i++) {
            result *= number;
        }

        return result;
    }
}

const result = power(userInputNumber, userInputExponent);
console.log(`${userInputNumber} в степени ${userInputExponent} равно ${result}`);
