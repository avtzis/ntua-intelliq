import React from 'react'
import { Container, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography, Box, Button, MenuItem, InputAdornment, IconButton } from '@mui/material'
import theme from '../theme'
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from '../utilities/api';
import MyAlert from '../components/MyAlert';

let data = null;

const ageGroups = ['Under 18', '18-24', '24-30', '30-45', '45-60', '60+'];
const sexes = ['Male', 'Female', 'Other'];
const educations = ['None', 'Primary Education', 'Lower Secondary Education', 'Upper Secondary Education', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctoral Degree'];
const incomes = ['<5.000', '5.000-15.000', '15.000-50.000', '50.000-100.000', '>100.000'];

const fetchValues = async () => {
  if(!data) {
    data = {
      firstName: null,
      lastName: null,
      ageGroup: null,
      sex: null,
      city: null,
      state: null,
      education: null,
      income: null,
      username: null
    };
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
    if(token) {
      const myData = await (await axios.get('https://localhost:9103/intelliq_api/profile')).data;
      data.firstName = myData.user.name;
      data.lastName = myData.user.surname;
      data.ageGroup = myData.user.ageGroup;
      data.sex = myData.user.sex;
      data.city = myData.user.city;
      data.state = myData.user.state;
      data.education = myData.user.education;
      data.income = myData.user.income;
      data.username = myData.user.username;
    }
  }
  return data;
}

let message = '';
let severity = '';

const Profile = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [ageGroup, setAgeGroup] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [income, setIncome] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    fetchValues().then(values => {
      setFirstName(values.firstName);
      setLastName(values.lastName);
      setAgeGroup(values.ageGroup);
      setSex(values.sex);
      setCity(values.city);
      setState(values.state);
      setEducation(values.education);
      setIncome(values.income);
      setUsername(values.username);
    }).catch(err => console.error(err))
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(api + '/profile/update', {
      password: data.get('password'),
      name: data.get('firstName'),
      surname: data.get('lastName'),
      ageGroup: data.get('ageGroup'),
      sex: data.get('sex'),
      city: data.get('city'),
      state: data.get('state'),
      education: data.get('education'),
      income: data.get('income')
    }).then(response => {
      console.log(response.data.message);
      message = response.data.message;
      severity = 'success';
      setOpen(true);
    })
    .catch(err => {
      console.error(err.response.data.message);
      message = err.response.data.message;
      severity = 'error';
      setOpen(true);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyAlert open={open} handleClose={handleClose} severity={severity} message={message} />
      <Container component='form' maxWidth="md" sx={{ mb: 4 }} onSubmit={handleSubmit}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Profile Settings
          </Typography>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='family-name'
                name='lastName'
                id='lastName'
                label='Last Name'
                fullWidth
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='age-group'
                name='ageGroup'
                id='ageGroup'
                label='Age Group'
                fullWidth
                value={ageGroup}
                onChange={(event) => setAgeGroup(event.target.value)}
                select
              >
                {ageGroups.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='sex'
                name='sex'
                id='sex'
                label='Sex'
                fullWidth
                value={sex}
                onChange={(event) => setSex(event.target.value)}
                select
              >
                {sexes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='city'
                autoComplete='city'
                id='city'
                label='City'
                fullWidth
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='state'
                name='state'
                id='state'
                label='State'
                fullWidth
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='education'
                name='education'
                id='education'
                label='Education'
                fullWidth
                value={education}
                onChange={(event) => setEducation(event.target.value)}
                select
              >
                {educations.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='income'
                name='income'
                id='income'
                label='Income'
                fullWidth
                value={income}
                onChange={(event) => setIncome(event.target.value)}
                select
                InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
              >
                {incomes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom sx={{pt: '25px'}}>
            Account Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='username'
                name='username'
                id='username'
                label='Username'
                fullWidth
                value={username}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='new-password'
                name='password'
                id='password'
                label='Change Password'
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>}}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, ml: 1 }}>
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default Profile