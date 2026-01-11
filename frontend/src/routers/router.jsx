import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import CreateMovie from '@/pages/CreateMovie'; 
import MovieList from '@/pages/MovieList';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import MovieDetail from '@/pages/MovieDetail';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, // equivale a path: '/'
                element: <Home />
            },
            {
                path: '/create',
                element: <CreateMovie />
            },
            {
                path: '/movie/:id',
                element: <MovieDetail />
            },
            {
                path: '/list',
                element: <MovieList />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/Register',
                element: <Register />
            },
            {
                path: '/Dashboard',
                element: <Dashboard />
            }
        ]
    }
]);
