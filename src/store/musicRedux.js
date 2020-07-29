import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "music",
    initialState: {
        play: false,
        seconds: 0,
        second: 0,
        dSeconds: 0,
        minutes: 0,
        timerId: 0,
        speed: 100,
        searched: false,
        search: ''
    },
    reducers: {
        played: (state, action) => {
            state.play = true
        },
        paused: (state, action) => {
            state.play = false
        },
        timer: (state, action) => {
            if (state.dSeconds >= 999) {

                state.seconds = state.seconds + 1;
                state.second = state.second + 1
                state.dSeconds = 0
            }
            if (state.second > 59) {
                state.minutes = state.minutes + 1
                state.second = 0
            }
            state.dSeconds = state.dSeconds + state.speed
        },
        timerId: (state, action) => {
            state.timerId = action.payload
        },
        ended: (state, action) => {
            state.seconds = 0;
            state.dSeconds = 0;
        },
        listened: (state, action) => {
            if (state.seconds != action.payload.sec && state.dSeconds != action.payload.dSec) {
                state.seconds = action.payload.sec
                state.dSeconds = Math.floor(action.payload.dSec * 1000)
            }
        },
        set: (state, action) => {

            state.seconds = action.payload.seco;
            state.dSeconds = action.payload.dse
        },
        forwarded: (state, action) => {
            state.seconds = state.seconds + 10
        },
        rewinded: (state, action) => {
            state.seconds = state.seconds - 10
            if (state.seconds < 0) {
                state.seconds = 0
            }
        },
        speeding: (state, action) => {

            state.speed = 100 * parseFloat(action.payload)
        },
        searching: (state, action) => {
            state.searched = true
            // state.result = 0
            state.search = action.payload
        },
        cleared: (state, action) => {
            state.search = ''
            // state.result = 0
            state.searched = false
        }
    }
})
export const {played, paused, timerId, timer, ended, listened, set, forwarded, rewinded, speeding, searching, cleared} = slice.actions;
export default slice.reducer;
