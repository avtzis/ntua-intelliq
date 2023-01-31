import React from 'react'
import { TextField, Grid, Button, Container, Paper, Box, IconButton, Stack, MenuItem } from '@mui/material';
import NextQuestion from './NextQuestion';
import theme from '../theme';
import ClearIcon from '@mui/icons-material/Clear';

const AnswerTypeOptions = ['Options', 'Open Text'];

const AnswerType = (props) => {
  const {boxes, box} = props;
  const [value, setValue] = React.useState('');
  const [answerBoxes, setAnswerBoxes] = React.useState([]);

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
            <TextField 
                value={value}
                onChange={(event) => {setValue(event.target.value)}}
                name={'question' + (box-1) + '-answer-type'}
                id='answer-type'
                label='Answer Type'
                select
                fullWidth
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
                <NextQuestion boxes={boxes} box={box} ansId={0} /> :
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
                                                            name={'question' + (box-1) + '-answer' + (boxKey-1) + '-title'}
                                                            id='aTitle'
                                                            label='Title'
                                                            fullWidth
                                                            autoFocus
                                                            required
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <NextQuestion boxes={boxes} box={box} ansId={boxKey-1} />
                                            </React.Fragment>
                                        )
                                    }
                                    <Grid item xs={12}>                                        
                                        <Box sx={{alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', pl: 5 /* pt: 2, mx: 2 */}}>
                                            <Button variant='outlined' theme={theme} onClick={handleAddAnswer} fullWidth>
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

export default AnswerType