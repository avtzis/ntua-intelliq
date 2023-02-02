import React from 'react'
import { Grid, Stack, IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const AnswerEdit = (props) => {
  const {box, answer, answerBox} = props;
  const [value, setValue] = React.useState(answer.title);

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6}>
        <Stack direction='row' justifyContent='flex-start' alignItems='baseline'>
          <IconButton aria-label='delete-option' disabled>
            <ClearIcon />
          </IconButton>
          <TextField
            name={'question' + (box-1) + '-answer' + (answerBox) + '-title'}
            id='aTitle'
            label='Title'
            fullWidth
            required
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Stack>
      </Grid>
    </React.Fragment>
  )
}

export default AnswerEdit