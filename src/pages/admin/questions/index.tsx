import React, { memo } from "react";
import { Table, Row, Col,} from 'antd';
import QuestionForm from "./questionForm";

const Questions = () => {
    const columns = [
        {
          title: 'Question',
          dataIndex: 'question',
          key: 'question',
        },
        {
          title: 'Answers',
          dataIndex: 'answers',
          key: 'answer',
        },
        {
          title: 'Answer',
          dataIndex: 'answer',
          key: 'answer',
        },
        {
            title: 'Current Time',
            dataIndex: 'current time',
            key: 'current',
          },
        
      ];
    return(
        <Row >
             <Col xs={{ span: 18 }} lg={{ span: 16}} md={{ span: 24 }}> <Table columns={columns} /></Col>
             <Col xs={{ span: 6 }} lg={{ span: 8}} md={{ span: 24 }}>  <QuestionForm /></Col>
            
       
        </Row>
    )
}

export default memo(Questions);