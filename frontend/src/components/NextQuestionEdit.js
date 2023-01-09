import React from 'react'
import { Autocomplete, TextField, Grid } from '@mui/material';

const NextQuestionEdit = (props) => {
    const {boxes, box, option} = props;
    const options = Array.from({length: boxes.length}, (_, i) => i + 1);
    options.push('end');

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
            <Autocomplete 
                value={/* option.nextQuestion */ 1}
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

export default NextQuestionEdit