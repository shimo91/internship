import { Alert, Avatar, Box, Button, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Pagination, PaginationItem, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link, useNavigate } from 'react-router-dom';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { indigo } from '@mui/material/colors';
import axios from 'axios';
import { useData } from '../context/DataContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDiscussion } from '../context/DiscussionContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomPagination from './CustomPagination';
import { jwtDecode } from "jwt-decode";

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};


const Forum = () => {

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };


  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleMenu = (event) => {
  //   //setAnchorEl(event.currentTarget);
  //   setAnchorEl(event.target);
  // };
  
  const token = sessionStorage.getItem("userToken");
    const decodeToken = jwtDecode(token);
    const datauserId = decodeToken.userid;

  //var { datauserId } = useData();

  const [list, setlist] = useState([]);

  useEffect(() => {

    axios.get('http://127.0.0.1:4000/discussion/getUserlist/' + datauserId).then((res) => {
      setlist(...list, res.data);
      //console.log(list);
    })
  }, []);

  const [mylist, setmylist] = useState([]);


  useEffect(() => {

    axios.get('http://127.0.0.1:4000/discussion/getmylist/' + datauserId).then((res) => {
      setmylist(...mylist, res.data);
     // console.log(mylist);
    })
  }, []);


  const [anchorEls, setAnchorEls] = useState(Array(mylist.length).fill(null));

  const handleMenu = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };


  const [open, setOpen] = React.useState(false);


  const [delId, setDelid] = useState('');
  const [dialopen, setDialOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setDelid(id)
    setDialOpen(true);
  };

  const handleDialClose = () => {
    setDialOpen(false);
  };


  const removeDis = () => {
    setDialOpen(false);
    const did=delId;
   // console.log("delete id :"+did);
    axios.delete('http://127.0.0.1:4000/discussion/remove/' + did).then((res) => {
      setOpen(true);
      
      setTimeout(() => {
        setOpen(false);
        window.location.reload(true);
      }, 1000);
      
    })
  }

  const { setDiscussion } = useDiscussion();
  const handleEditClick = (discussionId) => {
    //alert(discussionId);
    setDiscussion(discussionId);
    sessionStorage.setItem('discussionId', discussionId);
    navigate('/editdiscussion');
  };

/////////////////////......Pagination Mypost......////////////////////////////


const [currentPage, setCurrentPage] = useState(1);
//const pageCount = 10; // Replace with the actual total number of pages
const itemsPerPage = 10;
const pageCount = Math.ceil(mylist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mylist.slice(startIndex, endIndex);


  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    // Perform any additional logic (e.g., fetch data for the new page) here
  };
  
  
/////////////////////......Pagination Other......////////////////////////////


const [othercurrentPage, setOtherCurrentPage] = useState(1);
//const pageCount = 10; // Replace with the actual total number of pages
const itemsOtherPerPage = 10;
const pageOtherCount = Math.ceil(list.length / itemsOtherPerPage);
  const startOtherIndex = (othercurrentPage - 1) * itemsOtherPerPage;
  const endOtherIndex = startOtherIndex + itemsOtherPerPage;
  const currentDataOther = list.slice(startOtherIndex, endOtherIndex);
  


const handleOtherPageChange = (event, newPage) => {
  setOtherCurrentPage(newPage);
  // Perform any additional logic (e.g., fetch data for the new page) here
};

  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" paddingTop={'20px'}>
      <Grid item xs={12} md={12} lg={12}>
        <Link to={'/discussion'}><Button variant="contained" className='commonButton'>
          Start a Discussion
        </Button></Link>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
      <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert 
                
                sx={{ mb: 2 }}
                >
                Deleted Successfully
                </Alert>
            </Collapse>
            {/* <Button
                disabled={open}
                variant="outlined"
                onClick={() => {
                setOpen(true);
                }}
            >
                Re-open
            </Button> */}
        </Box>

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
              <>
              <Box>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {currentData.map((rows, i) => (
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

                              </Typography>

                            </React.Fragment>
                          }
                        />
                        <ListItemIcon id={'list'+i}>
                          <IconButton
                            size="large"
                            aria-label="display more actions"
                            edge="end"
                            color="inherit"
                            onClick={(event) => handleMenu(event, i)}
                          >
                            <MoreIcon />
                          </IconButton>
                          <Menu
                            id={`menu-appbar-${i}`}
                            anchorEl={anchorEls[i]}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorEls[i])}
                            onClose={() => handleClose(i)}
                          >
                            <Link to={`/viewdiscussion/${rows._id}`} style={{ textDecoration: 'none' }}>
                              <MenuItem color="primary" sx={{ color: green[500] }}><VisibilityIcon />View</MenuItem>
                            </Link>
                            <MenuItem onClick={()=>{handleEditClick(rows._id)}} sx={{ color: blue[500] }}><EditIcon />Edit</MenuItem>
                            <MenuItem onClick={()=>{handleClickOpen(rows._id)}} sx={{ color: red[500] }}><DeleteOutlinedIcon />Delete</MenuItem>
                          </Menu>

                            

                        </ListItemIcon>

                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  ))}
                </List>
                 
              </Box>
              <Box style={{mb:0}}>
                {(mylist.length>itemsPerPage)?  (           
                <CustomPagination pageCount={pageCount} currentPage={currentPage} onChange={handlePageChange}  />
                 ):''}
                </Box>
                </>
            ) : (
              <p>Loading...</p>
            )
          )}
          {tabIndex === 1 && (
            list ? (
              <>
              <Box>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {currentDataOther.map((row, i) => (
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
              <Box style={{mb:0}}>
                {(list.length>itemsOtherPerPage)?  (           
                <CustomPagination pageCount={pageOtherCount} currentPage={othercurrentPage} onChange={handleOtherPageChange}  />
                 ):''}
              </Box>
            </>
            ) : (
              <p>Loading...</p>
            )
          )}

        </Box>

        <Dialog
          open={dialopen}
          onClose={handleDialClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want ot delete this discussion
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={removeDis} autoFocus>
              Yes
            </Button>
            <Button onClick={handleDialClose}>No</Button>
           
          </DialogActions>
        </Dialog>


      </Grid>
    </Grid>
  )
}

export default Forum
