import React from "react";

export const getNumericalTime = (time)=>{
    return parseFloat(time.slice(0, time.length - 1))
};

export const getFormatDateTime = (minutes, seconds) => {
    return `${minutes}:${seconds>9?seconds:"0"+seconds}`
};

