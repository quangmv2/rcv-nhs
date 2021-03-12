import React, { FunctionComponent, memo } from "react";

import { Animated } from "react-animated-css";
import './contest.scss';

type Props = {
    time: number
}

const revertTime = (time: number) => {
    if (time < 1) return [0, 0];
    if (time < 10) return [time, 0]
    return [time % 10, (Math.floor(time / 10)) % 10]
}

const Counter: FunctionComponent<Props> = ({
    time
}) => {

    return (
        <div className='timer-container'>
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <span className='number'>{time}</span>
            </Animated>
            <p>SECONDS</p>
        </div>



    )
}

export default memo(Counter);