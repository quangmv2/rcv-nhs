import { lazy } from "react"
const routerNoAuth = [
    {
        path: '/',
        component: lazy(() => import('../pages/dashboard')),
        exact: true
    },
    {
        path: '/login',
        exact: false,
        component: lazy(() => import('../pages/login'))
    },
    {
        path: '/dashboard',
        exact: false,
        component: lazy(() => import('../pages/dashboard'))
    },
]

const routerAuth: any[] = [
    {
        path: '/admin',
        exact: false,
        component: lazy(() => import('../pages/admin'))
    },
]

const routerAdmin = [
    // {
    //     path: '/',
    //     exact: true,
    //     component: lazy(() => import('../pages/admin/users'))
    // },
    {
        path: '/contest',
        exact: false,
        component: lazy(() => import('../pages/admin/contest'))
    },
    {
        path: '/questions',
        exact: false,
        component: lazy(() => import('../pages/admin/questions'))
    },
    {
        path: '/users',
        exact: false,
        component: lazy(() => import('../pages/admin/users'))
    },
]

export {
    routerNoAuth,
    routerAuth,
    routerAdmin
}