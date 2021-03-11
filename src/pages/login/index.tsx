import React, { memo, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import Layout, { Content } from "antd/lib/layout/layout";
import "./index.css";
import { useLogin } from "../../util";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const Login = () => {

    const { login, data, error } = useLogin()
    const history = useHistory()

    useEffect(() => {
        console.log(data);
        if (!data) return;
        const access_token = data.login.access_token;
        localStorage.setItem("access_token", access_token);
        history.push('/')
    }, [data])

    useEffect(() => {
        if (error) alert('Login failed')
    }, [error])


    const onFinish = (values: any) => {
        console.log('Success:', values);
        try {
            login(values.username, values.password);
        } catch (error) {
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="page-login">
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default memo(Login);