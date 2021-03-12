import React, { FunctionComponent, memo } from "react";
import "./contest.scss";

type Props = {
    question: any,
    total: any
}

const Question: FunctionComponent<Props> = ({
    question,
    total
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
                <p className="question-number">Question {total[0]}/{total[1]}</p>
            </div>
            {/* <Counter /> */}
        </div>


    )
}

export default memo(Question);