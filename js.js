
const fields = document.querySelectorAll(".field");
const displayMessage = document.querySelector(".display");
const Board = [];
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
fields.forEach(field => { 
    field.addEventListener("click", manageGame, {once: true})
})

function manageGame(e) {
    const cell = e.target;
    const currentClass = placeMark(cell);
    const isFinish = checkWin(currentClass);
    endGame(isFinish, currentClass);
}

function placeMark(cell) {
    if (displayMessage.textContent.indexOf("X") !== -1) {
        cell.textContent = "X";
        cell.classList.add("X");
        Board.push("X");
        displayMessage.textContent = "Player O's turn";
        return "X";
    }
    else if (displayMessage.textContent.indexOf("O") !== -1) {
        cell.textContent = "O";
        cell.classList.add("O");
        Board.push("X");
        displayMessage.textContent = "Player X's turn";
        return "O";
    }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return fields[index].classList.contains(currentClass)})
    })

}

function endGame(isFinish, currentClass) {
    const displayMessageContainer = document.querySelector(".displayMessageContainer");
    const message = document.querySelector(".message");
    const rematchBtn = document.querySelector(".rematch");
    
    if (isFinish) {
        displayMessageContainer.classList.add("show");
        message.textContent = `${currentClass}'s has Won!`
    }
    else if (!isFinish && Board.length == 9) {
        displayMessageContainer.classList.add("show");
        message.textContent = "It's a draw!"
    }

    rematchBtn.addEventListener("click",() => {
        location.reload();
    })
}