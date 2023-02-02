import { Checkbox, FormControlLabel, MenuItem, TextField, Grid } from '@mui/material';
import React from 'react'

const Requirement = (props) => {
    const {boxes, box, value, valueNext} = props;
    const [checked, setChecked] = React.useState(value);
    const [next, setNext] = React.useState(valueNext);

    const options = Array.from({length: boxes.length}, (_, i) => i + 1);
    options.push('end');

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6} md={2}>
            <FormControlLabel 
                label='Required' 
                name={'question' + (box-1) + '-required'} 
                control={<Checkbox checked={checked} onChange={handleChange} />}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
            <TextField
                required
                name={'question' + (box-1) + '-next-if-skipped'}
                label='Next Question'
                fullWidth
                select
                helperText={'In case this question is skipped'}
                disabled={checked}
                value={next > 0 ? next : (value ? '' : 'end')}
                onChange={event => setNext(event.target.value)}
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

export default Requirement