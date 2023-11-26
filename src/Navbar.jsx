import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = ({ drawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Student Dashboard
        </Typography>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
          Exit
        </Link>
        <IconButton color="inherit" aria-label="Logout">
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
