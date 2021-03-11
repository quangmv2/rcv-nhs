import React, { FunctionComponent, memo } from "react";
import { Table, Tag, Space } from 'antd';
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import  "../users/users.css";
import * as _ from "lodash";
import { useMutation } from "@apollo/client";
import { createQuestionGQL } from "../../../graphql";

type Props = {
  refetch?: Function
}

const QuestionForm: FunctionComponent<Props> = ({
  refetch
}) => {
    const [ create, {data, error, loading} ] = useMutation(createQuestionGQL)
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
      console.log(values);
      const { 
        question, a, b, c, d, answer, time
      } = values;
      const answers = _.concat(a, b, c, d);
      const input = {
        question, answers, currentTime: Number(time), answer: Number(answer)
      }
      console.log(input);
      create({ variables: input }).then(data => {
        refetch && refetch();
        // form.resetFields();
        // form.setFieldsValue({
        //   time: 30,
        //   answer: 1
        // })
      }).catch(err => console.log(err));
    }
    
    return(
        <Form
        form={form}
        layout="vertical"
        className='form-container'
        onFinish={onFinish}
        initialValues={{
          time: 30,
          answer: 1
        }}
      >
        <Form.Item
          label="Question"
          name="question"
          rules={[
            {
              required: true
            }
          ]}
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input.TextArea rows={5} placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="A"
          name="a"
          rules={[
            {
              required: true
            }
          ]}
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="B"
          name="b"
          rules={[
            {
              required: true
            }
          ]}
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="C"
          name="c"
          rules={[
            {
              required: true
            }
          ]}
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="D"
          name="d"
          rules={[
            {
              required: true
            }
          ]}
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Answer"
          name="answer"
          rules={[
            {
              required: true
            }
          ]}
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" type="number" min={1} max={4} />
        </Form.Item>
        <Form.Item
          label="Time(s)"
          name="time"
          rules={[
            {
              required: true
            }
          ]}
          tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="input placeholder" type="number" min={10} max={1000} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
        </Form.Item>
      </Form>
    )
}

export default memo(QuestionForm);