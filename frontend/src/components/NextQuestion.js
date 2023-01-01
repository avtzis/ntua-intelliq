import React from 'react'
import { Autocomplete, TextField, Grid } from '@mui/material';

const NextQuestion = (props) => {
    const {boxes, box} = props;

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
            <Autocomplete 
                disablePortal
                id='type'
                options={boxes}
                sx={{/* width: 300 */}}
                renderInput={(params) => <TextField {...params} label='Next Question' />}
                getOptionDisabled={(option) => option <= box}
            />
        </Grid>
    </React.Fragment>
  )
}

export default NextQuestion