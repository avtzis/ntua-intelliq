import { Box, Button, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import theme from '../theme'

const Error = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant='h1' align='center'>404</Typography>
          <Typography variant='h4' align='center'>
            Page Not Found
          </Typography>
          <Box sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', pt:4}}>
            <Button variant='contained' href='/'>Go Home</Button>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Error