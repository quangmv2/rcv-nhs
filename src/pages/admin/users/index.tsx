import React, { memo, useEffect, useState } from "react";
import { Table, Form, Row, Col, } from 'antd';
import './users.css';
import UserForm, { HOST } from "./UserForm";
import { getUsers } from "../../../graphql";
import { useQuery } from "@apollo/client";
import More from "./More";


export const revertDV = (dv: any) => {
    switch (dv) {
        case "pkm":
            return "Phường Khuê Mỹ"
        case "phh":
            return "Phường Hòa Hải"
        case "pma":
            return "Phường Mỹ An"
        case "tvcc":
            return "Trường Võ Chí Công"
        case "tnhs":
            return "Trường Ngũ Hành Sơn"
        case "thg":
            return "Trường Hermann Gmeiner"
        case "tf":
            return "Trường FPT"
        case "phq": 
            return "Phường Hòa Qúy"
        default:
            return "Tự do"
    }
}


const Home = () => {
    const [form] = Form.useForm();
    const { data: users, loading: ldUser, refetch } = useQuery(getUsers)
    const [dataTable, setDataTable] = useState<any[]>([])

    useEffect(() => {
        if (!users) return;
        setDataTable(users.getUsers)
    }, [users])

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image: any) => <>
                {
                    image && <img src={`${HOST}/image-download?id=${image}`} alt="avatar" height={75} width={75}
                        style={{
                            borderRadius: 100,
                        }}
                    />
                }
            </>
        },
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
            dataIndex: '',
            key: 'name',
            render: (value: any) => `${value.firstname} ${value.lastname}`
        },
        {
            title: 'Đơn vị',
            dataIndex: 'dv',
            key: 'dv',
            render: (dv: any) => revertDV(dv)
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'x',
            render: (id: any) => <>
              <More id={id} refetch={refetch}></More>
            </>,
          }

    ];
    return (
        <Row >
            <Col xs={{ span: 20 }} lg={{ span: 18 }} md={{ span: 24 }}> <Table dataSource={dataTable} columns={columns} /></Col>
            <Col xs={{ span: 6 }} lg={{ span: 6 }} md={{ span: 24 }}>  
            <UserForm refetch={refetch} />
            </Col>
        </Row>
    )
}

export default memo(Home);