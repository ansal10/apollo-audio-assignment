import React, {useContext, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {TranscriptContext} from "../App";
import classnames from "classnames";
import {getNumericalTime} from "../utils/getNumericalTime";
import * as actions from "../store/musicRedux";

const SearchedTranscript = () => {
    const searchString = useSelector(state => state.search)
    const transcripts = useContext(TranscriptContext);


    return (
        <div className={"ml-4"}>
            {transcripts.word_timings.map((personPara, index) => (
                <div key={index}>
                    {transcripts.transcript_text[index].includes(searchString) ?
                        <div style={{display: "flex", minHeight: "70px"}}
                             className={classnames("", {"ml-5 ": index % 2 != 0})} key={index}>

            <span
                style={{
                    marginRight: "10px",
                    fontSize: "20px",
                    color: "#656A6A",
                }}
                className={classnames({"first-person": index % 2 == 0}, {"second-person": index % 2 != 0})}
            >
              0:
                {Math.floor(getNumericalTime(personPara[0].startTime)) > 9
                    ? Math.floor(getNumericalTime(personPara[0].startTime))
                    : "0" + Math.floor(getNumericalTime(personPara[0].startTime))}{" "}
            </span>
                            <span
                                style={{borderLeft: "1px solid #B5BDBD", height: "50px"}}
                            ></span>
                            <span style={{fontSize: "18px", marginLeft: "10px"}}
                                  className={classnames("", {"text-muted": index % 2 != 0})}>
              {personPara.map((word, i) => (
                  <span key={i}>
                      <a>
                          {word.word.toLowerCase().includes(searchString.toLowerCase()) ?
                              <span style={{backgroundColor: "orange"}}>
                        {word.word}
                      </span> : <span>
                        {word.word}
                      </span>}{" "}
                      </a>

                </span>
              ))}
            </span>
                        </div> : null}</div>
                // :null}
            ))}
        </div>
    );
};

export default SearchedTranscript;
