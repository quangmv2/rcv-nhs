import React, { memo } from "react";
import "./contest.scss";


const Question = (props: { question: string }) => {
    return (

        <div className='question-container'>
            <div className="question">
                <h3 className="question-number">
                    Question 1/10
                 </h3>
                <div className='question-content'>
                    
                    <span>QUESTION</span></div>
            </div>
        </div>


    )
}

export default memo(Question);