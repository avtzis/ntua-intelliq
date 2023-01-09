import React from 'react'
import { Autocomplete, TextField, Grid } from '@mui/material';

const NextQuestion = (props) => {
    const {boxes, box} = props;
    const options = Array.from({length: boxes.length}, (_, i) => i + 1);
    options.push('end');

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
            <Autocomplete 
                required
                disablePortal
                id='type'
                options={options}
                sx={{/* width: 300 */}}
                renderInput={(params) => <TextField {...params} label='Next Question' />}
                getOptionDisabled={(option) => option <= box}
                openOnFocus
            />
        </Grid>
    </React.Fragment>
  )
}

export default NextQuestion