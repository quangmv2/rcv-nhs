import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { user } from "graphql";
import React, { FunctionComponent, memo, Suspense, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { useGetUser } from "../util";
import "./public.scss";
import * as _ from "lodash";

const { Header, Content, Footer, Sider } = Layout;


const PublicLayout = ({
    MyComponent
}: any) => {

    const { auth, setAuth } = useStore()
    const history = useHistory()
    const location = useLocation()
    const { getUser, loading } = useGetUser()


    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            return;
        }
        syncUser()
    }, [])

    const syncUser = () => {
        console.log(1);

        getUser().then(data => {
            console.log(data);
            setAuth && setAuth(data)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[location.pathname]}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="/" >
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="/contests" isSelected={true}>
                            <Link to="/contests" >Contests</Link>
                        </Menu.Item>
                        {
                            auth && auth.user ? (
                                <SubMenu title={`${auth.user.firstname} ${auth.user.lastname}`}>
                                    <Menu.Item key="/user" onClick={() => {
                                        setAuth && setAuth(null)
                                        localStorage.removeItem("access_token")
                                    }}>
                                            Logout
                                    </Menu.Item>
                                </SubMenu>

                            ) : (
                                    <Menu.Item key="/login">
                                        <Link to="/login">Login</Link>
                                    </Menu.Item>
                                )
                        }

                        <Menu.Item key="/dashboards">
                            <Link to="/dashboards">Dashboard</Link>
                        </Menu.Item>
                        {
                            auth && auth.user && _.indexOf(["SUPER_ADMIN", "ADMIN"], auth.user.idRole) > -1 &&
                            <Menu.Item key="/admin">
                            <Link to="/admin">Admin</Link>
                            </Menu.Item>
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Suspense fallback="Loading...">
                            {
                                MyComponent && <MyComponent />
                            }
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        // </>
    )
}

export default memo(PublicLayout);