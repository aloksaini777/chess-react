import { Chess } from 'chess.js';
// import * as ChessJS from 'chess.js';
// const Chess = ChessJS.Chess;

export const newGame = () => 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const isNewGame = (fen) => fen === newGame();

export const isBlackTurn = (fen) => new Chess(fen).turn() === 'b';

export const isWhiteTurn = (fen) => new Chess(fen).turn() === 'w';

export const isCheck = (fen) => new Chess(fen).in_check();

export const getGameWinner = (fen) => {
    const game = new Chess(fen);
    if (game.in_checkmate()) {
        // If current turn is white, black won and vice versa
        return game.turn() === 'w' ? 'b' : 'w';
    }
    return null;
};

export const isStalemate = (fen) => {
    const game = new Chess(fen);
    return game.in_stalemate() || game.in_draw();
}

export const isGameOver = (fen) => new Chess(fen).isGameOver();

export const isMoveable = (fen, from) => new Chess(fen).moves({ square: from }).length > 0;

export const move = (fen, from, to) => {
    const game = new Chess(fen);
    const action = game.move({ from, to, promotion: 'q' });
    return action ? [game.fen(), action] : null;
};