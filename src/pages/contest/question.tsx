import React, { memo } from "react";
import "./contest.scss";


const Question = (props: { question: string }) => {
    return (

        <div className='question-container'>
            <div className='question-content'>
                <p>{props.question}</p>
                <p className="question-number">Question 1/10</p>
            </div>
            {/* <Counter /> */}
        </div>


    )
}

export default memo(Question);