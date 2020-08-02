import React, {useContext} from "react";
import GenUtil from "../utils/GenUtil";
import {DurationContext} from "../App";
import Constants from "../constants/Constants";
import {useSelector} from "react-redux";

const WaveLine = (props) => {
    const getWidth = (startTime, EndTime) => {
        let s, p;
        s = GenUtil.getNumericalTime(EndTime) - GenUtil.getNumericalTime(startTime);
        p = (s / duration) * Constants.WidthConstant;
        return p + "px";
    };
    const seconds = useSelector((state) => state.seconds);
    const dSeconds = useSelector((state) => state.dSeconds);

    const time = seconds + dSeconds / 1000;
    const {duration, setDuration} = useContext(DurationContext);

    const arr = [1, 2, 3, 4, 5];
    return (
        <div
            className='wave-line-container'
            style={{
                maxWidth: getWidth(props.startTime, props.endTime),
            }}
        >
            {arr.map((a, index) => (
                <span key={index}>
          {time > (GenUtil.getNumericalTime(props.startTime) + (index / 10))
              ? (
                  <div className='gray-bar'
                       key={a}
                  />
              ) : (
                  <div className='gray-bar'
                      style={{
                          borderLeft: `2px solid ${props.colour}`,
                      }}
                      key={a}
                  />
              )}
        </span>
            ))}
        </div>
    );
};

export default WaveLine;
