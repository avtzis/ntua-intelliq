import React from 'react'
import { TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, IconButton, Collapse, Box, Typography, Button } from '@mui/material'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from '../theme';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';
import api from '../utilities/api';
import MyAlert from './MyAlert';
import fileDownload from 'js-file-download';

const RowTwo = (props) => {
  const {question} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>{question.title}</TableCell>
        <TableCell align='right'>{question.type}</TableCell>
        <TableCell align='right'>{question.required === 'true' ? <CheckIcon /> : <CloseIcon />}</TableCell>
        <TableCell align='right'>{question.qaCount}</TableCell>
        <TableCell align='right'>{question.ifSkippedNextQuestion ? question.ifSkippedNextQuestion.title : (question.required === 'true' ? 'n/a' : 'end')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 2}}>
              <Typography variant="h6" gutterBottom component="div">
                Options
              </Typography>
              <Table size='small' aria-label='options'>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align='right'>Next Question</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {question.answers.map((answer) => (
                    <TableRow key={answer.title}>
                      <TableCell component='th' scope='row'>{answer.title}</TableCell>
                      <TableCell align='right'>{answer.nextQuestion ? answer.nextQuestion.title : 'end'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

let severity = '';
let message = '';

const RowOne = (props) => {
  const {survey} = props;
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = () => setOpenAlert(false);

  const handlePublish = event => {
    event.preventDefault();
    axios.post(api + '/ownedsurveys/survey/' + survey.id + '/publish')
    .then(response => {
      console.log(response.data.message);
      severity = 'success';
      message = response.data.message;
      setOpenAlert(true);
      window.location.reload();
    }).catch(err => {
      console.error(err.response.data.message);
      severity = 'error';
      message = err.response.data.message;
      setOpenAlert(true);
    });
  }

  const handleDelete = event => {
    event.preventDefault();
    axios.post(api + '/ownedsurveys/survey/' + survey.id + '/delete')
    .then(response => {
      console.log(response.data.message);
      severity = 'success';
      message = response.data.message;
      setOpenAlert(true);
      window.location.reload();
    }).catch(err => {
      console.error(err.response.data.message);
      severity = 'error';
      message = err.response.data.message;
      setOpenAlert(true);
    });
  }

  const handleExport = event => {
    event.preventDefault();
    axios.get(api + '/ownedsurveys/survey/' + survey.id, {responseType: 'blob'})
    .then(response => {
      fileDownload(response.data, 'exported_survey.json');
    }).catch(err => {
      console.error(err.response.data.message);
      severity = 'error';
      message = err.response.data.message;
      setOpenAlert(true);
    });
  }

  return (
    <React.Fragment>
      <MyAlert open={openAlert} handleClose={handleClose} severity={severity} message={message} />
      <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {survey.title}
        </TableCell>
        <TableCell align='right'>{survey.qCount}</TableCell>
        <TableCell align='right'>{survey.aCount}</TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<PublishIcon />} onClick={handlePublish}>Publish</Button>
        </TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<GetAppIcon />} onClick={handleExport}>Export</Button>
        </TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<EditIcon />} href='/surveys/edit'>Edit</Button>
        </TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<DeleteForeverIcon />} onClick={handleDelete}>Delete</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{margin: 1}}>
              <Typography variant='h6' gutterBottom component='div'>
                Questions
              </Typography>
              <Table size='medium' aria-label='questions'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Title</TableCell>
                    <TableCell align='right'>Type</TableCell>
                    <TableCell align='right'>Required</TableCell>
                    <TableCell align='right'>Options</TableCell>
                    <TableCell align='right'>If Skipped</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {survey.questions.map((question) => (
                    <RowTwo key={question.title} question={question} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const TableOne = () => {
  const [surveys, setSurveys] = React.useState([]);

  React.useEffect(() => {
    axios.get(api + '/ownedsurveys')
    .then(response => setSurveys([...response.data.unpublished]))
    .catch(err => console.error(err));
  }, []);

  return (
    <Table aria-label='collapsible table'>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Survey</TableCell>
          <TableCell align='right'>Questions</TableCell>
          <TableCell align='right'>Total Options</TableCell>
          <TableCell align='right' /> 
          <TableCell align='right' /> 
          <TableCell align='right' /> 
          <TableCell align='right' /> 
        </TableRow>
      </TableHead>
      <TableBody>
        {surveys.map((survey) => (
          <RowOne key={survey.id} survey={survey} />
        ))}
      </TableBody>
    </Table>
  )
}

const TableSurvey = () => {
  return (
    <TableContainer component={Paper}>
      <TableOne />
    </TableContainer>
  )
}

export default TableSurvey