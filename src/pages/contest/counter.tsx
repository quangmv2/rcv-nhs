import React, { FunctionComponent, memo } from "react";
import Countdown from 'react-countdown';
import './contest.scss';

type Props = {
    time: number
}

const revertTime = (time: number) => {
    if (time < 1) return [0, 0];
    if (time < 10) return [time, 0]
    return [time%10, (Math.floor(time/10))%10]
}

const Counter: FunctionComponent<Props> = ({
    time
}) => {
        
    return (
        <>
            <div className="wrap">
                <div className="countdown">
                    <div className="bloc-time sec" data-init-value="0">
                        <span className="count-title">TIME</span>
                        <div className="figure sec sec-1">
                            <span className="top">{revertTime(time)[1]}</span>
                            <span className="top-back">
                                <span>{revertTime(time)[1]}</span>
                            </span>
                            <span className="bottom">{revertTime(time - 1)[1]}</span>
                            <span className="bottom-back">
                                <span>{revertTime(time - 1)[1]}</span>
                            </span>
                        </div>

                        <div className="figure sec sec-2">
                            <span className="top">{revertTime(time)[0]}</span>
                            <span className="top-back">
                                <span>{revertTime(time)[0]}</span>
                            </span>
                            <span className="bottom">{revertTime(time - 1)[0]}</span>
                            <span className="bottom-back">
                                <span>{revertTime(time - 1)[0]}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default memo(Counter);