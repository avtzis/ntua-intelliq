import React from 'react'
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import theme from '../theme'

const cards = [
  {
    title: 'Survey 1',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    corporation: 'Sheesh Industries',
    keywords: [
      'keyword1',
      'keyword2',
      'keyword3',
      'keyword4'
    ]
  },
  {
    title: 'Survey 2',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu tortor sed est aliquet porttitor ac sed libero.',
    corporation: 'Sheesh Industries',
    keywords: [
      'keyword1',
      'keyword2',
      'keyword3',
      'keyword4'
    ]
  },
  {
    title: 'Survey 3',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu tortor sed est aliquet porttitor ac sed libero. Nunc elit felis, dignissim et dignissim vel, imperdiet et neque.',
    corporation: 'Sheesh Industries',
    keywords: [
      'keyword1',
      'keyword2',
      'keyword3',
      'keyword4'
    ]
  },
  {
    title: 'Survey 4',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu tortor sed est aliquet porttitor ac sed libero. Nunc elit felis, dignissim et dignissim vel, imperdiet et neque. Nam laoreet velit ac orci pulvinar finibus. Donec mattis orci mollis odio scelerisque ullamcorper. Integer mi diam, elementum vel sem vitae, eleifend dictum dolor. Aenean odio diam, bibendum at sollicitudin a, congue eget est. Morbi vitae feugiat arcu. Fusce eget commodo odio. Vivamus ut fermentum velit, eget scelerisque enim. Nunc vulputate dictum ante et ultrices.',
    corporation: 'Sheesh Industries',
    keywords: [
      'keyword1',
      'keyword2',
      'keyword3',
      'keyword4'
    ]
  },
  
]

const Home = () => {
  return (
    <Container maxWidth='ms' sx={{paddingTop: '25px'}}>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
              <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant='h5'>
                  {card.title}
                </Typography>
                <Typography>
                  {card.about}
                </Typography>
                <Typography sx={{paddingTop: '10px'}}>
                  Provided by: {card.corporation}
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth size='large' theme={theme} variant='contained' href='session'>
                  Take Survey
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home