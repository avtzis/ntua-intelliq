import { Grid, Stack } from '@mui/material'
import { Container, Paper, Typography, Box, Button } from '@mui/material'
import React from 'react'
import theme from '../theme'
import TableSurvey from '../components/TableSurvey'
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import TableSurveyPublished from '../components/TableSurveyPublished'
import axios from 'axios'
import api from '../utilities/api'
import fileDownload from 'js-file-download'
import MyAlert from '../components/MyAlert'

let severity = 'error';
let message = '';

const Surveys = () => {
  const [openAlert, setOpenAlert] = React.useState(false)

  const handleExportPublished = event => {
    event.preventDefault();
    axios.get(api + '/ownedsurveys/exportPublished', {responseType: 'blob'})
    .then(response => {
      fileDownload(response.data, 'exported_published.json');
    }).catch(err => {
      console.error(err.response.data.message);
      message = err.response.data.message;
      setOpenAlert(true);
    });
  }

  const handleExportUnpublished = event => {
    event.preventDefault();
    axios.get(api + '/ownedsurveys/exportUnpublished', {responseType: 'blob'})
    .then(response => {
      fileDownload(response.data, 'exported_unpublished.json');
    }).catch(err => {
      console.error(err.response.data.message);
      message = err.response.data.message;
      setOpenAlert(true);
    });
  }

  const handleClose = () => {
    setOpenAlert(false);
  }

  return (
    <React.Fragment>
      <MyAlert open={openAlert} handleClose={handleClose} severity={severity} message={message} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Container maxWidth='lg' sx={{mt: 4, mb: 4}}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Box sx={{pb: '15px'}}>
                <Stack justifyContent='space-between' direction='row'>
                    <Typography component="h2" variant="h6" gutterBottom theme={theme}>
                      Published Surveys
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', '& button': {m: 1}}}>
                      <Button theme={theme} startIcon={<GetAppIcon />} onClick={handleExportPublished}>
                        Export All
                      </Button>
                    </Box>
                </Stack>
              </Box>
              <TableSurveyPublished />
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth='lg' sx={{mt: 4, mb: 4}}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Box sx={{pb: '15px'}}>
                <Stack justifyContent='space-between' direction='row'>
                    <Typography component="h2" variant="h6" gutterBottom theme={theme}>
                      Unpublished Surveys
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', '& button': {m: 1}}}>
                      <Button theme={theme} href='/surveys/create' startIcon={<AddIcon />}>
                        Create
                      </Button>
                      <Button theme={theme} startIcon={<GetAppIcon />} onClick={handleExportUnpublished}>
                        Export All
                      </Button>
                    </Box>
                </Stack>
              </Box>
              <TableSurvey />
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Surveys;