const userInput = prompt("Введите число:");
const number = parseInt(userInput);

if (isNaN(number)) {
    console.log("Введено некорректное число");
} else {
    for (let i = 1; i <= number; i++) {
        if (i % 4 !== 0) {
            console.log(i);
        }
    }
}
