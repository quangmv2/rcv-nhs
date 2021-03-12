import React, { FunctionComponent, memo } from "react";
import "./contest.scss";
import { Row, Col } from 'antd';
import Data from "./answer-data";
import _ from "lodash";

type Props = {
    answers?: any[]
    answering?: number | null,
    correct?: number | null,
    setChoose: Function
}

const styleChoose = {
    border: " 2px solid #2884da",
    backgroundColor: "yellow"
}

const styleCorrect = {
    border: "2px solid green",
    backgroundColor: "green"
}

// const Answer: FunctionComponent<Props> = ({
//     answers,
//     answering,
//     correct,
//     setChoose
// }) => {
// console.log(correct);

// return (
//     <Row className='answer-container'>
//         <Col span={12} className='answer-contain'>
//             <div className='each-answer-container'
//                 style={correct == 1 ? styleCorrect : (answering == 1 ? styleChoose : {})}
//                 onClick={() => setChoose(1)}
//             >
//                 <p>
//                     {answers && answers[0]}
//                 </p>
//             </div>
//             <div className='each-answer-container'
//                 style={correct == 2 ? styleCorrect : (answering == 2 ? styleChoose : {})}
//                 onClick={() => setChoose(2)}
//             >
//                 <p>
//                     {answers && answers[1]}
//                 </p>
//             </div>

//         </Col>
//         <Col span={12}  >
//             <div className='each-answer-container'
//                 style={correct == 3 ? styleCorrect : (answering == 3 ? styleChoose : {})}
//                 onClick={() => setChoose(3)}
//             >
//                 <p>
//                     {answers && answers[2]}
//                 </p>
//             </div>
//             <div className='each-answer-container'
//                 style={correct == 4 ? styleCorrect : (answering == 4 ? styleChoose : {})}
//                 onClick={() => setChoose(4)}
//             >
//                 <p>
//                     {answers && answers[3]}
//                 </p>

const renderIndex = (index: number) => {
    switch (index + 1) {
        case 1:
            return "A"
        case 2:
            return "B"
        case 3:
            return "C"
        default:
            return "D"
    }
}

const Answer: FunctionComponent<Props> = ({
    answers,
    answering,
    correct,
    setChoose
}) => {


    console.log(answers);

    const renderRank = () => {
        if (!answers) return;
        return answers.map((ans, index) => {
            return (
                <Col span={12} className='answer-contain'>
                    <div className='each-answer-container'
                        onClick={() => setChoose(index + 1)}
                        style={correct == index +1 ? styleCorrect : (answering == index + 1 ? styleChoose : {})}
                    >
                        <div>
                            <span >{renderIndex(index)}</span>
                        </div>
                        <p>{ans}</p>
                    </div>
                </Col>

            );
        });
    }
    return (
        <Row className='answer-container'>
            { renderRank()}
        </Row>

    )
}

export default memo(Answer);