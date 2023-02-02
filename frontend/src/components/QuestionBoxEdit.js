import React from 'react'
import {MenuItem, TextField, Grid, IconButton, Box, Typography, Container, Stack, Paper} from '@mui/material'
import AnswerTypeEdit from '../components/AnswerTypeEdit'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ClearIcon from '@mui/icons-material/Clear';
import RequirementEdit from '../components/RequirementEdit';

const types = ['Question', 'Profile'];

const QuestionBoxEdit = props => {
  const {questionBoxes, box} = props;
  const [title, setTitle] = React.useState(box.title);
  const [type, setType] = React.useState(box.type.charAt(0).toUpperCase() + box.type.slice(1));

  return (
    <Container component='main' maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Stack justifyContent='space-between' direction='row'>
          <Box />
          <Typography variant='h5' align='center'>
            {'Question ' + (questionBoxes.findIndex((id) => id === box) + 1)}
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end'/* , '& button': {m: 1} */}}>
            <IconButton aria-label='move-up' disabled>
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton aria-label='move-down' disabled>
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton aria-label='delete' disabled>
              <ClearIcon />
            </IconButton>
          </Box>
      </Stack>
      <Grid container spacing={3} sx={{pt: '15px'}}>
        <Grid item xs={12}>
          <TextField
            name={'question' + questionBoxes.findIndex((id) => id === box) + '-title'}
            id='question-title'
            label='Title'
            fullWidth
            required
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            name={'question' + questionBoxes.findIndex((id) => id === box) + '-type'}
            label='Type'
            id='type'
            sx={{/* width: 300 */}}
            select
            fullWidth
            value={type}
            onChange={event => setType(event.target.value)}
          >
            {types.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <RequirementEdit boxes={questionBoxes} box={(questionBoxes.findIndex((id) => id === box) + 1)} value={box.required === 'true' ? true : false} valueNext={questionBoxes.indexOf(questionBoxes.filter(question => question.title === (box.ifSkippedNextQuestion ? box.ifSkippedNextQuestion.title : ''))[0]) + 1} />
        <AnswerTypeEdit boxes={questionBoxes} box={(questionBoxes.findIndex((id) => id === box) + 1)} answers={box.answers} question={box} />
        </Grid>
      </Paper>
  </Container>
  )
}

export default QuestionBoxEdit