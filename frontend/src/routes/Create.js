import React from 'react'
import { Container, CssBaseline, Paper, ThemeProvider, Typography, Grid, TextField, Box, Button, FormControlLabel, Checkbox, Autocomplete, Stack, IconButton } from '@mui/material'
import theme from '../theme'
import AnswerType from '../components/AnswerType'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ClearIcon from '@mui/icons-material/Clear';
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
    const [questionBoxes, setQuestionBoxes] = React.useState([]);

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
                                    openOnFocus
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
                            <AnswerType boxes={questionBoxes} box={(questionBoxes.findIndex((id) => id === box) + 1)}/>
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