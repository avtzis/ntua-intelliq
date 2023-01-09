import React from 'react'
import { Autocomplete, TextField, Grid, Button, Container, Paper, Box, IconButton, Stack } from '@mui/material';
import NextQuestionEdit from './NextQuestionEdit';
import theme from '../theme';
import ClearIcon from '@mui/icons-material/Clear';

const AnswerTypeOptions = ['Options', 'Textbox'];

const AnswerTypeEdit = (props) => {
  const {boxes, box, question} = props;
  let initAnswers =[];
  for(let i in question.options) initAnswers.push(i+1)

  const [value, setValue] = React.useState(question.aType);
  const [answerBoxes, setAnswerBoxes] = React.useState(initAnswers);

  const handleAddAnswer = () => {
    const lastElement = answerBoxes[answerBoxes.length - 1];
    const key = lastElement ? lastElement + 1: 1;
    let newBoxes = [...answerBoxes];
    newBoxes.push(key);
    setAnswerBoxes(newBoxes)
  }
  const handleDeleteAnswer = (key) => {
    const boxes = answerBoxes.filter(id => id !== key);
    setAnswerBoxes(boxes);
  }

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
            <Autocomplete 
                value={value}
                onChange={(event, newValue) => {setValue(newValue)}}
                disablePortal
                openOnFocus
                disableClearable
                id='answer-type'
                options={AnswerTypeOptions}
                sx={{/* width: 300 */}}
                renderInput={(params) => <TextField {...params} label='Answer Type' />}
            />
        </Grid>
        {
            value === 'Textbox' ? 
                <NextQuestionEdit boxes={boxes} box={box} option={question.options[0]}/> :
                value === 'Options' ?
                    <Grid item xs={12}>
                        <Container maxWidth='md'>
                            <Paper variant='outlined' sx={{ my: { xs: 1, md: 2 }, pr: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
                                <Grid container spacing={2}>
                                    {
                                        answerBoxes.map((boxKey) => 
                                            <React.Fragment key={boxKey}>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction='row' justifyContent='flex-start' alignItems='baseline'>
                                                        <IconButton aria-label='delete-option' onClick={() => handleDeleteAnswer(boxKey)}>
                                                            <ClearIcon />
                                                        </IconButton>
                                                        <TextField
                                                            name='aTitle'
                                                            id='aTitle'
                                                            label='Title'
                                                            fullWidth
                                                            autoFocus
                                                            required
                                                            value={question.options[boxKey-1]}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <NextQuestionEdit boxes={boxes} box={box} option={question.options[boxKey-1]}/>
                                            </React.Fragment>
                                        )
                                    }
                                    <Grid item xs={12}>                                        
                                        <Box sx={{alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', /* pt: 2, mx: 2 */}}>
                                            <Button variant='outlined' theme={theme} onClick={handleAddAnswer} /* fullWidth */>
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