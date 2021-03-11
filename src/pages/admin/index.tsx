import { Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import { useRouteMatch, Switch, Route, Link, useHistory } from 'react-router-dom';
import { routerAdmin } from 'router/routers';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Suspense, useEffect } from 'react';
import "./index.css";
import { useStore } from 'store';
import * as _ from "lodash";

const { Header, Content, Footer, Sider } = Layout;

const Admin = () => {

    const  { auth, setAuth, init } = useStore();
    const history = useHistory()

    let { path, url } = useRouteMatch();

    useEffect(() => {
        // if (init) return;
        // if (!auth || !auth.user) return;
        // if (auth.user.idRole || _.indexOf(["SUPER_ADMIN", "ADMIN"], auth.user.idRole) < 0) history.push('/login');
    }, [auth])

    console.log(path, url);

    const logout = () => {
        setAuth && setAuth(null);
        localStorage.removeItem('access_token');
        history.push('/login')
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={logout} >
                Logout
          </Menu.Item>
            {/* <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
          </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                3rd menu item
          </Menu.Item> */}
        </Menu>
    );

    return (
        <Layout>
            <Header className="header">
                {/* <div className="logo" /> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className="menu-header">
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                    { auth && auth.user ? `${auth.user?.firstname} ${ auth.user?.lastname }` : ''} 
                </Dropdown.Button>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                            <Menu.Item key="1">
                                <Link to={`${url}/contest`}>Contest</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`${url}/questions`}>Question</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to={`${url}/users`}>Users</Link>
                            </Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Suspense fallback="loading">
                            <Switch>
                                {
                                    routerAdmin.map(r =>
                                        <Route key={`${path}${r.path}`} exact={r.exact} path={`${path}${r.path}`} >
                                            <r.component />
                                        </Route>
                                    )
                                }
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Admin;