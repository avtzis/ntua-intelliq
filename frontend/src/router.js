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
//import Edit from './routes/Edit';
import Session from './routes/Session';
import ThankYou from './routes/ThankYou';
import Logout from './utilities/logoutUser';
import Graph from './routes/Graph';
//import axios from 'axios';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // <Element />
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
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
                path: 'session/:surveyID',
                element: <Session />
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
                element: null
            },
            {
                path: 'logout',
                action: Logout
            },
            {
                path: '/session/thankyou',
                element: <ThankYou />
            },
            {
                path: '/surveys/:surveyID/graph',
                element: <Graph />
            }
        ]
    }
]);

export default router;