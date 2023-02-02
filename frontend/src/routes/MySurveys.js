import { Container, CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import TableSurveyFinished from '../components/TableSurveyFinished'
import TableSurveyUnfinished from '../components/TableSurveyUnfinished'
import theme from '../theme'

const MySurveys = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Container maxWidth='md' sx={{my: 4}}>
              <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography variant='h6' align='center'>
                  Unsubmitted Surveys
                </Typography>
                <TableSurveyUnfinished />
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth='md' sx={{my: 4}}>
              <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography variant='h6' align='center'>
                  Submitted Surveys
                </Typography>
                <TableSurveyFinished />
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MySurveys