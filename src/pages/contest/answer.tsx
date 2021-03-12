import React, { memo } from "react";
import "./contest.scss";
import { Row, Col } from 'antd';
import Data from "./answer-data";
import _ from "lodash";

const Answer = () => {
    const renderRank = () => {
        return _.map(Data, ({ index, ans}
            ) => {
         
            return (
                <Col span={12} className='answer-contain'>
                <div className='each-answer-container'> 
                <div> <span>{index}</span></div>
               
                <p>ans</p>
                </div>
            </Col>

            );
        });
    }
    return (
        <Row className='answer-container'>
           { renderRank() }
        </Row>

    )
}

export default memo(Answer);