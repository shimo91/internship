import { AppBar, Box, Button, IconButton, TextField, Toolbar } from '@mui/material';
import '../css/style.css'
import React from 'react';
import { Grid} from '@mui/material'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Login = () => {
    
    return(
      <div>
<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="#00838f"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
          ICT Internship Portal
          </Typography>
          <Button color="inherit"><Link to={'/'} style={{textDecoration:'none',color:'white'}}>Home</Link></Button>
          <Button color="inherit"><Link to={'/signup'} style={{textDecoration:'none',color:'white'}}>Register</Link></Button>
          
        </Toolbar>
      </AppBar>
      </Box>



    <div className='EmpForm'>
    <Box
    component="form"
    sx={{
        '& .MuiTextField-root': { m: 2, width: '50ch' },padding:'3%'
    }}
    autoComplete="off"
    noValidate
    >
    
    <Grid container spacing={2} >
      <Grid item xs={6}>
       <Typography
              component="h1"
              variant="h2"
              align="center"
              color="#00838f"
              gutterBottom
              fontFamily={'Brush Script MT'}
            >
              Welcome Back ..!!
            </Typography> 
     </Grid>
   </Grid>
   
   <Grid container spacing={2} >
   <Grid item xs={6}>
   <TextField
              className='textFieldStyleMui'
              id="standard-basic"
              variant="standard"
              label="Email"
              name='email' 
             
            />
            <br /><br /><br />
            <TextField
              className='textFieldStyleMui'
              id="standard-basic"
              variant="standard"
              label="Password"
              type='password'
              name='password'
               
            /> <br /><br /><br />
   <div style={{paddingLeft:"2%"}}>
   <Button variant="contained" className='buttonStyleMui' sx={{ backgroundColor: '#00838f' }}>
   <Link to={'/dashboard'} style={{textDecoration:'none',color:'white'}}>Login</Link>
    </Button>
   </div>
   </Grid>
   <Grid item xs={6}>
   <div className="bg-img"></div>
   </Grid>
   </Grid>
      
        </Box>
      </div>
      </div>
    );

}
  export default Login;