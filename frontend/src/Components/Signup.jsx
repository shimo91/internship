import * as React from 'react';
import {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // State to manage form errors
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // Function to handle input changes and update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Function to perform form validation
  const validateForm = () => {
    const errors = {};
    // Add validation rules for each field
    if (formData.firstName.trim() === '') {
      errors.firstName = 'First Name is required';
    }

    if (formData.lastName.trim() === '') {
      errors.lastName = 'Last Name is required';
    }

    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    // Add phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    // Add password validation
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    console.log("errors",errors)
    console.log("form errors",formErrors)

    // Return true if there are no errors, false otherwise
    return Object.values(errors).every((error) => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("form data",data)
    const formData = {
      username: data.get('email'),
      password: data.get('password'),
      phone: data.get('number'),
      first_name: data.get('firstName'),
      last_name: data.get('lastName')
    }
    if(!formErrors.email && !formErrors.password && !formErrors.phoneNumber && !formErrors.firstName && !formErrors.lastName ){
       try {   
        const response = await axios.post('http://localhost:4000/signup', formData)
        alert(response.data.message)
        navigate('/login')
      } catch (error) {
        console.log("error", error)
        alert(error.response.data.message)
      }
    }
    // setFormData({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phoneNumber: '',
    //   password: '',
    // })

  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <div className='signup'>
        <Box
          sx={{
            pt:6,
            pb: 10,
          }}
        >
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify:"center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#146e87' }}>
            <LockOutlinedIcon sx={{color: (255,255,255)}} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
              <Alert severity="info">ICTAK students please make sure to sign up with the email address that has been already given</Alert>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone-number"
                  onChange={handleInputChange}
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}
                />
              </Grid>
{/* made changes here */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
{/* change ends here */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#146e87', color: (255,255,255) }}
              onClick={()=>validateForm() && handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
              
              <Button sx={{color: '#f9fbe7'}} style={{textTransform: 'none'}} href="/login">
              Already have an account? Sign in
              </Button>
              
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
       </Box>
      </div>
      <Box style={{ background: '#146e87' }} component="footer">
        <Typography variant="h6" align="center" gutterBottom color="#f9fbe7" p={2} style={{fontSize:'14px'}}>
        {'Copyright © '} 2023 ICT_Internship,Inc.
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="#f9fbe7"
          component="p"
        >
        </Typography>
       
      </Box>
    </ThemeProvider>
  );
}