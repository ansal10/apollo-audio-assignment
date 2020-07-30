import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import {TranscriptContext} from "../App";
import classnames from "classnames";
import GenUtil from "../utils/GenUtil";

const SearchedTranscript = () => {
    const searchString = useSelector(state => state.search)
    const transcripts = useContext(TranscriptContext);

    return (
        <div className={"search-transcript ml-4"}>
            {transcripts.word_timings.map((personPara, index) => (
                <div key={index}>
                    {transcripts.transcript_text[index].includes(searchString) ?
                        <div style={{display: "flex", minHeight: "70px"}}
                             className={classnames("", {"ml-5 ": index % 2 !== 0})} key={index}>

                            <span className={index % 2 ? "second-person" : "first-person"}>
                                {GenUtil.getFormatDateTime(0, GenUtil.getNumericalTime(personPara[0].startTime))}
                            </span>
                            <span className='gray-box'/>
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
