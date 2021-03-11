import React, { memo } from "react";
import { Table, Row, Col,} from 'antd';
import ContestForm from "./contestForm";

const Home = () => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Total User',
          dataIndex: 'totalUser',
          key: 'totaluser',
        },
        {
          title: 'TimeStart',
          dataIndex: 'timeStart',
          key: 'TimeStart',
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: () => <a>...</a>,
          }
      ];
    return(
        <Row >
             <Col xs={{ span: 18 }} lg={{ span: 16}} md={{ span: 24 }}> <Table columns={columns} /></Col>
             <Col xs={{ span: 6 }} lg={{ span: 8}} md={{ span: 24 }}>  <ContestForm /></Col>
            
       
        </Row>
    )
}

export default memo(Home);