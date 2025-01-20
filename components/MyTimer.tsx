"use client"
import React from 'react';
import { useTimer } from 'react-timer-hook';

const MyTimer = ({ expTimestamp  }:{expTimestamp:number}) => {

  const expiryTimestamp = new Date(expTimestamp * 1000);
  

  const {  
    
    seconds,
    minutes,
    hours,
    
   
  } = useTimer({ expiryTimestamp , onExpire: () => console.warn('onExpire called') ,autoStart:true});


  return (
    <div >
    
      

    <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      
  );
}


export default MyTimer