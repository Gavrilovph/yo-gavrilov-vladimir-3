const userInput = prompt("Введите положительное число:");
const number = parseInt(userInput);

if (isNaN(number)) {
    alert("Введено не число. Факториал не может быть не числом!"); //добавил эту проверку потому что факториал не может быть не числом
    location.reload(); // ребутит страницу, чтобы заново запустить прогу
} else if (number < 0) {
    alert("Введено отрицательное число. Факториал нельзя вычислять из отрицательного числа!"); //добавил эту проверку потому что факториал нельзя вычислять из отрицательного числа
    location.reload(); // ребутит страницу, чтобы заново запустить прогу
} else {
    function factorial(n) {
        let result = 1;
        let i = 1;

        while (i <= n) {
            result *= i;
            i++;
        }

        return result;
    }

    const factorialOfNumber = factorial(number);
    console.log(`Факториал числа ${number} равен ${factorialOfNumber}`);
}
