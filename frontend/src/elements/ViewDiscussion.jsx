import { Alert, Avatar, Box, Button, Card, CardContent, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useData } from '../context/DataContext';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';

const ViewDiscussion = () => {

  const navigate = useNavigate();
  //var { dataId } = useData();
  //console.log("id is :"+dataId);
  const { id } = useParams();

  const [list,setlist]=useState([]);

  useEffect(()=>{

    axios.get('http://127.0.0.1:4000/discussion/get/'+id).then((res)=>{
      setlist(res.data);
      console.log("list of discussion : "+res.data);
    })
  },[]);

   //console.log("list : "+list);
   const [open, setOpen] = React.useState(false);

   const [comData, setData] = useState('');
   const inputHandler = (e)=>{
      setData({...comData,[e.target.name]:e.target.value});
    }

    const addHandler = ()=>{
      console.log('clicked addHandler : ');
      const dataToSend = {
        ...comData,
        discussionid: id,
        // other data if needed
      };
      axios.post('http://127.0.0.1:4000/comment/add',dataToSend).then((res)=>{
          //alert(res.data.message);
          if(res.data.message==="saved")
          {
            setOpen(true);

            setTimeout(() => {
              setOpen(false);
              window.location.reload();
            }, 1000);
             
          }
          else{
              alert("Invalid");
          }
          }).catch(()=>{
              console.log('Error!! No connection');
              alert('Invalid');
          })
      
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [comlist,setcomlist]=useState([]);

  useEffect(()=>{

    axios.get('http://127.0.0.1:4000/comment/get/'+id).then((res)=>{
      setcomlist(...comlist,res.data);
      console.log(comlist);
    })
  },[]);

  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" paddingTop={'20px'} >
      <Grid item xs={12} md={12} lg={12}  >
      {list ? (
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="h4">
            {list.title}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
            {/* {ReactHtmlParser(list.description)} */}
            <div dangerouslySetInnerHTML={{ __html: list.description }} />
            </Typography>
          </CardContent>

        </Card>
         ) : (
          <p>Loading...</p>
        )}
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Typography component="h6" fontWeight={'bold'} textAlign={'left'}>Comments</Typography>
          <TextField fullWidth multiline rows={4}  id="fullWidth" name='comment' onChange={inputHandler} label="write some of your comments" sx={{ mt: 2 }}  />
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={12} textAlign={'right'}>
        <Button variant='contained' sx={{ mt: 2 }} className='commonButton' onClick={addHandler} >Post Comment</Button>
      </Grid>
      <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert 
                
                sx={{ mb: 2 }}
                >
                Added Successfully
                </Alert>
            </Collapse>
            
        </Box>
      <Grid item xs={12} md={12} lg={12} textAlign={'right'}>
      {comlist ? (

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {comlist.map((row,i) => (
                <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="" src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Link to={'/viewdiscussion'} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                      {row.comment}
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
                      <MenuItem sx={{ color: blue[500] }}><EditIcon />Reply</MenuItem>
                      <MenuItem onClick={handleClose} sx={{ color: red[500] }}><DeleteOutlinedIcon />Delete</MenuItem>
                    </Menu>
                  </ListItemIcon>

                </ListItem>
                <Divider variant="inset" component="li" />
                </>
              ))}
              </List>
              ) : (
                <p>Loading...</p>
              )}
      </Grid>
    </Grid>
  )
}

export default ViewDiscussion
