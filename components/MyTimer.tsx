"use client"
import React from 'react';
import { useTimer } from 'react-timer-hook';

const MyTimer = ({ expiryTimestamp }) => {

  const date = new Date(expiryTimestamp * 1000);
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  const time = new Date();
   expiryTimestamp = time.setHours(hh, mm, ss);
   console.log(expiryTimestamp)

  const {
    
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') ,autoStart:true});


  return (
    <div >
      <h1>react-timer-hook </h1>
      <p>Timer Demo</p>
      <div >
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button>
    </div>
  );
}


export default MyTimer