import React from 'react'
import { Container, CssBaseline, Paper, ThemeProvider, Typography, Grid, TextField, Box, Button } from '@mui/material'
import theme from '../theme'
import axios from 'axios';
import api from '../utilities/api'
import MyAlert from '../components/MyAlert';
import { useParams } from 'react-router-dom';
import QuestionBoxEdit from '../components/QuestionBoxEdit';

let severity = 'success';
let message = '';

const Edit = () => {
    const params = useParams();
    const surveyID = params.surveyID;
    const [questionBoxes, setQuestionBoxes] = React.useState([]);
    const [openAlert, setOpenAlert] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [about, setAbout] = React.useState('');
    const [keywords, setKeywords] = React.useState('');

    React.useEffect(() => {
        axios.get(api + '/ownedsurveys/survey/' + surveyID)
        .then(response => {
            //console.log(response.data);
            setTitle(response.data.title);
            setAbout(response.data.about);

            let myKeywords = '';
            for(let i in response.data.keywords) {
                myKeywords += response.data.keywords[i].title;
                if(i < response.data.keywords.length - 1) myKeywords += ',';
            }
            setKeywords(myKeywords);
            setQuestionBoxes([...response.data.questions])
        }).catch(err => console.error(err.response.data.message));
    }, [surveyID]);

    const handleClose = () => setOpenAlert(false);

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

            let answerType = questionBoxes[i].answerType;

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
        axios.post(api + '/ownedsurveys/survey/' + surveyID + '/update', myData)
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
                        Edit Survey
                    </Typography>
                    <Grid container spacing={3} sx={{pt: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                name='title'
                                id='title'
                                label='Title'
                                fullWidth
                                required
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
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
                                value={about}
                                onChange={event => setAbout(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='keywords'
                                id='keywords'
                                label='Keywords'
                                fullWidth
                                helperText='Seperated by commas'
                                value={keywords}
                                onChange={event => setKeywords(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            {questionBoxes.map((box) =>
                <QuestionBoxEdit questionBoxes={questionBoxes} box={box} key={box.id} />
            )}
            <Container maxWidth='md'>
                <Box sx={{alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', '& button': {m: 1}}}>
                    <Button variant='outlined' theme={theme} disabled>
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

export default Edit