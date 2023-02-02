import React from 'react'
import { TextField, Grid, Button, Container, Paper, Box, MenuItem } from '@mui/material';
import NextQuestionEdit from './NextQuestionEdit';
import theme from '../theme';
import AnswerEdit from './AnswerEdit';

const AnswerTypeOptions = ['Options', 'Open Text'];

const AnswerTypeEdit = (props) => {
  const {boxes, box, answers, question} = props;

  let value = question.answerType === 'options' ? 'Options' : 'Open Text';

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
            <TextField
                value={value}
                name={'question' + (box-1) + '-answer-type'}
                id='answer-type'
                label='Answer Type'
                select
                fullWidth
                disabled
                required
            >
                {AnswerTypeOptions.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
        {
            value === 'Open Text' ?
                <NextQuestionEdit boxes={boxes} box={box} ansId={0} valueNext={boxes.indexOf(question => question.id === answers[0].nextQuestion.id) + 1} /> :
                value === 'Options' ?
                    <Grid item xs={12}>
                        <Container maxWidth='md'>
                            <Paper variant='outlined' sx={{ my: { xs: 1, md: 2 }, pr: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
                                <Grid container spacing={2}>
                                    {
                                        answers.map((answer) =>
                                            <React.Fragment key={answer.id}>
                                                <AnswerEdit box={box} answer={answer} answerBox={answers.findIndex(ans => ans === answer)} />
                                                <NextQuestionEdit boxes={boxes} box={box} ansId={answers.findIndex(ans => ans === answer)} valueNext={boxes.indexOf(boxes.filter(question => question.id === (answer.nextQuestion ? answer.nextQuestion.id : ''))[0]) + 1} />
                                            </React.Fragment>
                                        )
                                    }
                                    <Grid item xs={12}>
                                        <Box sx={{alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', pl: 5 /* pt: 2, mx: 2 */}}>
                                            <Button variant='outlined' theme={theme} disabled fullWidth>
                                                Add Option
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Container>
                    </Grid> :
                    null
        }
    </React.Fragment>
  )
}

export default AnswerTypeEdit