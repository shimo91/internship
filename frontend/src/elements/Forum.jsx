import { Avatar, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from 'react-router-dom';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';

const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  

const Forum = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingTop={'20px'}>
        <Grid item xs={12} md={12} lg={12}>
            <Link to={'/discussion'}><Button variant="contained" >
                Start a Discussion
            </Button></Link>
        </Grid>
       <Grid item xs={12} md={12} lg={12}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Link to={'/viewdiscussion'} style={{textDecoration:'none', color:'black',cursor:'pointer'}}>What all technology stack is required to develop a website ?</Link>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — Full stack developer needs to know more than one technology stack …"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Link to={'/viewdiscussion'} style={{textDecoration:'none', color:'black',cursor:'pointer'}}>
            How to Fix 403 Forbbiden Error on your server?</Link>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Hey, I just launched my first website using Linode and I followed some instructions online…"}

              
            </React.Fragment>
          }
        />
       
            
        <ListItemIcon>
          <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={handleMenu}
              >
              <MoreIcon />
          </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to={'/viewdiscussion'} style={{textDecoration:'none'}}>
                  <MenuItem color="primary"sx={{color:green[500]}}><VisibilityIcon/>View</MenuItem>
                </Link>
                <Link to={'/discussion'} style={{textDecoration:'none'}}>
                  <MenuItem  sx={{color:blue[500]}}><EditIcon/>Edit</MenuItem>
                </Link>
                <MenuItem onClick={handleClose} sx={{color:red[500]}}><DeleteOutlinedIcon />Delete</MenuItem>

            </Menu>


        </ListItemIcon>
        
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="How much does it cost for a full stack development?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — what is basic cost for full stack developer & what model available…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </Grid>
    </Grid>
  )
}

export default Forum
