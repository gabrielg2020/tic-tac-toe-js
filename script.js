let player = "X"; // player X starts the game
// the result <p> element
const result = document.getElementById("result-text");
let gameActive = true; // boolean to check if the game is still active

// function to click on a cell
function clickCell(cell) {
    if (!gameActive) {
        return;
    }

    move = cell.id // get the id of the cell
    // if the move is valid make the move
    if (isValidMove(board, move)) {
        makeMove(board, move, player);
        cell.innerHTML = player;
        if (isGameOver(board)) {
            gameActive = false;
            return;
        }
        swapPlayer();
    } 
}

// function to reset the game
function resetGame() {
    board = createBoard(); // create a new board
    player = "X"; // player X starts the game
    // reset the board on the screen
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "_";
    }
    result.textContent = "Play!";
    gameActive = true;
}

// function to check if the game is over
function isGameOver(board) {
    console.log("checking if the game is over..."); // for debugging purposes
    // check if there is a winner
    if (checkWinner(board)) {
        console.log("Game over! Player " + player + " won!");
        result.textContent = "Game over! Player " + player + " won!";
        return true;
    }
    // check if there is a draw
    if (checkDraw(board)) {
        result.textContent = "Game over! It's a draw!";
        return true;
    }
    return false;
}

// function to check if there is a winner
function checkWinner(board) {
    // check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== undefined) {  
            return true;
        }
    }
    // check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== undefined) {
            return true;
        }
    }
    // check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== undefined) {
        return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== undefined) {
        return true;
    }
    return false;
}

// function to check if there is a draw
function checkDraw(board) {
    // check if there is an empty cell
    for (let i = 0; i < 3; i++) {
        if (board[i].includes(undefined)) {
            return false;
        }
    }
    return true;
}

// function to make a move on the board
function makeMove(board, move, player) {
    board[move[0]][move[1]] = player;
}

// function to check if the move is valid
function isValidMove(board, move) {
    let row = move[0];
    let col = move[1];
    if (board[row][col] === undefined) {
        return true;
    }
    return false;
}

// function to swap the player
function swapPlayer() {
    if (player === "X") {
        player = "O";
    } else {
        player = "X";
    }
}

// function to create a empty board
function createBoard() {
    let newBoard = [];
    for (let i = 0; i < 3; i++) {
        newBoard.push([]);
        for (let j = 0; j < 3; j++) {
            newBoard[i].push(undefined);
        }
    }
    return newBoard;
}

//  function that assigns all correct DOM elements with the correct functions
function assignFunctions() {
    // get all the cells
    let cells = document.getElementsByClassName("cell");
    // assign the clickCell function to all cells
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function() {
            clickCell(cells[i]);
        });
    }

    // get the reset button
    let resetButton = document.getElementById("reset-button");
    // assign the resetGame function to the reset button
    resetButton.addEventListener("click", resetGame);
}

let board = createBoard();
assignFunctions();