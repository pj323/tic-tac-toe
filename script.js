// Selecting DOM elements and storing them in variables
const vsButtons = document.querySelector('.vs-button');
const twoPlayers = document.getElementById('twoPlayers');
const vsComputer = document.getElementById('vsComputer');
const twoPlayersSection = document.querySelector('.two-players');
const vsComputerSection = document.querySelector('.vs-computer');
const restartButton = document.getElementById('restartButton')

// Function to handle the start of a two-player game
function twoPlayersGame() {
    // Displaying the two-players game section
    twoPlayersSection.style.display = "";
    // Removing the vs-computer game section
    vsComputerSection.remove();
    // Hiding the vs-buttons
    vsButtons.style.display = "none";
    // Displaying the restart button
    restartButton.style.display = "";
}
// Adding a click event listener to the twoPlayers button, calling the twoPlayersGame function
twoPlayers.addEventListener('click', twoPlayersGame);

// Function to handle the start of a vs-computer game
function vsComputerGame() {
    // Displaying the vs-computer game section
    vsComputerSection.style.display = "";
    // Removing the two-players game section
    twoPlayersSection.remove();
    // Hiding the vs-buttons
    vsButtons.style.display = "none";
    // Displaying the restart button
    restartButton.style.display = "";
}
// Adding a click event listener to the vsComputer button, calling the vsComputerGame function
vsComputer.addEventListener('click', vsComputerGame);

// Variables to track the current player, game board, and game state
let currentPlayer = 'X';
let board = [['', '', ''], ['', '', ''], ['', '', '']];
let gameOver = false;

// Function to handle moves in a two-player game
function twoPMakeMove(row, col) {
    // Check if the game is not over and the selected cell is empty
    if (!gameOver && board[row][col] === '') {
        // Update the game board and DOM
        board[row][col] = currentPlayer;
        document.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}`).textContent = currentPlayer;
        
        // Check for a win or tie, switch player if the game is still ongoing
        if (checkWin()) {
            document.getElementById('twoPlayersWinnerText').textContent = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (checkTie()) {
            document.getElementById('twoPlayersWinnerText').textContent = "It's a tie!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to handle moves in a vs-computer game
function vsComMakeMove(row, col) {
    // Check if the game is not over and the selected cell is empty
    if (!gameOver && board[row][col] === '') {
        // Update the game board and DOM
        board[row][col] = currentPlayer;
        document.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}`).textContent = currentPlayer;

        // Check for a win or tie, switch player if the game is still ongoing
        if (checkWin()) {
            document.getElementById('vsComputerWinnerText').textContent = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (checkTie()) {
            document.getElementById('vsComputerWinnerText').textContent = "It's a tie!";
            gameOver = true;
        } else {
            // Switch to the computer's turn and make a move after a delay
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (!gameOver && currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500); 
            }
        }
    }
}

// Function to make a random move for the computer player
function makeComputerMove() {
    if (!gameOver) {
        let row, col;
        // Randomly select an empty cell for the computer's move
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        } while (board[row][col] !== '');
        
        // Make the selected move
        vsComMakeMove(row, col);
    }
}

// Function to check if the current player has won the game
function checkWin() {
    for (let i = 0; i < 3; i++) {
        // Check for a win in rows or columns
        if (
            (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) ||
            (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer)
        ) {
            return true;
        }
    }
    
    // Check for a win in diagonals
    if (
        (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
        (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
    ) {
        return true;
    }
    
    // No win found
    return false;
}

// Function to check if the game is a tie
function checkTie() {
    // Check if there are any empty cells left on the board
    for (let row of board) {
        if (row.includes('')) {
            return false;
        }
    }
    // All cells are filled, indicating a tie
    return true;
}

// Function to restart the game by reloading the page
function restartGame() {
    location.reload();
}
// Adding a click event listener to the restartButton, calling the restartGame function
restartButton.addEventListener('click', restartGame);
