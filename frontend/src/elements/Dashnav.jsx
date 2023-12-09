import { Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Listitems, { mainListItems, secondaryListItems } from '../elements/Listitems'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { jwtDecode } from "jwt-decode";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

const Dashnav = (props) => {


  const { stdname } = useData();
    

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    
  return (
    <>
    <AppBar position="absolute" open={open}>
        <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              backgroundColor:'#146e87'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {props.title}
            </Typography>
            <Typography sx={{ marginRight:1 }}>{stdname}</Typography> 
            <Tooltip title="Logout">
            <IconButton color="inherit" >
              <Badge color="secondary">
               <Link to={'/logout'} style={{textDecoration:'none',color:'white'}} ><LogoutIcon /></Link>
              </Badge>
            </IconButton>
            </Tooltip>
          </Toolbar>
    </AppBar>
     <Drawer variant="permanent" open={open}>
     <Toolbar
       sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'flex-end',
         px: [1],
       }}
     >
       <IconButton onClick={toggleDrawer}>
         <ChevronLeftIcon />
       </IconButton>
     </Toolbar>
     <Divider />
     <List component="nav">
       {/* {mainListItems}
       <Divider sx={{ my: 1 }} />
       {secondaryListItems} */}
       <Listitems/>
     </List>
   </Drawer>
   </>
  )
}

export default Dashnav
