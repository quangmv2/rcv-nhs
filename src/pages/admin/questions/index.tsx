import React, { memo, useEffect, useState } from "react";
import { Table, Row, Col, } from 'antd';
import QuestionForm from "./questionForm";
import { useQuery } from "@apollo/client";
import { queryQuestionsGQL } from "../../../graphql";
import More from "./More";
import question from "pages/contest/question";


export const renderAnswer = (a: any) => {
  let t = '';
  switch (a) {
    case 1:
      return 'A'
      break;
    case 2:
      return 'B'
      break;
    case 3:
      return 'C'
      break;
    default:
      break;
  }
  return "D";
}

const Questions = () => {

  const { data, loading, refetch } = useQuery(queryQuestionsGQL);
  const [dataQuestions, setDataQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;
    console.log(data);
    let { queryQuestions } = data;
    queryQuestions = queryQuestions.map((q: any, index: number) => {
      return {
        ...q,
        answer: renderAnswer(q.answer),
        index: index + 1
      }
    })
    setDataQuestions(queryQuestions)
  }, [data])


const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer',
  },
  {
    title: 'Current Time',
    dataIndex: 'currentTime',
    key: 'currentTime',
  },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    render: (value: any) => <>
      <More id={value.id} question={value} refetch={refetch}></More>
    </>,
  }
];

  return (
    <Row >
      <Col xs={{ span: 18 }} lg={{ span: 16 }} md={{ span: 24 }}>
        <Table columns={columns} loading={loading} dataSource={dataQuestions} />
      </Col>
      <Col xs={{ span: 6 }} lg={{ span: 8 }} md={{ span: 24 }}>
        <QuestionForm refetch={refetch} />
      </Col>
    {/* <More id="mmm"/> */}
    </Row>
  )
}

export default memo(Questions);