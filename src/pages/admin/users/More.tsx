import React, { FunctionComponent } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

type Props = {
    id: string
}

const More: FunctionComponent<Props> = ({
    id
}) => {

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                1st menu item
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} style={{
                color: "red"
            }}>
                Remove
            </Menu.Item>
        </Menu>
    )

    return (

        <div>
            <Dropdown overlay={menu}>
                <p>...</p>
            </Dropdown>
        </div>
    )
}

export default More;