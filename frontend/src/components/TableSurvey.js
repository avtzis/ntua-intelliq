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

const rows = [
  {
    title: 'Survey 1',
    qCount: 3,
    aCount: 7,
    uaCount: 19,
    questions: [
      {
        qTitle: 'question 1',
        qType: 'profile',
        qRequired: false,
        qaCount: 2,
        answers: [
          {
            aTitle: 'answer 1',
            aType: 'options',
            nextQuestion: 'question 2',
            unique: 9
          },
          {
            aTitle: 'answer 2',
            aType: 'options',
            nextQuestion: 'question 2',
            unique: 9
          }
        ]
      },
      {
        qTitle: 'question 2',
        qType: 'question',
        qRequired: true,
        qaCount: 1,
        answers: [
          {
            aTitle: '<*>',
            aType: 'options',
            nextQuestion: 'question 3',
            unique: 9
          }
        ]
      },
      {
        qTitle: 'question 3',
        qType: 'question',
        qRequired: true,
        qaCount: 2,
        answers: [
          {
            aTitle: 'answer 1',
            aType: 'options',
            nextQuestion: 'end',
            unique: 10
          },
          {
            aTitle: 'answer 2',
            aType: 'options',
            nextQuestion: 'end',
            unique: 9
          }
        ]
      }
    ]
  },
  {
    title: 'Survey 2',
    qCount: 3,
    aCount: 7,
    uaCount: 19,
    questions: [
      {
        qTitle: 'question 1',
        qType: 'profile',
        qRequired: false,
        qaCount: 2,
        answers: [
          {
            aTitle: 'answer 1',
            aType: 'options',
            nextQuestion: 'question 2',
            unique: 9
          },
          {
            aTitle: 'answer 2',
            aType: 'options',
            nextQuestion: 'question 2',
            unique: 9
          }
        ]
      },
      {
        qTitle: 'question 2',
        qType: 'question',
        qRequired: true,
        qaCount: 2,
        answers: [
          {
            aTitle: 'answer 1',
            aType: 'options',
            nextQuestion: 'question 3',
            unique: 9
          },
          {
            aTitle: 'answer 2',
            aType: 'options',
            nextQuestion: 'question 3',
            unique: 10
          }
        ]
      },
      {
        qTitle: 'question 3',
        qType: 'question',
        qRequired: true,
        qaCount: 2,
        answers: [
          {
            aTitle: 'answer 1',
            aType: 'options',
            nextQuestion: 'end',
            unique: 10
          },
          {
            aTitle: 'answer 2',
            aType: 'options',
            nextQuestion: 'end',
            unique: 9
          }
        ]
      }
    ]
  }
]

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
        <TableCell component='th' scope='row'>{question.qTitle}</TableCell>
        <TableCell align='right'>{question.qType}</TableCell>
        <TableCell align='right'>{question.qRequired ? <CheckIcon /> : <CloseIcon />}</TableCell>
        <TableCell align='right'>{question.qaCount}</TableCell>
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
                    <TableRow key={answer.aTitle}>
                      <TableCell component='th' scope='row'>{answer.aTitle}</TableCell>
                      <TableCell align='right'>{answer.nextQuestion}</TableCell>
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

const RowOne = (props) => {
  const {row} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.title}
        </TableCell>
        <TableCell align='right'>{row.qCount}</TableCell>
        <TableCell align='right'>{row.aCount}</TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<PublishIcon />}>Publish</Button>
        </TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<GetAppIcon />}>Export</Button>
        </TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<EditIcon />} href='/surveys/edit'>Edit</Button>
        </TableCell>
        <TableCell align='right'>
          <Button theme={theme} startIcon={<DeleteForeverIcon />}>Delete</Button>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.questions.map((question) => (
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
        {rows.map((row) => (
          <RowOne key={row.title} row={row} />
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