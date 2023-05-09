// Define the players
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Define the game state
let currentPlayer = PLAYER_X;
let board = ['', '', '', '', '', '', '', '', ''];

// Get the table cells and reset button
const cells = document.querySelectorAll('td');
const resetButton = document.querySelector('#reset');

// Add event listeners to the cells and reset button
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        // Get the cell's index
        const index = parseInt(cell.id);

        // Check if the cell is already occupied
        if (board[index] !== '') {
            return;
        }

        // Update the board and display the current player's symbol
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Check if the game is over
        if (checkWin() || checkDraw()) {
            endGame();
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        }
    });
});

resetButton.addEventListener('click', () => {
    // Reset the game state and clear the board
    currentPlayer = PLAYER_X;
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
});

// Check if the game has been won
function checkWin() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }

    return false;
}

// Check if the game is a draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// End the game and display the winner or draw message
function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', () => { }));
    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
    } else {
        alert('Draw!');
    }
}
