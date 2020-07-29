import React, {useContext, useState} from "react";
import { getNumericalTime } from "../utils/getNumericalTime";
import styles from "./Transcript.css"

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/musicRedux";
import classnames from "classnames"
import {TranscriptContext} from "../App";

const TranscriptSec = () => {
  const dispatch = useDispatch();
  const transcripts = useContext(TranscriptContext)

  const seconds = useSelector((state) => state.seconds);
  const dSeconds = useSelector((state) => state.dSeconds);

  const time = seconds + dSeconds / 1000;
  const [share,setShare] = useState(false)
  const set = ()=>setShare(false)

  //function for changing the current time of audio with clicking of word
  const onAudio = (ti) => {

    const s = Math.floor(getNumericalTime(ti));
    const ds =
      Math.ceil(
        (getNumericalTime(ti) - Math.floor(getNumericalTime(ti))) * 10
      ) * 100;
    dispatch(actions.set({ seco: s, dse: ds }));

    setShare(true)
    setTimeout(set,3000)
  };


  return (
    <div className={"ml-4"}>
      {transcripts.word_timings.map((personPara,index) => (

          <div style={{ display: "flex", minHeight: "70px",
            marginBottom:"20px" }} className={classnames("",{"ml-5 ":index%2!=0})} key={index}>
            <span
              style={{
                marginRight: "10px",
                fontSize: "20px",
                color: "#656A6A",
              }}
            className={classnames({"first-person":index%2==0},{"second-person":index%2!=0})}
            >
              0:
              {Math.floor(getNumericalTime(personPara[0].startTime)) > 9
                ? Math.floor(getNumericalTime(personPara[0].startTime))
                : "0" + Math.floor(getNumericalTime(personPara[0].startTime))}{" "}
            </span>
            <span
              style={{ borderLeft: "1px solid #B5BDBD", height: "70px" }}
            ></span>
            <span style={{ fontSize: "18px", marginLeft: "10px" }} className={classnames("",{"text-muted":index%2!=0})}>
              {personPara.map((word,i) => (
                <span onClick={() => onAudio(word.startTime)} key={i}>
                  {time >= getNumericalTime(word.startTime) &&
                  time < getNumericalTime(word.endTime) ? (
                    <a className={"word"}>
                      <span style={{ backgroundColor: "lightblue" }}>
                        {word.word}
                      </span>{" "}
                    </a>
                  ) : (
                    <a className={"word"}>
                      <span>{word.word}</span>{" "}
                    </a>
                  )}
                </span>
              ))}

              {share?<div style={{color:"blue"}}>share</div>:null}
            </span>

          </div>
      ))}
    </div>
  );
};

export default TranscriptSec;
