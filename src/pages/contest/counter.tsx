import React, { memo } from "react";
import Countdown from 'react-countdown';
import './contest.scss';

const Counter = () => {
    return (
        <>
            <div className="wrap">
                <div className="countdown">
                    <div className="bloc-time sec" data-init-value="0">
                        <span className="count-title">TIME</span>

                        <div className="figure sec sec-1">
                            <span className="top">0</span>
                            <span className="top-back">
                                <span>0</span>
                            </span>
                            <span className="bottom">0</span>
                            <span className="bottom-back">
                                <span>0</span>
                            </span>
                        </div>

                        <div className="figure sec sec-2">
                            <span className="top">0</span>
                            <span className="top-back">
                                <span>0</span>
                            </span>
                            <span className="bottom">0</span>
                            <span className="bottom-back">
                                <span>0</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default memo(Counter);