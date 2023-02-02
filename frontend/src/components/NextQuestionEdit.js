import React from 'react'
import { TextField, Grid, MenuItem } from '@mui/material';

const NextQuestionEdit = (props) => {
    const {boxes, box, ansId, valueNext} = props;
    const [value, setValue] = React.useState(valueNext);
    const options = Array.from({length: boxes.length}, (_, i) => i + 1);
    options.push('end');

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
            <TextField 
                required
                id='next-question'
                name={'question' + (box-1) + '-answer' + (ansId) + '-next'}
                label='Next Question'
                fullWidth
                select
                value={value < 1 ? 'end' : value}
                onChange={event => setValue(event.target.value)}
            >
              {options.map(option => (
                <MenuItem key={option} value={option} disabled={option <= box ? true : false}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
        </Grid>
    </React.Fragment>
  )
}

export default NextQuestionEdit