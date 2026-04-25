import { checkWin, getAvailableRow, getComputerMove } from './helper';

describe('Connect-4 Logic Engine', () => {

    let emptyBoard;

    beforeEach(() => {
        emptyBoard = Array(42).fill(0);
    });

    test('detects horizontal win', () => {
        // Place 4 pieces in the bottom row (row 5, indices 35-38)
        let board = [...emptyBoard];
        board[35] = 1; board[36] = 1; board[37] = 1; board[38] = 1;
        expect(checkWin(board)).toBe(true);
    });

    test('detects vertical win', () => {
        // Place 4 pieces in the first column (col 0)
        let board = [...emptyBoard];
        board[35] = 2; board[28] = 2; board[21] = 2; board[14] = 2;
        expect(checkWin(board)).toBe(true);
    });

    test('detects diagonal win (down-right)', () => {
        let board = [...emptyBoard];
        // Indices: 0, 8, 16, 24
        board[0] = 1; board[8] = 1; board[16] = 1; board[24] = 1;
        expect(checkWin(board)).toBe(true);
    });

    test('detects diagonal win (up-right)', () => {
        let board = [...emptyBoard];
        // Indices: 21 (row 3, col 0), 15, 9, 3
        board[21] = 2; board[15] = 2; board[9] = 2; board[3] = 2;
        expect(checkWin(board)).toBe(true);
    });

    test('does not trigger false positive win', () => {
        let board = [...emptyBoard];
        board[35] = 1; board[36] = 1; board[37] = 1; board[38] = 2; // Blocked
        expect(checkWin(board)).toBe(false);
    });

    test('getAvailableRow applies gravity correctly', () => {
        let board = [...emptyBoard];
        
        // Empty column should return bottom row (5)
        expect(getAvailableRow(board, 0)).toBe(5);
        
        // Add one piece
        board[35] = 1; // row 5, col 0
        expect(getAvailableRow(board, 0)).toBe(4);
        
        // Fill column
        board[0] = 1; board[7] = 2; board[14] = 1; board[21] = 2; board[28] = 1;
        expect(getAvailableRow(board, 0)).toBe(-1); // Full
    });

    test('AI blocks immediate player win', () => {
        let board = [...emptyBoard];
        // Player 1 has 3 in a row at bottom (35, 36, 37). Index 38 (col 3, row 5) is open and winning.
        board[35] = 1; board[36] = 1; board[37] = 1;
        
        let aiMove = getComputerMove(board);
        expect(aiMove).toBe(38); // AI must place in col 3, row 5
    });

    test('AI takes immediate win over blocking', () => {
        let board = [...emptyBoard];
        // Player 1 is about to win horizontally (col 3)
        board[35] = 1; board[36] = 1; board[37] = 1;
        
        // AI (Player 2) is about to win vertically (col 6)
        // Bottom 3 rows filled: row 5 (41), row 4 (34), row 3 (27)
        board[41] = 2; board[34] = 2; board[27] = 2;
        
        let aiMove = getComputerMove(board);
        // AI should take its own win (col 6, row 2 -> index 20) instead of blocking (38)
        expect(aiMove).toBe(20);
    });
});
