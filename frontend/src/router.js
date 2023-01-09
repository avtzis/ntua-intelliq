import {createBrowserRouter} from 'react-router-dom'

// Import Routes
import Layout from './routes/Layout';
import Home from './routes/Home'
import Admintools from './routes/Admintools'
import Surveys from './routes/Surveys';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';
import Create from './routes/Create';
import Edit from './routes/Edit';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // <Element />
        children: [
            {
                path: '/',
                element: <Home />
            },{
                path: 'admin',
                element: <Admintools />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'surveys',
                element: <Surveys />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'session',
                element: null
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'surveys/create',
                element: <Create />
            },
            {
                path: 'surveys/edit',
                element: <Edit />
            }
        ]
    }
]);

export default router;