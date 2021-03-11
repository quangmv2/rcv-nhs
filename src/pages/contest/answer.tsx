import React, { memo } from "react";
import "./contest.scss";
import { Row, Col } from 'antd';

const Answer = () => {
    return (
        <Row className='answer-container'>
            <Col span={12} className='answer-contain'>
                <div className='each-answer-container'> <p>1</p></div>
                <div className='each-answer-container'>  <p>2</p></div>

            </Col>
            <Col span={12}  >
                <div className='each-answer-container'>  <p>3</p></div>
                <div className='each-answer-container'>  <p>4</p></div>
            </Col>

        </Row>

    )
}

export default memo(Answer);