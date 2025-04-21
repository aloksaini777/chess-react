import React, { useCallback, useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { getGameWinner, isBlackTurn, isGameOver, isMoveable, isWhiteTurn, move as makeMove, newGame as newGameFen } from '../utils/chess';
import bots from '../bots/bots';


const ChessTest = () => {
    const [isPlaying, setPlaying] = useState(true);
    const [fen, setFen] = useState(newGameFen);
    const [whiteBot, setWhiteBot] = useState(null);
    const [blackBot, setBlackBot] = useState({ name: 'nmrugg/stockfish (l:1,d:10)', move: bots['nmrugg/stockfish (l:1,d:10)']() });
    const [history, setHistory] = useState([]);


    const newGame = () => {
        setPlaying(false);
        setFen(newGameFen);
        setHistory([]);
    };

    const onGameCompleted = (winner) => {
        global.alert(
          `${winner === 'b' ? 'Black' : winner === 'w' ? 'White' : 'No one'} is the winner!`
        );
    }

    const doMove = useCallback((fen, from, to) => {
        const move = makeMove(fen, from, to);

        if (!move) {
            return;
        }

        const [newFen, action] = move;

        if (isGameOver(newFen)) {
            onGameCompleted(getGameWinner(newFen));
            newGame();
            return;
        }

        console.log('newFen', newFen);
        setFen(newFen);
        setHistory(history => [...history, action]);
    }, [onGameCompleted]);


    const onDragStart = ({ sourceSquare }) => {
        const from = sourceSquare;
        const isWhiteBotTurn = whiteBot && isWhiteTurn(fen);
        const isBlackBotTurn = blackBot && isBlackTurn(fen);

        return isPlaying && isMoveable(fen, from) && !(isWhiteBotTurn || isBlackBotTurn);
    };

    const onMovePiece = ({ sourceSquare: from, targetSquare: to }) => {
        console.log('onMovePiece', from, to);
        console.log('fen', fen);
        doMove(fen, from, to);
    };

    useEffect(() => {
        if (!isPlaying) {
            return;
        }
    
        let isBotMovePlayable = true;
    
        if (whiteBot && isWhiteTurn(fen)) {
            whiteBot.move(fen).then(({ from, to }) => {
                if (isBotMovePlayable) doMove(fen, from, to);
            });
        }
    
        if (blackBot && isBlackTurn(fen)) {
            blackBot.move(fen).then(({ from, to }) => {
                if (isBotMovePlayable) doMove(fen, from, to);
            });
        }
    
        return () => {
            isBotMovePlayable = false;
        };
    }, [isPlaying, fen, whiteBot, blackBot, doMove]);

    return(
        <div>
            <h1>Chess</h1>
            <Chessboard position={fen} allowDrag={onDragStart} onDrop={onMovePiece} />
        </div>

    )
}

export default ChessTest;