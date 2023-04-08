export class Ai {
    static minimax(isMaximizing, board, depth, alpha, beta) {
        depth++;
        if (board.isGameOver()) {
            return board.isPlayerOneTurn ? -100 + depth : 100 - depth;
        }
        let bestValue = isMaximizing ? -Infinity : +Infinity;
        for (let move of board.possibleMoves()) {
            board.move(move);
            let value = this.minimax(!isMaximizing, board, depth, alpha, beta);
            board.undoMove(move);
            bestValue = isMaximizing ? Math.max(bestValue, value) : Math.min(bestValue, value);
            if (isMaximizing)
                alpha = Math.max(alpha, bestValue);
            else
                beta = Math.min(beta, bestValue);
            if (beta <= alpha)
                break;
        }
        ;
        return bestValue;
    }
    static findBestMove(board) {
        let bestScore = -Infinity;
        let bestMove;
        console.log('---------------');
        for (let move of board.possibleMoves()) {
            board.move(move);
            board[move.x][move.y] = 0;
            let score = Ai.minimax(false, board, 0, -Infinity, +Infinity);
            board.undoMove(move);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            console.log(score, move);
        }
        ;
        return bestMove;
    }
}
