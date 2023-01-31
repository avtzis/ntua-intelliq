import React from 'react'
import { TextField, Grid, MenuItem } from '@mui/material';

const NextQuestion = (props) => {
    const {boxes, box, ansId} = props;
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

export default NextQuestion