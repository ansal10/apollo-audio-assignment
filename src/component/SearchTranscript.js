import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../store/musicRedux";
import {TranscriptContext} from "../App";

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
                if (transcripts.word_timings[i][j].word.toLowerCase().includes(searchString.toLowerCase())) {
                    result1 = result1 + 1;
                }
            }
        }
        setResult(result1);
    }, [searchString]);
    return (
        <div className='search-transcript'>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(actions.searching(searchValue.toLowerCase()));
                }}
            >
                <input
                    className='search-input'
                    placeholder={"Search call typescript"}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
            </form>
            <img
                className='search-icon'
                src={"/img/icon-search.png"}
            />
            {search ? (
                <span className='result-span'>
          {result} results
          <span
              onClick={() => dispatch(actions.cleared())}
              className='clear-search'
          >
            {" "}Clear Search
          </span>
        </span>
            ) : null}
        </div>
    );
};

export default SearchTranscript;
