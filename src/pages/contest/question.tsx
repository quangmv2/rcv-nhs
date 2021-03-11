import React, { memo } from "react";
import "./contest.scss";
import { Row, Col, } from 'antd';

const Question = (props: { question: string }) => {
    return (
        <div className='container'>
            <div className='question-container'>
                <p>{props.question}</p>
            </div>
            <Row className='answer-container'>
                <Col span={12} className='answer-contain'>
                    <div className='each-answer-container'> <p>{props.question}</p></div>
                    <div className='each-answer-container'>  <p>{props.question}</p></div>

                </Col>
                <Col span={12}>
                    <div className='each-answer-container'>  <p>{props.question}</p></div>
                    <div className='each-answer-container'>  <p>{props.question}</p></div>

                </Col>

            </Row>
        </div>


    )
}

export default memo(Question);