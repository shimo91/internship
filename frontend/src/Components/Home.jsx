import React from 'react'
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';
import '../css/style.css'
import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';


const Home = () => {
  <Typography variant="body2" style={{ background: '#01579b' }} align="center">
      {'Copyright © '}
      <Link style={{ background: '#01579b' }} href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>

const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
  return (
    <Box 
    >
      {/* <ParticlesBg type="circle" bg={true} /> */}
      
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" sx={{ backgroundColor: '#146e87' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="#146e87"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon/>
          </IconButton>
          <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
          ICT Internship Portal
          </Typography>
          
          
        </Toolbar>
      </AppBar>
      </Box>
      
      <main>
      <div className='image'>
        {/* Hero unit */}
        <Box
          sx={{
            //bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <div className='title'  style={{style:"font-size:40px"}} >
              CareerCatalyst
              </div>
            </Typography>
          </Container>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            ></Typography>
          <Typography  align="center" color="text.secondary" paragraph >
            <div className='subtitle'  style={{style:"font-size:40px"}} >
           <h3> Experience the workplace of tomorrow today - our internships provide a glimpse into the future of your career, offering exposure to cutting-edge technologies and industry trends </h3>
            </div>
          </Typography>
          </Container>
         
          <Container maxWidth="sm">
          <Stack direction="row" spacing={8} paddingLeft={'90px'}>
      <Button  variant="contained" startIcon={<HowToRegSharpIcon />} sx={{ backgroundColor: '#146e87' }}  style={{maxWidth: '150px', maxHeight: '50px', minWidth: '150px', minHeight: '50px'}}>
      <Link to={'/signup'} style={{textDecoration:'none',color:'white'}}>
      Signup
        </Link>
      </Button>
      <Button variant="contained" endIcon={<LoginSharpIcon />} sx={{ backgroundColor: '#146e87' }} style={{maxWidth: '150px', maxHeight: '50px', minWidth: '150px', minHeight: '50px'}}>
      <Link to={'/login'} style={{textDecoration:'none',color:'white'}}>
        Login
        </Link>
      </Button>
    </Stack>
          </Container>
          
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            ></Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph >
            <div className='title'  style={{style:"font-size:40px"}} >
           <h2> "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence." - Abigail Adams </h2>
            </div>
          </Typography>
          </Container>
        </Box>
        
</div>

        <h1 className='alumini'>Our Proud Alumini</h1>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              <Grid item  xs={6} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '100%',
                    }}
                    image="https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=600"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Cristina Yang
                    </Typography>
                    <Typography>
                    "I owe a significant part of my career success to the internship in IOT I completed at ICT.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item  xs={6} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '100%',
                    }}
                    image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Merideth Grey
                    </Typography>
                    <Typography>
                    "Interning at ICT was an eye-opening experience. The collaborative environment and mentorship I received helped me apply theoretical knowledge to practical scenarios." 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item  xs={6} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '100%',
                    }}
                    image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Derek Shepered
                    </Typography>
                    <Typography>
                    "The projects I undertook were directly applicable to the job I secured at Google. This internship truly prepared me for the dynamic challenges of the ICT industry"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
          </Grid>
        </Container>
      </main>


      

      {/* Footer */}
      <Box style={{ background: '#01579b' }} component="footer">
        <Typography variant="h6" align="center" gutterBottom color="#f9fbe7" p={2}>
        Copyright <Copyright /> 2023 ICT_Internship,Inc.
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="#f9fbe7"
          component="p"
        >
        </Typography>
       
      </Box>
      {/* End footer */}
    {/* </ThemeProvider> */}
    </Box>
  )
}

export default Home