import React, { memo } from "react";
import { Table, Tag, Space } from 'antd';
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import  "../users/users.css";

const QuestionForm = () => {
   
    const [form] = Form.useForm();
    
    return(
        <Form
        form={form}
        layout="vertical"
        className='form-container'
       
      >
        <Form.Item
          label="Question"
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Answers"
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

export default memo(QuestionForm);