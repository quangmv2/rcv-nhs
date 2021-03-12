import React, { memo } from "react";
import Question from "./question";
import { Table, Row, Col, } from 'antd';
import './contest.scss';
import Answer from "./answer";
import Counter from "./counter";
import { RightCircleOutlined } from '@ant-design/icons';

const Home = () => {
    return (
        <Row>
            <Col span={20}> <div className='container'>
                <div className='counter-container'>
                <Counter />
            </div>
                <Question question='hello' />
                <Answer />
            </div>  </Col>
            <Col span={4} className='counter'>
            <RightCircleOutlined />
                <span>Nga</span>
                </Col>

        </Row>

    )
}

export default memo(Home);