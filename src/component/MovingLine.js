import React, {useContext, useEffect, useState} from 'react';
import * as actions from "../store/musicRedux";
import {DurationContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {WidthConstant} from "../constants/WidthConstant";

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
        const waveTime = e.nativeEvent.offsetX / WidthConstant;
        const audioTime = waveTime * duration;
        const second = Math.floor(audioTime);
        const dSecond = Math.round((audioTime - Math.floor(audioTime)) * 10) * 100;
        dispatch(actions.set({seco: second, dse: dSecond}));
    };
    return (
        <div
            style={{
                borderRight: "1px solid #B5BDBD",
                opacity: "40%",
                borderLeft: "1px solid #B5BDBD",
                height: "80px",
                width: WidthConstant,
                position: "absolute",
                top: "172px",
                left: "170px",
                cursor: "pointer"
            }}
            onClick={getWaveTime}
        >
            <div
                style={{
                    borderRight: "2px solid cornflowerblue",
                    width: percent,
                    height: "80px",
                    backgroundColor: "#96D3FD",
                    opacity: "40%",
                }}
            ></div>
        </div>
    );
};

export default MovingLine;
