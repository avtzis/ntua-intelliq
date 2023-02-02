import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { CssBaseline, IconButton, Paper, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, ThemeProvider, Collapse, Box, Typography, Button } from '@mui/material'
import React from 'react'
import theme from '../theme';
import MyAlert from './MyAlert';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';
import api from '../utilities/api';
import fileDownload from 'js-file-download';

let severity = 'success';
let message = '';

const Row = props => {
  const {session} = props;
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = () => setOpenAlert(false);
  const handleExport = event => {
    event.preventDefault();
    axios.get(api + '/mysurveys/survey/' + session.questionnaire.id + '/export', {responseType: 'blob'})
    .then(response => {
      fileDownload(response.data, 'exported_session.json');
    }).catch(err => {
      console.error(err.response.data.message);
      severity = 'error';
      message = err.response.data.message;
      setOpenAlert(true);
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
          <TableCell align='right'>
            <Button startIcon={<GetAppIcon />} onClick={handleExport}>Export</Button>
          </TableCell>
          <TableCell align='right' />
          <TableCell align='right' />
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
      //eslint-disable-next-line
      setSessions(response.data.sessions.filter(session => session.submitted == true));
    }).catch(err => {
      console.error(err);
    })
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

const TableSurveyFinished = () => {
  return (
    <TableContainer component={Paper}>
      <TableOne />
    </TableContainer>
  )
}

export default TableSurveyFinished