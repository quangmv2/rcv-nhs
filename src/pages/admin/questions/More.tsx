import React, { FunctionComponent, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import { renderAnswer } from ".";
import { useMutation } from "@apollo/client";
import { removeQuestionGQL } from "../../../graphql";

type Props = {
    id: string
    question: any,
    refetch: any
}

const More: FunctionComponent<Props> = ({
    id,
    question,
    refetch
}) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [remove] = useMutation(removeQuestionGQL)
    console.log(question);

    const removeQuestion = () => {
        remove({
            variables: {
                input: id
            }
        }).then(() => {
            refetch && refetch()
        })
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}
                onClick={() => setVisible(true)}
            >
                Câu trả lời
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} style={{
                color: "red"
            }}
                onClick={removeQuestion}
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
                {
                    question && question.answers && question.answers.map((a, index) => {
                        console.log(index + 1, question.answer);
                        
                        return (
                            <>
                                <p>{renderAnswer(index + 1)}.    {renderAnswer(index + 1) == question.answer ? <strong>{a}</strong> : a} </p>
                                <br />
                            </>
                        )
                    })
                }
            </Modal>
        </div>
    )
}

export default More;