import React, {useEffect, useState, useRef, useCallback, useContext} from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as actions from "../store/musicRedux";
import { useDispatch, useSelector } from "react-redux";
import {DurationContext} from "../App";
import {getFormatDateTime} from "../utils/getNumericalTime";

const MusicSec=({audioFile}) =>{
    const {duration,setDuration} = useContext(DurationContext)
    const dispatch = useDispatch();
    const timer = useSelector((state) => state.timerId);
    const seconds = useSelector((state) => state.seconds);
    const dSeconds = useSelector((state) => state.dSeconds);
    const minutes = useSelector((state) => state.minutes);
    const time = seconds + dSeconds / 1000;
    const audioRef = useRef(null);  // reference to react audio player

    //Hook for changing the current time of audio
    useEffect(() => {
    audioRef.current.audio.current.currentTime = time;
  }, [time]);


    const durationMinute = Math.floor(duration/60);
    const durationSecond = duration%60

    //Hook for changing the UI of react audio player library

    useEffect(()=>{

        let container =  audioRef.current.container.current
        let audio = audioRef.current.audio.current
        let button = audioRef.current.container.current.childNodes[1].childNodes[1].childNodes[1]
        container.childNodes[1].childNodes[0].style.display= "none"
        container.childNodes[1].childNodes[1].childNodes[0].style.display= "none"
        container.childNodes[1].childNodes[1].childNodes[2].style.display= "none"
        container.style.outline = "none"
        audio.preload = "metadata"
        audio.onloadedmetadata = ()=>{
            setDuration(Math.round(audio.duration))
        }
        button.removeChild(button.childNodes[0])
        button.removeChild(button.childNodes[1])

        /*
        forward button
         */
        let forwardButton = document.createElement("div")
        let forwardButtonImg = document.createElement("img");
        forwardButtonImg.src = "/img/rotate-right.svg"
        forwardButtonImg.style.width = "20px"
        forwardButton.addEventListener("mouseover",function (event) {
            event.target.style.cursor = "pointer"
        })
        forwardButton.appendChild(forwardButtonImg)
        button.appendChild(forwardButton)
        forwardButton.onclick = ()=>dispatch(actions.forwarded())

        /*
        rewind button
         */
        let rewindButton = document.createElement("div")
        let rewindButtonImg = document.createElement("img");
        rewindButtonImg.src = "/img/rotate-left.svg"
        rewindButtonImg.style.width = "20px"
        rewindButton.addEventListener("mouseover",function (event) {
            event.target.style.cursor = "pointer"
        })
        rewindButton.appendChild(rewindButtonImg)
        button.insertBefore(rewindButton,button.childNodes[0])
        rewindButton.onclick = ()=>dispatch(actions.rewinded())


        /*
        speed button
         */
        let speedButton = document.createElement("select");
        speedButton.classList.add("downArrow")
        const o4 = document.createElement("option")
        o4.value = "0.5";
        o4.innerText="0.50x"
        const o = document.createElement("option")
        o.value = "1";
        o.innerText="1.00x"
        const o1 = document.createElement("option")
        o1.value ="0.75";
        o1.innerText="0.75x"
        const o2 = document.createElement("option")
        o2.value = "1.5"
        o2.innerText="1.50x"
        const o3 = document.createElement("option")
        o3.value = "2.0"
        o3.innerText="2.00x"
        speedButton.appendChild(o)
        speedButton.appendChild(o4)
        speedButton.appendChild(o1)
        speedButton.appendChild(o2)
        speedButton.appendChild(o3)
        speedButton.oninput = (e)=>dispatch(actions.speeding(e.target.value))
        speedButton.addEventListener("mouseover",function (e) {
            e.target.style.cursor="pointer"
        })
        button.appendChild(speedButton)


        /*
        share button
         */
        let shareButton = document.createElement("img");
        shareButton.src="/img/share.png"
        shareButton.addEventListener("mouseover",function (e) {
            e.target.style.cursor ="pointer"
        })
        button.parentElement.appendChild(shareButton)


        button.childNodes[1].childNodes[0].style.color = "#2792F7"
        button.childNodes[1].style.outline = "none"
        // container.style.backgroundColor="#F1F3F4"



  },[])

    // End of Hook


    return (
      <div className='audio-player-container'>
        <AudioPlayer
          src={audioFile}
          onPlay={() => {
            const timerId = setInterval(() => dispatch(actions.timer()), 100);
            dispatch(actions.played());
            dispatch(actions.timerId(timerId));
          }}
          onPause={() => {
            clearInterval(timer);
            dispatch(actions.paused());
          }}
          onEnded={() => {
            clearInterval(timer);
            dispatch(actions.ended());
          }}


          onListen={(e) => {
              dispatch(
                  actions.listened({
                      sec: Math.floor(e.target.currentTime),
                      dSec: e.target.currentTime - Math.floor(e.target.currentTime),
                  })
              )
          }}
          ref={audioRef}
          style={{marginBottom:"20px"}}
        />
        <span className='time-span'>{getFormatDateTime(minutes, seconds)} / {getFormatDateTime(durationMinute, durationSecond)}</span>
      </div>


  );
}

export default MusicSec;
