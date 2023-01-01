import React from 'react'
import { Autocomplete, TextField, Grid, Button, Container, Paper, Box } from '@mui/material';
import NextQuestion from './NextQuestion';
import theme from '../theme';

const AnswerTypeOptions = ['Options', 'Textbox'];

const AnswerType = (props) => {
  const {boxes, box} = props;
  const [value, setValue] = React.useState(null);
  const [answerBoxes, setAnswerBoxes] = React.useState([]);

  const handleAddAnswer = () => {
    const lastElement = answerBoxes[answerBoxes.length - 1];
    const key = lastElement ? lastElement + 1: 1;
    let newBoxes = [...answerBoxes];
    newBoxes.push(key);
    setAnswerBoxes(newBoxes)
  }

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
            <Autocomplete 
                value={value}
                onChange={(event, newValue) => {setValue(newValue)}}
                disablePortal
                disableClearable
                id='answer-type'
                options={AnswerTypeOptions}
                sx={{/* width: 300 */}}
                renderInput={(params) => <TextField {...params} label='Answer Type' />}
            />
        </Grid>
        {
            value === 'Textbox' ? 
                <NextQuestion boxes={boxes} box={box} /> :
                value === 'Options' ?
                    <Grid item xs={12}>
                        <Container maxWidth='md'>
                            <Paper variant='outlined' sx={{ my: { xs: 1, md: 2 }, p: { xs: 2, md: 3 } }}>
                                <Grid container spacing={2}>
                                    {
                                        answerBoxes.map((box) => 
                                            <React.Fragment key={box}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        name='aTitle'
                                                        id='aTitle'
                                                        label='Title'
                                                        fullWidth
                                                        autoFocus
                                                        required
                                                    />
                                                </Grid>
                                                <NextQuestion boxes={boxes} box={box} />
                                            </React.Fragment>
                                        )
                                    }
                                    <Box sx={{alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', pt: 2, mx: 2}}>
                                        <Button variant='outlined' theme={theme} onClick={handleAddAnswer}>
                                            Add Option
                                        </Button>
                                    </Box>
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