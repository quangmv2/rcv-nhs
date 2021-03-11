import React, { FunctionComponent, memo } from "react";
import "./contest.scss";

type Props = {
    question: any
}

const Question: FunctionComponent<Props> = ({
    question
}) => {
    return (

        <div className='question-container'>
            <div className='question-content'>
                <p
                    style={{
                        color: "#FFF",
                        // textAlign: "center",
                        marginLeft: "20px"
                    }}
                >{ question ? question.question : "Waitting..." }</p>
                <p className="question-number">Question 1/10</p>
            </div>
            {/* <Counter /> */}
        </div>


    )
}

export default memo(Question);