import React, {useState} from 'react';
import './App.scss';
import MusicSec from './component/MusicSec'
import configureStore from "./store/configureStore"
import TranscriptSec from "./component/TranscriptSec";
import Waveform from "./component/Waveform";
import transcript from "./transcript/transcript";
import SearchTranscript from "./component/SearchTranscript";
import {useSelector} from "react-redux";
import SearchedTranscript from "./component/SearchedTranscript";

export const TranscriptContext = React.createContext()
export const DurationContext = React.createContext()

const store = configureStore();
store.subscribe(() => {
    console.log("change");

})

function App() {
    const search = useSelector(state => state.searched)
    const [duration, setDuration] = useState(null)
    return (
        <DurationContext.Provider value={{duration, setDuration}}>
            <TranscriptContext.Provider value={transcript}>
                <div className="App">

                    <MusicSec audioFile={'audio/audio.wav'}/>
                    <Waveform/>
                    <SearchTranscript/>
                    {!search ?
                        <TranscriptSec/> : <SearchedTranscript/>}
                </div>
            </TranscriptContext.Provider></DurationContext.Provider>
    );
}

export default App;
