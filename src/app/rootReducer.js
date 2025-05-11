import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import settingsReducer from '../features/settings/settingsSlice';
import newGameReducer from '../features/newGame/newGameSlice';
import currGameReducer from "../features/currentGame/currentGameSlice";
import { authApi } from "../features/auth/authApi";

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    newGame: newGameReducer,
    currGame: currGameReducer,
    [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;