import React, { memo } from "react";

import {Animated} from "react-animated-css";
import './contest.scss';

const Counter = () => {
    return (
        <div className='timer-container'>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        
           <span className='number'>10</span>
           
      
    </Animated>
    <p>SECONDS</p>
    </div>



    )
}

export default memo(Counter);