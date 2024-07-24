import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';

import Suspense from '../utils';
import Private from './private/Private';
import { useSelector } from 'react-redux';
import DashboardProfile from './dashboard-profile/DashboardProfile';

const Home = lazy(() => import('./home/Home'));
const Auth = lazy(() => import('./auth/Auth'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Products = lazy(() => import('./products/Products'));
const Users = lazy(() => import('./users/Users'));;
const Login = lazy(() => import('./auth/login/Login'));
const Register = lazy(() => import('./auth/register/Register'));

const RouteController = () => {
    const auth = useSelector(state => state);
    return useRoutes([
        {
            path: '',
            element: <Suspense><Home /></Suspense>,
        },
        {
            path: 'auth',
            element: auth.token ? <Navigate to='/dashboard' /> : <Suspense><Auth /></Suspense>,
            children: [
                {
                    path: '',
                    element: <Suspense><Login /></Suspense>,
                },
                {
                    path: 'register',
                    element: <Suspense><Register /></Suspense>,
                },
            ],
        },
        {
            path: 'dashboard',
            element: <Suspense><Private /></Suspense>,
            children: [
                {
                    path: '',
                    element: <Suspense><Dashboard /></Suspense>,
                    children: [
                        {
                            path: '',
                            element: <Suspense><Products /></Suspense>,
                        },
                        {
                            path: 'users',
                            element: <Suspense><Users /></Suspense>,
                        },
                        {
                            path: 'profile',
                            element: <Suspense><DashboardProfile /></Suspense>,
                        }
                    ]
                }
            ]
        },

    ]);
};

export default RouteController;
