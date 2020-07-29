import React, { useContext, useEffect, useState } from "react";
import { DurationContext, TranscriptContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { getNumericalTime } from "../utils/getNumericalTime";
import * as actions from "../store/musicRedux";
import WaveLine from "../content/WaveLine";
import MovingLine from "./MovingLine";
import {WidthConstant} from "../constants/WidthConstant";

const Waveform = () => {
  const { duration, setDuration } = useContext(DurationContext);
  const transcripts = useContext(TranscriptContext);

  /*
      Calculating the static percentages
    */

  const transcriptLength = transcripts.word_timings.length;
  let total = 0
    for(let i =0;i<transcriptLength;i++)
    {
        for(let j=0;j<transcripts.word_timings[i].length;j++)
        {
            total=total+1
        }
    }

    let first = 0
    for(let m=0;m<transcriptLength;m++)
    {
        if(m%2==0)
        {
            for(let n=0;n<transcripts.word_timings[m].length;n++)
            {
                first=first+1
            }
        }
    }

  const firstPercent = Math.round(
      (first/total)*100
  );
  const secondPercent = 100 - firstPercent;
  /*
  Calculating the margin for the first person's static audio waveline
   */
  let memory = 0;
  const getFirstWavelineMargin = (startTime, endTime) => {
    let st;

    st = (getNumericalTime(startTime) * WidthConstant) / duration - memory +1;
    memory = (getNumericalTime(endTime) * WidthConstant) / duration;
    return st + "px";
  };

  /*
  Calculating the margin for the second person's static audio waveline
   */
  let memory2 = 0;
  const getSecondWavelineMargin = (startTime, endTime) => {
    let st;

    st = (getNumericalTime(startTime) * WidthConstant) / duration - memory2+1;
    memory2 = (getNumericalTime(endTime) * WidthConstant) / duration;
    return st + "px";
  };

  return (
    <div className={"ml-3 my-5"} style={{ fontSize: "25px", width: "95%" }}>
      <div style={{ paddingLeft: "145px" }}>
          <span style={{color:"mediumpurple",position:"absolute",top:"170px",left:"45px"}}>{firstPercent} % You</span>
          <span style={{color:"blue",position:"absolute",top:"210px",left:"45px"}}>{secondPercent} % Other</span>
        {transcripts.word_timings.map((transcript, index) => (
          <div key={index}>
            {index % 2 == 0 ? (
              <div
                className={" first-person"}
                style={{ borderBottom: "1px solid #F1F4F6",maxWidth:WidthConstant, display: "flex" }}
              >
                {transcript.map((word,index) => (
                  <div
                    style={{
                      marginLeft: getFirstWavelineMargin(
                        word.startTime,
                        word.endTime
                      ),
                      display: "flex",
                    }}
                    key={index}
                  >
                    <WaveLine
                      startTime={word.startTime}
                      endTime={word.endTime}
                      colour={"mediumpurple"}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={" second-person"} style={{ display: "flex" }}>
                {transcript.map((word,index) => (
                  <div
                    style={{
                      marginLeft: getSecondWavelineMargin(
                        word.startTime,
                        word.endTime
                      ),
                      display: "flex",
                    }}
                    key={index}
                  >
                    <WaveLine
                      startTime={word.startTime}
                      endTime={word.endTime}
                      colour={"blue"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/*
        the block of the moving waveline
         */}
      <MovingLine/>
    </div>
  );
};

export default Waveform;
