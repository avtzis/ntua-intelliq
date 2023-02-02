import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { CssBaseline, IconButton, Paper, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, ThemeProvider, Collapse, Box, Typography, Button } from '@mui/material'
import axios from 'axios';
import React from 'react'
import theme from '../theme';
import api from '../utilities/api';
import MyAlert from './MyAlert';

let severity = 'success';
let message = '';

const Row = props => {
  const {session} = props;
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = () => setOpenAlert(false);
  const handleSubmit = event => {
    event.preventDefault();
    axios.post(api + '/session/' + session.questionnaire.id + '/submitSurvey')
    .then(response => {
      message = response.data.message;
      setOpenAlert(true);
      window.location.reload();
    })
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyAlert open={openAlert} handleClose={handleClose} severity={severity} message={message} />
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
          <TableCell>
            <IconButton size='small' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            {session.questionnaire.title}
          </TableCell>
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right'>
            <Button href={'/session/' + session.questionnaire.id}>Continue</Button>
          </TableCell>
          <TableCell align='right'>
            <Button onClick={handleSubmit} disabled={session.finished === 'false'}>Submit</Button>
          </TableCell>
          <TableCell align='right' />
        </TableRow>
        <TableRow>
          <TableCell colSpan={13} sx={{py: 0}}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{m: 1}}>
                <Typography variant='h6' gutterBottom component='div'>
                  Questions
                </Typography>
                <Table size='medium'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell align='right'>Answer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {session.uniqueAnswers.map(answer => (
                      <TableRow key={answer.id}>
                        <TableCell component='th' scope='row'>{session.questionnaire.questions.filter(question => question.id === answer.questionID)[0].title}</TableCell>
                        <TableCell align='right'>{answer.skipped === 'false' ? answer.context : '<skipped>'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </ThemeProvider>
    </React.Fragment>
  )
}

const TableOne = () => {
  const [sessions, setSessions] = React.useState([]);

  React.useEffect(() => {
    axios.get(api + '/mysurveys')
    .then(response => {
      setSessions(response.data.sessions.filter(session => session.submitted === 'false'));
    }).catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align='left'>Survey</TableCell>
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
          <TableCell align='right' />
        </TableRow>
      </TableHead>
      <TableBody>
        {sessions.map(session => (
          <Row key={session.id} session={session} />
        ))}
      </TableBody>
    </Table>
  )
}

const TableSurveyUnfinished = () => {
  return (
    <TableContainer component={Paper}>
      <TableOne />
    </TableContainer>
  )
}

export default TableSurveyUnfinished