import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allowAudio: true,
    audioLevel: 1,
    allowMusic: true,
    musicLevel: 1,
    musicInfo: '',
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setAllowAudio: (state, action) => ({ ...state, allowAudio: action.payload }),
        setAudioLevel: (state, action) => ({ ...state, audioLevel: action.payload }),
        setAllowMusic: (state, action) => ({ ...state, allowMusic: action.payload }),
        setMusicLevel: (state, action) => ({ ...state, musicLevel: action.payload }),
        setMusicInfo: (state, action) => ({ ...state, musicInfo: action.payload }),
    }
});

export const {
    setAllowAudio,
    setAudioLevel,
    setAllowMusic,
    setMusicLevel,
    setMusicInfo
} = settingsSlice.actions;
export default settingsSlice.reducer;