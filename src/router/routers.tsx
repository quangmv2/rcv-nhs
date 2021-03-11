import { lazy } from "react"
const routerNoAuth = [
    {
        path: '/',
        component: lazy(() => import('../pages/dashboard')),
        isAuth: false,
        exact: true
    },
    {
        path: '/login',
        exact: false,
        isAuth: false,
        component: lazy(() => import('../pages/login'))
    },
    {
        path: '/dashboard',
        exact: false,
        isAuth: false,
        component: lazy(() => import('../pages/dashboard'))
    },
    {
        path: '/contests',
        exact: false,
        isAuth: false,
        component: lazy(() => import('../pages/contest/getcontest'))
    },
    {
        path: '/home/:id',
        exact: false,
        isAuth: false,
        component: lazy(() => import('../pages/contest'))
    },
    {
        path: '/contest/:id',
        exact: false,
        isAuth: true,
        component: lazy(() => import('../pages/contest'))
    },
]

const routerAuth: any[] = [
    {
        path: '/admin',
        exact: false,
        isAuth: true,
        component: lazy(() => import('../pages/admin'))
    },
    
]

const routerAdmin = [
    {
        path: '/',
        exact: true,
        component: lazy(() => import('../pages/admin/contest'))
    },
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