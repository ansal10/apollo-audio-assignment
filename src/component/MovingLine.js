import React, {useContext, useEffect, useState} from 'react';
import * as actions from "../store/musicRedux";
import {DurationContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import Constants from "../constants/Constants";

const MovingLine = () => {
    const {duration, setDuration} = useContext(DurationContext);
    const dispatch = useDispatch();

    const [percent, setPercent] = useState(0);

    const seconds = useSelector((state) => state.seconds);
    const dSeconds = useSelector((state) => state.dSeconds);

    const time = seconds + dSeconds / 1000;

    useEffect(() => {
        const percent = (time / duration) * 100;
        setPercent(percent + "%");
    }, [time]);


    const getWaveTime = (e) => {
        const waveTime = e.nativeEvent.offsetX / Constants.WidthConstant;
        const audioTime = waveTime * duration;
        const second = Math.floor(audioTime);
        const dSecond = Math.round((audioTime - Math.floor(audioTime)) * 10) * 100;
        dispatch(actions.set({seco: second, dse: dSecond}));
    };
    return (
        <div className='moving-line-container'
             onClick={getWaveTime}
        >
            <div className='moving-line'
                 style={{
                     width: percent,
                 }}
            />
        </div>
    );
};

export default MovingLine;
