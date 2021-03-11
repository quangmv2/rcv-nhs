import React, { memo } from "react";
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const UserForm = () => {
    const [form] = Form.useForm();
    
    return(
        <Form
        form={form}
        layout="vertical"
        className='form-container '>
        <Form.Item label="Username" >
        <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Password" required tooltip="This is a required field">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Email"
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="FirstName"
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="LastName"
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    )
}

export default memo(UserForm);