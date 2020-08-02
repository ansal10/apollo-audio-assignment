import React, {useContext, useState} from "react";
import GenUtil from "../utils/GenUtil";

import {useDispatch, useSelector} from "react-redux";
import * as actions from "../store/musicRedux";
import {TranscriptContext} from "../App";

const TranscriptSec = () => {
    const dispatch = useDispatch();
    const transcripts = useContext(TranscriptContext)

    const seconds = useSelector((state) => state.seconds);
    const dSeconds = useSelector((state) => state.dSeconds);

    const time = seconds + dSeconds / 1000;
    const [share, setShare] = useState(false)
    const set = () => setShare(false)

    //function for changing the current time of audio with clicking of word
    const onAudio = (ti) => {

        const s = Math.floor(GenUtil.getNumericalTime(ti));
        const ds =
            Math.ceil(
                (GenUtil.getNumericalTime(ti) - Math.floor(GenUtil.getNumericalTime(ti))) * 10
            ) * 100;
        dispatch(actions.set({seco: s, dse: ds}));

        setShare(true)
        setTimeout(set, 3000)
    };


    return (
        <div className="ml-4 transcript-container">
            {transcripts.word_timings.map((personPara, index) => (

                <div className={`transcript-inner-container ${index % 2 ? "ml-5" : ""}`} key={index}>
                    <span className={index % 2 ? "second-person" : "first-person"}>
                      0:
                        {Math.floor(GenUtil.getNumericalTime(personPara[0].startTime)) > 9
                            ? Math.floor(GenUtil.getNumericalTime(personPara[0].startTime))
                            : "0" + Math.floor(GenUtil.getNumericalTime(personPara[0].startTime))}{" "}
                    </span>
                    <span className='vertical-line-separator'/>

                    <span className={`word-container ${index % 2 ? "text-muted" : ""}`}>
                      {personPara.map((word, i) => (
                          <span onClick={() => onAudio(word.startTime)} key={i}>
                          {time >= GenUtil.getNumericalTime(word.startTime) &&
                          time < GenUtil.getNumericalTime(word.endTime) ? (
                              <a className={"word"}>
                              <span style={{backgroundColor: "lightblue"}}>
                                {word.word}
                              </span>{" "}
                              </a>
                          ) : (
                              <a className="word">
                                  <span>{word.word}</span>{" "}
                              </a>
                          )}
                        </span>
                      ))}

                        {share ? <div className='share'>share</div> : null}
                    </span>

                </div>
            ))}
        </div>
    );
};

export default TranscriptSec;
