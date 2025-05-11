import Chessboard from 'chessboardjsx';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrGameFen, setCurrGameHistory, setCurrGameInitialState } from '../../features/currentGame/currentGameSlice';
import { getGameWinner, isBlackTurn, isGameOver, isMoveable, isWhiteTurn, move as makeMove, newGame as newGameFen } from '../../utils/chess';
import { difficultyLevels } from '../../bots/bots';


const GamePage = () => {
    const dispatch = useDispatch();
    const newGame = useSelector((state) => state.newGame);
    const currGame = useSelector((state) => state.currGame);

    // To Initiate the Game in currGame State..
    // useEffect(() => {
    //     if(!currGame.isPlaying) {
    //         dispatch(setCurrGameInitialState(newGame));
    //     }
    // }, [newGame, currGame.isPlaying]);

    useEffect(() => {
        console.log('currGame: ', currGame);
    }, [currGame])

    useEffect(() => {
        const data = {
            isPlaying: true,
            fen: newGameFen(),
            history: [],
            isWhitePieceTurn: true,
            isBlackPieceTurn: false,
        }

        dispatch(setCurrGameInitialState(data));
    }, []);

    

    const onGameCompleted = (winner) => {
        global.alert(
          `${winner === 'b' ? 'Black' : winner === 'w' ? 'White' : 'No one'} is the winner!`
        );
    }

    const handleCurrGameFinalState = () => {
        const data = {
            isPlaying: false,
            fen: newGameFen(),
            history: [],
            isWhitePieceTurn: true,
            isBlackPieceTurn: false,
        }
        dispatch(setCurrGameInitialState(data));
    }

    const doMove = useCallback((fen, from, to) => {
        console.log('fen: ', fen);
        const move = makeMove(fen, from, to);

        if (!move) {
            return;
        }

        const [newFen, action] = move;

        if (isGameOver(newFen)) {
            onGameCompleted(getGameWinner(newFen));
            handleCurrGameFinalState();
            return;
        }

        console.log('newFen', newFen);
        dispatch(setCurrGameFen(newFen));
        const history = [...currGame.history, action];
        dispatch(setCurrGameHistory(history));
    }, [onGameCompleted]);

    const onDragStart = ({ sourceSquare }) => {
        console.log('sourceSquare: ', sourceSquare )
        const from = sourceSquare;
        const fen = currGame.fen;
        const isWhiteBotTurn = isWhiteTurn(fen) && currGame.selectedPlayer == 'w';
        const isBlackBotTurn = isBlackTurn(fen) && currGame.selectedPlayer == 'b';
        const isPlaying = currGame.isPlaying;

        console.log('isPlaying: ', isPlaying);
        console.log('isMoveable: ', isMoveable(fen, from));
        console.log('isWhiteBotTurn: ', isWhiteBotTurn);
        console.log('isBlackBotTurn: ', isBlackBotTurn);


        return isPlaying && isMoveable(fen, from) && (isWhiteBotTurn || isBlackBotTurn);
    };

    const onMovePiece = ({ sourceSquare: from, targetSquare: to }) => {
        console.log('from: ', from, " ", 'to: ', to);
        doMove(currGame.fen, from, to);
    };

    useEffect(() => {
        if (!currGame.isPlaying) {
            return;
        }
    
        let isBotMovePlayable = true;
        console.log('chala');
        const diffLevelArr = Object.entries(difficultyLevels).map(([key]) => key);
        const diffName = diffLevelArr[currGame.level];
        if(currGame.selectedPlayer == 'w' && isBlackTurn(currGame.fen)) {
            console.log('diffName: ', diffName);
            console.log('difficulty: ', difficultyLevels[diffName])
            const blackBot = {
                name: diffName,
                move: difficultyLevels[diffName].level()
            }

            blackBot.move(currGame.fen).then(({ from, to }) => {
                if (isBotMovePlayable) doMove(currGame.fen, from, to);
            });
        }
        if(currGame.selectedPlayer == 'b' && isWhiteTurn(currGame.fen)) {
            const whiteBot = {
                name: diffName,
                move: difficultyLevels[diffName].level
            }

            whiteBot.move(currGame.fen).then(({ from, to }) => {
                if (isBotMovePlayable) doMove(currGame.fen, from, to);
            });
        }

        // if (whiteBot && isWhiteTurn(currGame.fen)) {
        //     whiteBot.move(fen).then(({ from, to }) => {
        //         if (isBotMovePlayable) doMove(fen, from, to);
        //     });
        // }
    
        // if (blackBot && isBlackTurn(fen)) {
        //     blackBot.move(fen).then(({ from, to }) => {
        //         if (isBotMovePlayable) doMove(fen, from, to);
        //     });
        // }
        console.log('yaha');
    
        return () => {
            isBotMovePlayable = false;
        };
    }, [currGame.isPlaying, currGame.fen, currGame.selectedPlayer, doMove]);

    return (
        <div className='game-page'>
            <Chessboard 
                position={currGame.fen} 
                allowDrag={onDragStart} 
                onDrop={onMovePiece}
            />
        </div>
    )
}

export default GamePage;