import { createSlice } from '@reduxjs/toolkit';
import { newGame } from '../../utils/chess';

const initialState = {
    isOnline: false,
    selectedPlayer: 'w',
    level: 1,
    fen: newGame(),
    isPlaying: true,
    isWhitePieceTurn: true,
    isBlackPieceTurn: false,
    history: [],
};

const newGameSlice = createSlice({ 
    name: 'newGame',
    initialState,
    reducers: {
        setNewGameIsOnline: (state, action) => ({ ...state, isOnline: action.payload }),
        setNewGamePlayer: (state, action) => ({ ...state, selectedPlayer: action.payload }),
        setNewGameLevel: (state, action) => ({ ...state, level: action.payload }),
        setNewGameResetDefault: (state) => {
            state = initialState;
        },
        setNewGameFen: (state, action) => ({ ...state, fen: action.payload }),
        setNewGamePieceTurn: (state, action) => {
            state.isWhitePieceTurn = action.payload == 'w';
            state.isWhitePieceTurn = action.payload != 'w';
        },
        setNewGameIsPlaying: (state, action) => ({ ...state, isPlaying: action.payload }),
        setNewGameHistory: (state, action) => ({ ...state, history: action.payload }),

    }
});

export const {
    setNewGameIsOnline,
    setNewGamePlayer,
    setNewGameLevel,
    setNewGameResetDefault,
    setNewGameFen,
    setNewGamePieceTurn,
    setNewGameIsPlaying,
    setNewGameHistory
} = newGameSlice.actions;

export default newGameSlice.reducer;