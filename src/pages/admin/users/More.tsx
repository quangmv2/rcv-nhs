import React, { FunctionComponent, useState } from "react";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu, message, Modal } from "antd";
import { useMutation } from "@apollo/client";
import { changePasswordGQL, removeUser } from "../../../graphql";

type Props = {
    id: string,
    refetch?: Function
}

const More: FunctionComponent<Props> = ({
    id,
    refetch
}) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [change, { loading }] = useMutation(changePasswordGQL)
    const [ remove ] = useMutation(removeUser);

    const changePassword = () => {
        setVisible(true)
    }

    const onFinish = (values: any) => {
        setVisible(true)
        change({
            variables: {
                input: values.newPassword,
                id_user: id
            }
        }).then((d) => {
            console.log(d);
            if (d.data.changePassword) {
                message.success("Success")
            } else {
                message.warn("Không thành công")
            }
            setVisible(false)
        }).catch((err) => {
            console.log(err);

            message.warn("Không thành công")
            setVisible(false)
        })
    }

    const onRemove = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Confirm',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => remove({
                variables: {
                    input: id
                }
            }).then(() => {
                refetch && refetch()
                message.success("success")
            }).catch(err => message.error("error"))
        });
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}
                onClick={changePassword}
            >
                Change Password
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} style={{
                color: "red"
            }}
                onClick={onRemove}
            >
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
                <Form
                    //   form={form}
                    layout="vertical"
                    className='form-container'
                    initialValues={{
                    }}
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        required
                        tooltip="This is a required field"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input placeholder="input placeholder" type="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' loading={loading} >Đổi mật khẩu</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default More;