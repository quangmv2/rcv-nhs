import React, { memo, useState } from "react";
import { Form, Input, Button, Radio, Upload, Select, message } from 'antd';
import { InfoCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import { useMutation } from "@apollo/client";
import { createUser } from "../../../graphql";

export const HOST = ''

const { Option } = Select

const UserForm = ({
  refetch
}: any) => {
  const [form] = Form.useForm();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>();
  const [create, { }] = useMutation(createUser)

  const handleChange = async (infor: any) => {
    console.log(infor.target.files[0]);
    var formData = new FormData();
    formData.append("image", infor.target.files[0]);
    setLoadingImage(true);
    axios.post(`${HOST}/add-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(data => {
      console.log(data);
      setImage(data.data)
    })
  }

  const onFinish = (values: any) => {
    create({
      variables: {
        ...values,
        image
      }
    }).catch(err => console.log(err)).then(() => {
      message.warn('error')
      refetch && refetch()
    }).then((d: any) => {
      console.log(d);
      if (d) {
        message.success("success")
      } else {
        message.warn('error')
      }
      refetch && refetch()
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      className='form-container'
      initialValues={{
        dv: "pkm"
      }}
      name="basic"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        required
        rules={[
          { required: true }
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        required
        tooltip="This is a required field"
        rules={[
          { required: true }
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true, type: "email" }
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="FirstName"
        name="firstname"
        tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true }
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Lastname"
        name="lastname"
        tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true }
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="????n v???"
        name="dv"
        tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true }
        ]}
      >
        <Select style={{ width: "100%" }} >
          <Option value="pkm">Ph?????ng Khu?? M???</Option>
          <Option value="phh">Ph?????ng H??a H???i</Option>
          <Option value="phq">Ph?????ng H??a Q??y</Option>
          <Option value="pma">Ph?????ng M??? An</Option>
          <Option value="tvcc">Tr?????ng V?? Ch?? C??ng</Option>
          <Option value="tnhs">Tr?????ng Ng?? H??nh S??n</Option>
          <Option value="thg">Tr?????ng Hermann Gmeiner</Option>
          <Option value="tf">Tr?????ng FPT</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Input type="file" onChange={handleChange} />
        {
          image && <img src={`${HOST}/image-download?id=${image}`} alt="avatar" height={100} width={100}
            style={{
              borderRadius: 100,
              marginTop: "20px"
            }}
          />
        }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType='submit' >Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default memo(UserForm);