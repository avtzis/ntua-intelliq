import React from 'react'
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import theme from '../theme'
import axios from 'axios';
import api from '../utilities/api';

const Home = () => {
  const [surveys, setSurveys] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [role, setRole] = React.useState('');

  React.useEffect(() => {
    axios.get(api + '/surveys')
    .then(response => setSurveys([...response.data]))
    .catch(err => console.error(err));

    axios.get(api + '/verifyLogin')
    .then(response => {
      setLoggedIn(response.data.loggedIn);
      setRole(response.data.role);
    }).catch(err => {
      setLoggedIn(false);
      console.error(err.response.data.message);
    })
  }, []);

  return (
    <Container maxWidth='sm' sx={{pt: '25px'}}>
      <Grid container spacing={4}>
        {surveys.map((survey) => (
          <Grid item xs={12} sm={0} md={0} key={survey.id}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
              <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant='h5' align='center'>
                  {survey.title}
                </Typography>
                <Typography variant='body1'>
                  {survey.about}
                </Typography>
                <Typography sx={{pt: '10px', mb: -2}} variant='subtitle2'>
                  Provided by: {survey.administrator.corporation}
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth size='large' theme={theme} variant='contained' href={loggedIn ? 'session/' + survey.id : 'login'} disabled={role === 'admin'}>
                  Take Survey
                </Button>
              </CardActions>
              <CardContent sx={{my: -3}}>
                <Typography variant='caption'>
                  keywords: {survey.keywords.map(keyword => keyword.title + (survey.keywords.indexOf(keyword) === survey.keywords.length-1 ? '' : ','))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home