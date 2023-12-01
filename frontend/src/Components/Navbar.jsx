import React from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{ background: '#146e87' }}>
    <Link to={'/'} style={{textDecoration:'none',color:'#fff'}}><Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="#146e87"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuBookIcon />
      </IconButton>
      <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
      
      ICT Internship Portal
      </Typography>
     
      
    </Toolbar></Link>
  </AppBar>
  </Box>
  )
}

export default Navbar