let rand = Math.floor(1 + Math.random() * 10);

while (true) {
    const userInput = parseInt(prompt("Угадайте число от 1 до 10:"));

    if (userInput === rand) {
        alert ("Поздравляем, вы угадали число!");
        break;
    } else {
        alert ("Неправильно, попробуйте еще раз.");
    }
}
