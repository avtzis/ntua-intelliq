import { Button, Container, CssBaseline, Paper, ThemeProvider, Typography, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import MyAlert from '../components/MyAlert';
import theme from '../theme';
import api from '../utilities/api';

let severity = 'success';
let message = '';

const Admintools = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(api + '/admin/updateCorp', {
      corporation: data.get('corporation')
    }).then(response => {
      console.log(response.data.message);
      severity = 'success';
      message = response.data.message;
      setOpen(true);
    }).catch(err => {
      console.error(err);
      severity = 'error';
      message = 'internal server error';
      setOpen(true);
    })
  };

  React.useEffect(() => {
    axios.get(api + '/admin')
    .then(response => {
      setValue(response.data.corporation);
    }).catch(err => {
      console.error(err);
    })
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyAlert open={open} handleClose={handleClose} severity={severity} message={message} />
        <Container component='form' maxWidth='md' sx={{mb: 4}} onSubmit={handleSubmit}>
          <Paper variant='outlined' sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
            <Typography variant='h4' align='center'>
              Admin Details
            </Typography>
            <TextField sx={{my: 3}} name='corporation' fullWidth label='Corporation' autoFocus value={value} onChange={(event => setValue(event.target.value))} />
            <Button type='submit' variant='contained' fullWidth>Save</Button>
          </Paper>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Admintools;