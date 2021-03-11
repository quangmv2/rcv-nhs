import React, { FunctionComponent, memo, useEffect } from "react";
import { Table, Tag, Space, DatePicker } from 'antd';
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import "../users/users.css";
import moment from "moment";
import { useCreateContest } from "../../../util";

type Props = {
    refetch: Function,
    edit: any,
    setEdit: Function
}

const ContestForm: FunctionComponent<Props> = ({
    refetch, 
    edit, 
    setEdit
}) => {

    const [form] = Form.useForm();
    const { createContest, data, error, loading } = useCreateContest()

    useEffect(() => {
        console.log(data);
    }, [data])

    useEffect(() => {
        console.log(edit);
        if (!edit) {
            form.resetFields()
            return;
        }
        form.setFieldsValue({
            name: edit.name,
            timeStart: moment(edit.timeStart)
        })
    }, [edit])

    const onFinish = (values: any) => {
        console.log(values);
        let { name, timeStart } = values;
        console.log(timeStart);

        timeStart = timeStart.toDate().getTime()
        createContest({
            name, timeStart
        }).then(t => {
            console.log(11);
            refetch()
        })
    }

    return (
        <Form
            form={form}
            layout="vertical"
            name="basic"
            className='form-container'
            initialValues={{}}
            onFinish={onFinish}
        >
            <Button
                onClick={() => setEdit(null)}
            >Create</Button>
            <Form.Item
                label="Name"
                name="name"
                tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
                rules={[{ required: true, }]}
            >
                <Input placeholder="Name contest" />
            </Form.Item>
            <Form.Item
                label="Time Start"
                name="timeStart"
                tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
                rules={[{ required: true, }]}
            >
                <DatePicker style={{ width: "100%" }} showTime />
            </Form.Item>

            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" >
                    {
                        edit ? "Edit" : "Create"
                    }
                </Button>
            </Form.Item>
        </Form>
    )
}

export default memo(ContestForm);