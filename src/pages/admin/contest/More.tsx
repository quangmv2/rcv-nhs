import React, { FunctionComponent, useEffect, useState } from "react";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Table, Modal } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { getUsers, removeContestGQL, toggleUserToContest, userOfContest } from "../../../graphql";
import Checkbox from "antd/lib/checkbox/Checkbox";
import * as _ from "lodash";
import Question from "./question";

type Props = {
    id: string,
    refetch: Function,
    users: any[],
    questions: any[]
}

type PropsCheckBox = {
    checkProp: boolean,
    id_contest: string
    id_user: string
}

const JoinContest: FunctionComponent<PropsCheckBox> = ({
    checkProp = false,
    id_contest,
    id_user
}) => {

    const [checked, setChecked] = useState<boolean>(checkProp);
    const [toggleServer] = useMutation(toggleUserToContest)

    const toggle = () => {
        toggleServer({
            variables: { id_contest, id_user }
        }).then(d => {
            console.log(d);
            const { toggleUserToContest } = d.data;
            if (toggleUserToContest == "add") setChecked(true);
            else setChecked(false);
        }).catch(err => console.log(err))
    }

    return (
        <Checkbox
            onClick={toggle}
            checked={checked}
        ></Checkbox>
    )
}

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'timeStart',
        render: (index: any) => <>{index}</>
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'totaluser',
        render: (username: any) => `${username}`
    },
    {
        title: 'Fullname',
        dataIndex: '',
        key: 'fullname',
        render: (user: any) => `${user.firstname} ${user.lastname}`
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (email: any) => `${email}`
    },
    {
        title: 'Check',
        dataIndex: '',
        key: 'started',
        render: (user: any) => <JoinContest checkProp={user.check} id_contest={user.id_contest} id_user={user.id} />
    },
];

const More: FunctionComponent<Props> = ({
    id,
    refetch,
    users,
    questions
}) => {

    const [removeContest] = useMutation(removeContestGQL)
    const [getUserOfContest, { data }] = useMutation(userOfContest)
    const [visible, setVisible] = useState(false);
    const [visibleQuestion, setVisibleQuestion] = useState<boolean | null>(null);
    const [dataTable, setDataTable] = useState<any[]>([]);

    useEffect(() => {
        if (!users || !data) return;
        const { userOfContest } = data;
        const UOC = userOfContest.map((t: any) => t.id)
        const us = users.map((u, index) => {
            console.log(_.indexOf(UOC, u.id), UOC, u.id);
            return {
                ...u,
                check: _.indexOf(UOC, u.id) == -1 ? false : true,
                index: index + 1,
                id_contest: id
            }
        })
        setDataTable(us)
    }, [users, data])

    const remove = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Confirm',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => removeContest({
                variables: {
                    input: id
                }
            }).then(() => {
                refetch && refetch()
            }).catch(err => console.log(err))
        });

    }

    const openEditUser = () => {
        setVisible(true);
        getUserOfContest({
            variables: {
                id_contest: id
            }
        })
    }

    const openEditQuestion = () => {
        setVisibleQuestion(true);
        // getUserOfContest({
        //     variables: {
        //         id_contest: id
        //     }
        // })
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}
                onClick={openEditQuestion}
            >
                Edit Question
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}
                onClick={openEditUser}
            >
                Edit User
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} style={{
                color: "red"
            }} onClick={remove}>
                Remove
            </Menu.Item>
        </Menu>
    )

    return (

        <div>
            <Dropdown overlay={menu}>
                <p>...</p>
            </Dropdown>
            <Modal
                title="Modal 1000px width"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <Table columns={columns} dataSource={dataTable} />
            </Modal>
            <Question 
                id_contest={id}
                setVisibleQuestion={setVisibleQuestion}
                questions={questions}
                visibleProp={visibleQuestion} 
            />
        </div>
    )
}

export default More;