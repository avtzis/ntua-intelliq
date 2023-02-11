import React from 'react'
import { Container, CssBaseline, Paper, ThemeProvider, Typography, Grid, TextField, Box, Button, Stack, IconButton, MenuItem } from '@mui/material'
import theme from '../theme'
import AnswerType from '../components/AnswerType'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ClearIcon from '@mui/icons-material/Clear';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import api from '../utilities/api'
import Requirement from '../components/Requirement';
import MyAlert from '../components/MyAlert';

const types = ['Question', 'Profile'];

let severity = 'success';
let message = '';

const Create = () => {
    const [questionBoxes, setQuestionBoxes] = React.useState([]);
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleClose = () => setOpenAlert(false);

    const handleAdd = () => {
        const key =  uuidv4();
        let boxes = [...questionBoxes];
        boxes.push(key);
        setQuestionBoxes(boxes);
    }
    const handleDelete = (key) => {
        const boxes = questionBoxes.filter(id => id !== key);
        setQuestionBoxes(boxes);
    }
    const handleUp = (key) => {
        const index = questionBoxes.indexOf(key);
        if(index > 0) {
            let boxes1 = questionBoxes.slice(0, index);
            let boxes2 = questionBoxes.slice(index);

            const elem1 = boxes1.pop();
            const elem2 = boxes2.shift();

            boxes1.push(elem2);
            boxes2.unshift(elem1);

            const boxes = boxes1.concat(boxes2);
            setQuestionBoxes(boxes);
        }
    }
    const handleDown = (key) => {
        const index = questionBoxes.indexOf(key);
        if(index > -1 && index < questionBoxes.length - 1) {
            let boxes1 = questionBoxes.slice(0, index + 1);
            let boxes2 = questionBoxes.slice(index + 1);

            const elem1 = boxes1.pop();
            const elem2 = boxes2.shift();

            boxes1.push(elem2);
            boxes2.unshift(elem1);

            const boxes = boxes1.concat(boxes2);
            setQuestionBoxes(boxes);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);

        let keywords = data.get('keywords').toLowerCase().split(',');
        for(let i in keywords) keywords[i] = keywords[i].trim();
        if(keywords[0] === '') keywords = [];

        let questions = [];
        for(let i=0; true; ++i) {
            const qTitle = data.get('question' + i + '-title');
            if(!qTitle) break;

            let qType = data.get('question' + i + '-type').toLowerCase();
            if(!qType) qType = 'question';

            let required = data.get('question' + i + '-required');
            required = required === 'on' ? 'true' : 'false';

            let nextQuestionIfSkipped = null;
            if(required === 'false') {
                nextQuestionIfSkipped = data.get('question' + i + '-next-if-skipped');
                if(nextQuestionIfSkipped === 'end') nextQuestionIfSkipped = '0';
                else nextQuestionIfSkipped--;
            }

            let answerType = data.get('question' + i + '-answer-type').toLowerCase();

            let answers = [];
            for(let j=0; true; ++j) {
                if(answerType !== 'options') {
                    const aTitle = '<open string>';

                    let nextQuestion = data.get('question' + i + '-answer0-next');
                    if(!nextQuestion || nextQuestion === 'end') nextQuestion = '0';
                    else nextQuestion--;

                    answers.push({
                        title: aTitle,
                        nextQuestion
                    });
                    break;
                } else {
                    const aTitle = data.get('question' + i + '-answer' + j + '-title');
                    if(!aTitle) break;

                    let nextQuestion = data.get('question' + i + '-answer' + j + '-next');
                    if(nextQuestion === 'end') nextQuestion = '0';
                    else nextQuestion--;

                    answers.push({
                        title: aTitle,
                        nextQuestion
                    });
                }

            }

            questions.push({
                title: qTitle,
                type: qType,
                required,
                answerType,
                nextQuestionIfSkipped,
                answers
            });
        }

        let myData = {
            questionnaireTitle: data.get('title'),
            about: data.get('about'),
            keywords,
            questions
        }

        console.log(myData);
        axios.post(api + '/ownedsurveys/createSurvey', myData)
        .then(response => {
            console.log(response.data.message);
            severity = 'success';
            message = response.data.message;
            setOpenAlert(true);
            window.location.href='/surveys';
        }).catch(err => {
            console.error(err.response.data.message);
            severity = 'error';
            message = err.response.data.message;
            setOpenAlert(true);
        });
    }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyAlert open={openAlert} handleClose={handleClose} severity={severity} message={message} />
        <form onSubmit={handleSubmit}>
            <Container component='main' maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Create New Survey
                    </Typography>
                    <Grid container spacing={3} sx={{pt: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                name='title'
                                id='title'
                                label='Title'
                                fullWidth
                                autoFocus
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='about'
                                id='about'
                                label='About'
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='keywords'
                                id='keywords'
                                label='Keywords'
                                fullWidth
                                helperText='Seperated by commas'
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            {questionBoxes.map((box) =>
                <Container key={box} component='main' maxWidth="md" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Stack justifyContent='space-between' direction='row'>
                            <Box />
                            <Typography variant='h5' align='center'>
                                {'Question ' + (questionBoxes.findIndex((id) => id === box) + 1)}
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end'/* , '& button': {m: 1} */}}>
                                <IconButton aria-label='move-up' onClick={() => handleUp(box)}>
                                    <ArrowUpwardIcon />
                                </IconButton>
                                <IconButton aria-label='move-down' onClick={() => handleDown(box)}>
                                    <ArrowDownwardIcon />
                                </IconButton>
                                <IconButton aria-label='delete' onClick={() => handleDelete(box)}>
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
                                    autoFocus
                                    required
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
                                >
                                    {types.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Requirement boxes={questionBoxes} box={(questionBoxes.findIndex((id) => id === box) + 1)} />
                            <AnswerType boxes={questionBoxes} box={(questionBoxes.findIndex((id) => id === box) + 1)} />
                        </Grid>
                    </Paper>
                </Container>
            )}
            <Container maxWidth='md'>
                <Box sx={{alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', '& button': {m: 1}}}>
                    <Button variant='outlined' theme={theme} onClick={handleAdd}>
                        Add Question
                    </Button>
                    <Button variant='contained' theme={theme} type='submit'>
                        Done
                    </Button>
                </Box>
            </Container>
        </form>
    </ThemeProvider>
  )
}

export default Create