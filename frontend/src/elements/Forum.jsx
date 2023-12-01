import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from 'react-router-dom';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { indigo } from '@mui/material/colors';
import axios from 'axios';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};


const Forum = () => {

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [list,setlist]=useState([]);

  useEffect(()=>{

    axios.get('http://127.0.0.1:4000/discussion/getUserlist').then((res)=>{
      setlist(...list,res.data);
      console.log(list);
    })
  },[]);

  const [mylist,setmylist]=useState([]);

  useEffect(()=>{

    axios.get('http://127.0.0.1:4000/discussion/getmylist').then((res)=>{
      setmylist(...mylist,res.data);
      console.log(mylist);
    })
  },[]);


  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" paddingTop={'20px'}>
      <Grid item xs={12} md={12} lg={12}>
        <Link to={'/discussion'}><Button variant="contained" className='commonButton'>
          Start a Discussion
        </Button></Link>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>

        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="posts"
          >

            <Tab label="My Posts" />
            <Tab label="All Posts" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
             mylist ? (
            <Box>
               
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {mylist.map((rows,i) => (
                <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="" src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Link to={`/viewdiscussion/${rows._id}`} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                     {rows.title}
                     </Link>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {rows.username}
                        </Typography>
                       
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
                      <Link to={`/viewdiscussion/${rows._id}`} style={{ textDecoration: 'none' }}>
                        <MenuItem color="primary" sx={{ color: green[500] }}><VisibilityIcon />View</MenuItem>
                      </Link>
                      <Link to={'/discussion'} style={{ textDecoration: 'none' }}>
                        <MenuItem sx={{ color: blue[500] }}><EditIcon />Edit</MenuItem>
                      </Link>
                      <MenuItem onClick={handleClose} sx={{ color: red[500] }}><DeleteOutlinedIcon />Delete</MenuItem>
                    </Menu>
                  </ListItemIcon>

                </ListItem>
                <Divider variant="inset" component="li" />
                </>
                ))}
              </List>

            </Box>
          ) : (
            <p>Loading...</p>
          )
          )}
          {tabIndex === 1 && (
             list ? (
            <Box>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {list.map((row,i) => (
                <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Link to={`/viewdiscussion/${row._id}`} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                      {row.title}
                    </Link>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {row.username}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                </>
              ))}
              </List>
            </Box>
            ) : (
              <p>Loading...</p>
            )
          )}
          
        </Box>



      </Grid>
    </Grid>
  )
}

export default Forum
