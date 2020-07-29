import React, { useContext } from "react";
import { getNumericalTime } from "../utils/getNumericalTime";
import { DurationContext } from "../App";
import { WidthConstant } from "../constants/WidthConstant";
import { useSelector } from "react-redux";

const WaveLine = (props) => {
  const getWidth = (startTime, EndTime) => {
    let s, p;
    s = getNumericalTime(EndTime) - getNumericalTime(startTime);
    p = (s / duration) * WidthConstant;
    return p + "px";
  };
  const seconds = useSelector((state) => state.seconds);
  const dSeconds = useSelector((state) => state.dSeconds);

  const time = seconds + dSeconds / 1000;
  const { duration, setDuration } = useContext(DurationContext);

  const arr = [1, 2, 3, 4,5];
  return (
    <div
      style={{
        maxWidth: getWidth(props.startTime, props.endTime),
        display: "flex",
        overflow: "hidden",
      }}
    >
      {arr.map((a, index) => (
        <span key={index}>
          {time > (getNumericalTime(props.startTime)+(index/10))
              ? (
                  <div
                      style={{
                          borderLeft: `2px solid #B5BDBD`,
                          paddingBottom: "4px",
                          paddingTop: "6px",
                          minHeight: "40px",
                          marginRight: "2px",
                      }}
                      key={a}
                  ></div>
              ) : (
            <div
              style={{
              borderLeft: `2px solid ${props.colour}`,
              paddingBottom: "4px",
              paddingTop: "6px",
              minHeight: "40px",
              marginRight: "2px",
          }}
              key={a}
              ></div>
          )}
        </span>
      ))}
    </div>
  );
};

export default WaveLine;
