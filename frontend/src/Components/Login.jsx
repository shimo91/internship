import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid} from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
   
    function submitForm() {
      {
        console.log('Entered Username:', username);
        console.log('Entered Password:', password);
        axios.post('http://localhost:4000/login', {username,password})
        .then((res) => {
          alert(res.data.message);
          if (res.data.message === 'success') {
            sessionStorage.setItem("userToken", res.data.token);
            sessionStorage.setItem('username', username)
            console.log(username)
            navigate('/dashboard')
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert('Invalid credentials. Please try again.');
          } else {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
          }
        });
       
      }
    }
    return(<div className='EmpForm'>
    <Box
    component="form"
    sx={{
        '& .MuiTextField-root': { m: 2, width: '50ch' },padding:'3%'
    }}
    autoComplete="off"
    noValidate
    >
    
    <Grid container spacing={10} >
      <Grid item xs={6}>
      <div className='heading'><h2>Welcome Back User!!</h2></div>
     </Grid>
   </Grid>
   
   <Grid container spacing={2} >
   <Grid item xs={6}>
           
       <TextField
              className='textFieldStyleMui'
              id="username"
              name="username"
              value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
             
            />
            <br /><br /><br />

           
      <TextField
              className='textFieldStyleMui'
              type='password'
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
      <br /><br /><br /> 
   <div style={{paddingLeft:"4%"}}>
   <Button variant="contained" className='buttonStyleMui' sx={{ backgroundColor: '#146e87' }} onClick={submitForm}>Login</Button>
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