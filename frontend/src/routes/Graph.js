import { Container, CssBaseline, ThemeProvider, Typography, Paper, Grid, Box, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material'
import React from 'react'
import theme from '../theme'
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../utilities/api';

const blank = {
  id: '',
  title: '',
  questions: []
}

const Graph = () => {
  const params = useParams();
  const surveyID = params.surveyID;
  const [survey, setSurvey] = React.useState(blank);

  React.useEffect(() => {
    axios.get(api + '/ownedsurveys/survey/' + surveyID + '/answers')
    .then(response => {
      setSurvey(response.data);
      console.log(response.data);
    }).catch(err => console.error(err.response.data.message));
  }, [surveyID])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg' sx={{mt: 4}}>
        <Paper variant='outlined' sx={{mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
          <Typography component='h1' variant='h4' align='center'>
            {survey.title}
          </Typography>
        </Paper>
      </Container>
      <Container maxWidth='lg' sx={{mt: 5}}>
        <Grid container spacing={4}>
          {survey.questions.map(question => (
            <Grid item xs={12} key={question.id}>
                <Paper variant='outlined'>
                  <Typography variant='h6' align='center' sx={{py: 3}}>
                    {question.title}
                  </Typography>
                  <Box sx={{pb: 2}}>
                    {
                      question.answerType === 'options' ?
                        <BarChart width={1115} height={500} data={question.answers}>
                          <XAxis dataKey='title' stroke={theme.palette.primary.main} />
                          <YAxis />
                          <Tooltip />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <Bar dataKey='answered' barSize={50} fill={theme.palette.primary.main} />
                        </BarChart>
                      :
                        <React.Fragment>
                          <TableContainer sx={{maxHeigh: 500, px: 3}}>
                            <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    Context
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {question.answers[0].context.map(ans => (
                                  <TableRow hover role='checkbox' tabIndex={-1} key={ans}>
                                    <TableCell>
                                      {ans}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </React.Fragment>
                    }
                  </Box>
                </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Graph