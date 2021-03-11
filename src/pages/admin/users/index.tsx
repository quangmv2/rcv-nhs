import React, { memo } from "react";
import { Table, Form, Row, Col, } from 'antd';
import './users.css';
import UserForm from "./UserForm";


const Home = () => {
    const [form] = Form.useForm();
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',

        },
    ];

    const columns = [
        
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        

    ];
    return (
        <Row >
            <Col xs={{ span: 18 }} lg={{ span: 16 }} md={{ span: 24 }}> <Table dataSource={dataSource} columns={columns} /></Col>
            <Col xs={{ span: 6 }} lg={{ span: 8 }} md={{ span: 24 }}>  <UserForm /></Col>


        </Row>
    )
}

export default memo(Home);