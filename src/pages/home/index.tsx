import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Row } from "antd";
import { changePasswordGQL } from "../../graphql";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { useStore } from "store";
import { HOST } from "pages/admin/users/UserForm";


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
        default:
            return "Tự do"
    }
}
const Home = () => {

    const [change, { loading }] = useMutation(changePasswordGQL)
    const { auth } = useStore()

    const onFinish = (values: any) => {
        change({
            variables: {
                input: values.newPassword,
                // id_user: id
            }
        }).then((d) => {
            console.log(d);
            if (d.data.changePassword) {
                message.success("Success")
            } else {
                message.warn("Không thành công")
            }
        }).catch((err) => {
            message.warn("Không thành công")
        })
    }
    return (
        <>
            {
                auth && auth.user ? <Row>
                    <Col span={6}>
                        <img src={`${HOST}/image-download?id=${auth.user.image}`} alt="avt"
                            width={300} height={300} style={{
                                borderRadius: "100%"
                            }}
                        />
                    </Col>
                    <Col span={18}>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        Họ và tên:
                                    </td>
                                    <td>
                                        {
                                            `${auth.user.firstname} ${auth.user.lastname}`
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Email:
                                    </td>
                                    <td>
                                        {
                                            auth.user.firstname
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Đơn vị:
                                    </td>
                                    <td>
                                        {
                                            revertDV(auth.user.dv)
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Form
                            //   form={form}
                            layout="vertical"
                            className='form-container'
                            initialValues={{
                            }}
                            name="basic"
                            onFinish={onFinish}
                        >
                            {/* <Form.Item
                            label="Mật khẩu cũ"
                            name="oldPassword"
                            required
                            rules={[
                                { required: true }
                            ]}
                        >
                            <Input placeholder="input placeholder"  type="password" />
                        </Form.Item> */}
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
                                <Button type="primary" htmlType='submit' >Đổi mật khẩu</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                    : <h1>Welcome</h1>
            }

        </>
    )
}

export default memo(Home);