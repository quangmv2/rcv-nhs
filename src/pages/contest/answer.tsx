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
    border: " 2px solid #2884da"
}

const styleCorrect = {
    border: "2px solid green"
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
const Answer: FunctionComponent<Props> = ({
    answers,
    answering,
    correct,
    setChoose
}) => {
    const renderRank = () => {
        return _.map(Data, ({ index, ans }
        ) => {

            return (
                <Col span={12} className='answer-contain'>
                    <div className='each-answer-container'>
                        <div>
                            <span >{index}</span>
                        </div>
                        <p>ans</p>
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