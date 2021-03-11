import React, { memo, useEffect, useState } from "react";
import { Table, Row, Col, Button, } from 'antd';
import ContestForm from "./contestForm";
import { useQuery } from "@apollo/client";
import { contests, getUsers, getQuestions } from "../../../graphql";
import More from "./More";
import moment from "moment";
import { LoDashImplicitNumberArrayWrapper } from "lodash";



const Home = () => {

  const { data, loading, refetch } = useQuery(contests)
  const [dataContests, setDataConetsts] = useState([])
  const { data: users, loading: ldUser} = useQuery(getUsers)
  const { data: questions } = useQuery(getQuestions)
  const [edit, setEdit] = useState<any>()

  useEffect(() => {
    if (!users) return;
    console.log(users);
    
}, [users])

  useEffect(() => {
    if (!data) return;
    console.log(data);
    let { contests } = data;
    contests = contests.map((c: any, index: number) => {
      // console.log(c);

      // c["totalUser"] = 0;
      return {
        ...c,
        totalUser: 0,
        started: c.started == true ? "Started" : "Waitting",
        index: index +1
      };
    })
    setDataConetsts(contests);
  }, [data])

  const columns = [
    {
      title: "No.",
      dataIndex: 'index',
      key: 'index',
      render: (index: any) => <>{index}</>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total User',
      dataIndex: 'id_users',
      key: 'totaluser',
      render: (d: any) => <>{d.length}</>
    },
    {
      
      title: 'Total Question',
      dataIndex: 'id_questions',
      key: 'totalquestion',
      render: (d: any) => <>{d.length}</>
    },
    {
      title: 'TimeStart',
      dataIndex: 'timeStart',
      key: 'timeStart',
      render: (time: any) => moment(time).format("DD-MM-YYYY HH:mm") 
    },
    {
      title: 'Started',
      dataIndex: 'started',
      key: 'started',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'x',
      render: (id: any) => <>
        <More id={id} users={users ? users.getUsers : []} questions={questions ? questions.queryQuestions : []}  refetch={refetch}></More>
      </>,
    }
  ];

  const onRow = (record: any, rowIndex: any) => {
    return {
      onClick: () => {
        setEdit(record)
      }, 
    }
  }

  return (
    <Row >
      <Col xs={{ span: 18 }} lg={{ span: 16 }} md={{ span: 24 }}>
        <Table columns={columns} loading={loading} dataSource={dataContests} 
          onRow={onRow}
        />
      </Col>
      <Col xs={{ span: 6 }} lg={{ span: 8 }} md={{ span: 24 }}> 
       <ContestForm refetch={refetch} setEdit={setEdit} edit={edit} />
       </Col>
    </Row>
  )
}

export default memo(Home);