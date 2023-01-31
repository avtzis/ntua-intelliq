import { Box, Button, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import theme from '../theme'

const ThankYou = () => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography variant='h2' align='center' sx={{mt: 10}}>
            Survey submitted. Thank you for your participation!
        </Typography>
        <Container sx={{my: 5}}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant='contained' size='large' href='/'>
                    Go Home
                </Button>
            </Box>
        </Container>
    </ThemeProvider>
  )
}

export default ThankYou