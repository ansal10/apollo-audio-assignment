import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/musicRedux";
import { TranscriptContext } from "../App";

const SearchTranscript = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searched);
  const [searchValue, setSearchValue] = useState("");
  const searchString = useSelector((state) => state.search);
  const transcripts = useContext(TranscriptContext);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let result1 = 0;
    for (let i = 0; i < transcripts.word_timings.length; i++) {
      for (let j = 0; j < transcripts.word_timings[i].length; j++) {
        if (transcripts.word_timings[i][j].word.includes(searchString)) {
          result1 = result1 + 1;
        }
      }
    }
    setResult(result1);
  }, [searchString]);
  return (
    <div style={{ margin: "0 0 20px 40px", display: "flex" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(actions.searching(searchValue));
        }}
      >
        <input
          placeholder={"Search call typescript"}
          style={{ paddingLeft: "40px",border:"1px solid #D9DDE1",borderRadius:"3px" }}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </form>
      <img
        src={"/img/icon-search.png"}
        style={{ position: "absolute", top: "310px", left: "70px" }}
      />
      {search ? (
        <span style={{ marginLeft: "10px" }}>
          {result} results
          <span
            onClick={() => dispatch(actions.cleared())}
            style={{ marginLeft: "10px", color: "#6BABEC", cursor: "pointer" }}
          >
            {" "}Clear Search
          </span>
        </span>
      ) : null}
    </div>
  );
};

export default SearchTranscript;
