document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameOver = false;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || isGameOver) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            isGameOver = true;
        } else if (board.every(cell => cell !== '')) {
            message.textContent = 'It\'s a draw!';
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameOver = false;
        currentPlayer = 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});
