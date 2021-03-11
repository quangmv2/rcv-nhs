import React, { memo } from "react";
import Question from "./question";
import { Table, Row, Col, } from 'antd';


const Home = () => {
  return (
    <Row>
      <Col span={20}>
        <Question question='Jusst Something' />
      </Col>
      <Col span={4}>
        Col
    </Col>

    </Row>


  )
}

export default memo(Home);