import React from "react";

export default class GenUtil {
    static getNumericalTime = (time)=>{
        return parseFloat(time.slice(0, time.length - 1))
    };

    static getFormatDateTime = (minutes, seconds) => {
        return `${minutes}:${seconds>9?seconds:"0"+seconds}`
    };
}
