import React from 'react'
import { Container, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography, Box, Button } from '@mui/material'
import theme from '../theme'

const Profile = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth="md" sx={{ mb: 4 }}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='family-name'
                name='lastName'
                id='lastName'
                label='Last Name'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='age-group'
                name='ageGroup'
                id='ageGroup'
                label='Age Group'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='sex'
                name='sex'
                id='sex'
                label='Sex'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='city'
                autoComplete='city'
                id='city'
                label='City'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='state'
                name='state'
                id='state'
                label='State'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='education'
                name='education'
                id='education'
                label='Education'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='income'
                name='income'
                id='income'
                label='Income'
                fullWidth
              />
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='new-password'
                name='password'
                id='password'
                label='Password'
                fullWidth
                type='password'
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={null} fullWidth variant='contained' sx={{ mt: 3, ml: 1 }}>
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default Profile