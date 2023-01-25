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

const pages = [
  {name: 'Home', link: '/'},
  {name: 'Surveys', link: '/surveys'},
  {name: 'Admin', link: '/admin'},
]

const login = [
  {name: 'Login', link: '/login'},
  {name: 'Register', link: '/register'},
]

const loggedin = [
  {name: 'Profile', link: '/profile'},
  {name: 'Logout', link: '/logout'},
]

const Layout = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const token = localStorage.getItem("token");
  axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
  if(token) {
    axios.get('https://192.168.1.4:9103/intelliq_api/verifyLogin')
    .then(response => {
      setLoggedIn(response.data.loggedIn);
    }).catch(err => {
      setLoggedIn(false);
      console.error(err);
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
            {pages.map((page) => (
              <Button 
              key={page.name}
              href={page.link}
              sx={{color: 'inherit'}}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box>
            {loggedIn ?
              loggedin.map((page) => (
                <Button 
                key={page.name}
                href={page.link}
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