import { Container, FormControl, FormControlLabel, Paper, RadioGroup, Typography, Radio, ThemeProvider, CssBaseline, Box, Button, TextField } from '@mui/material'
import React from 'react'
import theme from '../theme'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../utilities/api';

const blank = {
  title: '',
  required: '',
  type: '',
  answerType: '',
  answers: []
};

let flag = true;

const Session = () => {
  const params = useParams();
  const surveyID = params.surveyID;
  const [value, setValue] = React.useState('');
  const [finished, setFinished] = React.useState(false);
  const [question, setQuestion] = React.useState(blank);
  const [previous, setPrevious] = React.useState(false);

  React.useEffect(() => {
    if(flag) {
      flag = false;
      axios.get(api + '/session/' + surveyID)
      .then(response => {
        if(response.data.submitted) window.location.href = '/session/thankyou';
        if(response.data.finished) setFinished(true);
        else setQuestion(response.data);
      }).catch(err => console.error(err.response.data.message));
    }
  }, [surveyID]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNext = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const context = data.get('answer');
    const ans = question.answers.filter(obj => {
      return (obj.title === context || obj.title === '<open string>')
    });
    const id = ans[0].id
    axios.post(api + '/session/' + surveyID + '/submitAnswer', {
      answer: {
        id,
        context,
      }
    }).then(response => {
      setQuestion(blank);
      if(!response.data.finished) setQuestion(response.data);
      else setFinished(true);
      if(!previous) setPrevious(true);
    }).catch(err => console.error(err.response.data.message));
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(api + '/session/' + surveyID + '/submitSurvey')
    .then(response => {
      console.log(response.data.message);
      window.location.href = '/session/thankyou';
    }).catch(err => console.error(err.response.data.message));
  }

  const handleSkip = event => {
    event.preventDefault();
    axios.post(api + '/session/' + surveyID + '/submitAnswer', {
      answer: {
        id: 'skip'
      }
    }).then(response => {
      setQuestion(blank);
      if(!response.data.finished) setQuestion(response.data);
      else setFinished(true);
      if(!previous) setPrevious(true);
    }).catch(err => console.error(err.response.data.message));
  }

  const handlePrevious = event => {
    event.preventDefault();
    //
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <form onSubmit={handleNext}>
        <Container maxWidth='md' sx={{mt: 4}}>
          <Paper variant='outlined' sx={{mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
            {
              finished ? 
                <Typography component='h1' variant='h6' align='center'>
                  Survey is completed. You can now submit.
                </Typography>
              :
                <React.Fragment>
                  <Typography component='h1' variant='h6' align='center'>
                    {question.title}
                  </Typography>
                  {
                    question.answerType === 'open text' ? 
                      <Box sx={{pt: 2}}>
                        <TextField name='answer' id='answer' label='Answer' multiline rows={4} fullWidth required sx={{pt: 0}} />
                      </Box> :
                      <FormControl>
                        <RadioGroup name='answer' value={value} onChange={handleChange}>
                          {question.answers.map((answer) => <FormControlLabel key={answer.id} value={answer.title} label={answer.title} control={<Radio />} />)}
                        </RadioGroup>
                      </FormControl>
                  }
                </React.Fragment>
            }
          </Paper>
        </Container>
        <Container maxWidth='md' sx={{pt: 2}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button startIcon={<ArrowBackIosNewIcon />} variant='outlined' size='large' disabled={!previous} onClick={handlePrevious}>Previous Question</Button>
            {
              finished ?
                <Button variant='contained' size='large' onClick={handleSubmit}>Submit Survey</Button> :                 
                <Box sx={{'& button': {mx: 1}}}>
                  <Button endIcon={<SkipNextIcon />} variant='outlined' size='large' disabled={question.required === 'true'} onClick={handleSkip}>Skip</Button>
                  <Button endIcon={<ArrowForwardIosIcon />} variant='contained' size='large' type='submit'>Next Question</Button>
                </Box>
            }
          </Box>
        </Container>
      </form>
    </ThemeProvider>
  )
}

export default Session;