export const checkWin = (board) => {
    // Check horizontal
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            let i = r * 7 + c;
            if (board[i] !== 0 && board[i] === board[i+1] && board[i] === board[i+2] && board[i] === board[i+3]) {
                return true;
            }
        }
    }
    // Check vertical
    for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
            let i = r * 7 + c;
            if (board[i] !== 0 && board[i] === board[i+7] && board[i] === board[i+14] && board[i] === board[i+21]) {
                return true;
            }
        }
    }
    // Check diagonal (down-right)
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            let i = r * 7 + c;
            if (board[i] !== 0 && board[i] === board[i+8] && board[i] === board[i+16] && board[i] === board[i+24]) {
                return true;
            }
        }
    }
    // Check diagonal (up-right)
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            let i = r * 7 + c;
            if (board[i] !== 0 && board[i] === board[i-6] && board[i] === board[i-12] && board[i] === board[i-18]) {
                return true;
            }
        }
    }
    return false;
}

export const isWinner = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;
    return checkWin(board);
}

export const isDraw = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;
    return !board.includes(0);
}

export const getValidMoves = (board) => {
    let validMoves = [];
    // Top row is indices 0-6
    for (let c = 0; c < 7; c++) {
        if (board[c] === 0) validMoves.push(c); 
    }
    return validMoves;
}

export const getAvailableRow = (board, col) => {
    for (let r = 5; r >= 0; r--) {
        if (board[r * 7 + col] === 0) {
            return r;
        }
    }
    return -1;
}

export const getComputerMove = (gameBoard) => {
    let validCols = getValidMoves(gameBoard);
    if (validCols.length === 0) return -1;

    // 1. Can AI Win? (Player 2)
    for (let col of validCols) {
        let row = getAvailableRow(gameBoard, col);
        let boardCopy = [...gameBoard];
        boardCopy[row * 7 + col] = 2; 
        if (checkWin(boardCopy)) return row * 7 + col;
    }

    // 2. Can Player Win? Block them. (Player 1)
    for (let col of validCols) {
        let row = getAvailableRow(gameBoard, col);
        let boardCopy = [...gameBoard];
        boardCopy[row * 7 + col] = 1; 
        if (checkWin(boardCopy)) return row * 7 + col;
    }

    // 3. Fallback: Random Valid Move
    let rndCol = validCols[Math.floor(Math.random() * validCols.length)];
    let rndRow = getAvailableRow(gameBoard, rndCol);
    return rndRow * 7 + rndCol;
}