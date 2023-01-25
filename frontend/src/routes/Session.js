import { Container, FormControl, FormControlLabel, Paper, RadioGroup, Typography, Radio, ThemeProvider, CssBaseline, Box, Button, TextField } from '@mui/material'
import React from 'react'
import theme from '../theme'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const answers = ['yes', 'no', 'dont kno']
const textBox = true;

const Session = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='md' sx={{mt: 4}}>
        <Paper variant='outlined' sx={{mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
          <Typography component='h1' variant='h6' align='center'>
            {'<'}Question Title{'>'}
          </Typography>
          <form onSubmit={null}>
            {
              textBox ? 
                <Box sx={{pt: 2}}>
                  <TextField name='answer' id='answer' label='Answer' multiline fullWidth sx={{pt: 0}} />
                </Box> :
                <FormControl>
                  <RadioGroup name='answers' value={value} onChange={handleChange}>
                    {answers.map((answer) => <FormControlLabel key={answer} value={answer} label={answer} control={<Radio />} />)}
                  </RadioGroup>
                </FormControl>
            }
          </form>
        </Paper>
      </Container>
      <Container maxWidth='md' sx={{pt: 2}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Button startIcon={<ArrowBackIosNewIcon />} variant='outlined' size='large'>Previous Question</Button>
          <Button endIcon={<ArrowForwardIosIcon />} variant='contained' size='large'>Next Question</Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Session