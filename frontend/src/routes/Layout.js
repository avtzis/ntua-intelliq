import React from 'react'
import { Outlet } from 'react-router-dom';
import axios from 'axios';

// Material Components
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Toolbar';
import { Box, Button } from '@mui/material';
import Copyright from '../components/Copyright';

// Font
import 'fontsource-roboto';

// Theme
import theme from '../theme';

// Icons
import Memory from '@mui/icons-material/MemorySharp';
import logoutUser from '../utilities/logoutUser';
import api from '../utilities/api';

const login = [
  {name: 'Login', link: '/login'},
  {name: 'Register', link: '/register'},
]

const loggedin = [
  {name: 'Profile', link: '/profile', handleClick: null},
  {name: 'Logout', link: null, handleClick: logoutUser},
]

const Layout = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [role, setRole] = React.useState('');

  const token = localStorage.getItem("token");
  axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
  if(token) {
    axios.get(api + '/verifyLogin')
    .then(response => {
      setLoggedIn(response.data.loggedIn);
      setRole(response.data.role);
    }).catch(err => {
      setLoggedIn(false);
      setRole('');
      console.error(err.response.data.message);
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='relative' theme={theme}>
        <Toolbar>
          <Memory sx={{mr: -2}} fontSize='large'/>
          <Typography 
            variant='h6'
            component='a'
            href='/'
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            intelliQ
          </Typography>
          
          <Box sx={{flexGrow: 1}}>
            <Button href='/' sx={{color: 'inherit'}}>Home</Button>
            {
              role === 'admin' ?
                <React.Fragment>
                  <Button href='/surveys' sx={{color: 'inherit'}}>Surveys</Button>
                  <Button href='/admin' sx={{color: 'inherit'}}>Admin</Button>
                </React.Fragment>
              :
                role === 'user' ?
                  <Button href='/mysurveys' sx={{color: 'inherit'}}>My Surveys</Button>
                :
                  <React.Fragment />
            }
          </Box>
          <Box>
            {loggedIn ?
              loggedin.map((page) => (
                <Button 
                key={page.name}
                href={page.link}
                onClick={page.handleClick}
                sx={{color: 'inherit', marginLeft: 'auto'}}
                >
                  {page.name}
                </Button>
              )): login.map((page) => (
                  <Button 
                  key={page.name}
                  href={page.link}
                  sx={{color: 'inherit', marginLeft: 'auto'}}
                  >
                    {page.name}
                  </Button>
                ))
            }
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
      <footer>
        <Copyright />
      </footer>
    </React.Fragment>
  )
}

export default Layout;