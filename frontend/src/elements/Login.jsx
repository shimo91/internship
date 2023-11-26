import { Box, Button, TextField } from '@mui/material';
import '../css/style.css'
import React from 'react';
import { Grid} from '@mui/material'
import Typography from '@mui/material/Typography';


const Login = () => {
    
    return(
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
   <Button variant="contained" className='buttonStyleMui' sx={{ backgroundColor: '#00838f' }}>Login</Button>
   </div>
   </Grid>
   <Grid item xs={6}>
   <div className="bg-img"></div>
   </Grid>
   </Grid>
      
        </Box>
      </div>
    );

}
  export default Login;