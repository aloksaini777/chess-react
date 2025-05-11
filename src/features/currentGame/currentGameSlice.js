import { createSlice } from "@reduxjs/toolkit";
import { newGame } from "../../utils/chess";

const initialState = {
    isOnline: false,
    selectedPlayer: 'w',
    level: 1,
    fen: newGame(),
    isPlaying: true,
    isWhitePieceTurn: true,
    isBlackPieceTurn: false,
    history: [],
}

const currentGameSlice = createSlice({
    name: 'currentGame',
    initialState,
    reducers: {
        setCurrGameInitialState: (state, action) => { 
            return { ...state, ...action.payload }
        },
        setCurrGameFen: (state, action) => ({ ...state, fen: action.payload }),
        setCurrGameLevel: (state, action) => ({ ...state, level: action.payload }),
        setCurrGameHistory: (state, action) => ({ ...state, history: action.payload }),
        setCurrentPieceTurn: (state, action) => {
            if (action.payload === 'w') {
                return { ...state, isWhitePieceTurn: true, isBlackPieceTurn: false }
            }
            return { ...state, isWhitePieceTurn: false, isBlackPieceTurn: true }
        }
    },
});

export const { 
    setCurrGameInitialState,
    setCurrGameFen,
    setCurrGameLevel,
    setCurrGameHistory,
    setCurrentPieceTurn
} = currentGameSlice.actions;

export default currentGameSlice.reducer;