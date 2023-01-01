import React from 'react'
import { Container, CssBaseline, Paper, ThemeProvider, Typography, Grid, TextField, Box, Button, FormControlLabel, Checkbox, Autocomplete } from '@mui/material'
import theme from '../theme'
import AnswerType from '../components/AnswerType'

const Create = () => {
    const [questionBoxes, setQuestionBoxes] = React.useState([]);

    const handleAdd = () => {
        const lastElement = questionBoxes[questionBoxes.length - 1];
        const key =  lastElement ? lastElement + 1 : 1;
        let boxes = [...questionBoxes];
        boxes.push(key);
        setQuestionBoxes(boxes);
    }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
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
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            {questionBoxes.map((box) => 
                <Container key={box} component='main' maxWidth="md" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography variant='h6' align='center'>
                            {'Question ' + box}
                        </Typography>
                        <Grid container spacing={3} sx={{pt: '15px'}}>
                            <Grid item xs={12}>
                                <TextField
                                    name='qTitle'
                                    id='qTitle'
                                    label='Title'
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete 
                                    disablePortal
                                    disableClearable
                                    id='type'
                                    options={['Question', 'Profile']}
                                    sx={{width: 300}}
                                    renderInput={(params) => <TextField {...params} label='Type' />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox />} label='Required' />
                            </Grid>
                            <AnswerType boxes={questionBoxes} box={box}/>
                        </Grid>
                    </Paper>
                </Container>
            )}
            <Container maxWidth='md'>
                <Box sx={{alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', '& button': {m: 1}}}>
                    <Button variant='outlined' theme={theme} onClick={handleAdd}>
                        Add Question
                    </Button>
                    <Button variant='contained' theme={theme} onClick={null}>
                        Done
                    </Button>
                </Box>
            </Container>
    </ThemeProvider>
  )
}

export default Create