import { Alert, Avatar, Box, Button, Card, CardContent, ClickAwayListener, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useReducer, useState } from 'react'
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
import { visuallyHidden } from '@mui/utils';
import Reply from './Reply';
import CustomPagination from './CustomPagination';
import { jwtDecode } from "jwt-decode";

const ViewDiscussion = () => {

  // var { stdname } = useData();
  // var { datauserId } = useData();
 
  const token = sessionStorage.getItem("userToken");
    const decodeToken = jwtDecode(token);
    const datauserId = decodeToken.userid;
    const userName = decodeToken.username;
    const stdname = decodeToken.stdname;

  const navigate = useNavigate();
  //var { dataId } = useData();
  //console.log("id is :"+dataId);
  const { id } = useParams();
  const [reducervalue, forceUpdate] = useReducer(x => x + 1, 0);

  const [list,setlist]=useState([]);
  const [count, setCount] = useState(0);
  const [countcomment, setCountcomment] = useState(0);

  useEffect(()=>{

      
        axios.get('http://127.0.0.1:4000/discussion/get/'+id).then((res)=>{
          setlist(res.data);
          //console.log("list of discussion : "+res.data);
        })

     
  },[]);

   //console.log("list : "+list);
   const [open, setOpen] = React.useState(false);

   const [comData, setData] = useState('');
   const inputHandler = (e)=>{
    
      setData({...comData,[e.target.name]:e.target.value});
           
    }

   

    const addHandler = ()=>{

      const commentLabelDiv = document.getElementById("commentLabel");
      if(comData.comment === undefined || comData.comment === null || comData.comment === '')
      {
        if (commentLabelDiv) {
          // Modify the style of the div as needed
          commentLabelDiv.style.display = '';
          // Add more style modifications as needed
        }
      }
      else
      {
        if (commentLabelDiv) {
          // Modify the style of the div as needed
          commentLabelDiv.style.display = 'none';
          // Add more style modifications as needed
        }
  
        const dataToSend = {
          ...comData,
          discussionid: id,
          username:stdname,
          userid:datauserId,
          // other data if needed
        };

        axios.post('http://127.0.0.1:4000/comment/add',dataToSend).then((res)=>{
          //alert(res.data.message);
          if(res.data.message==="saved")
          {
            setOpen(true);
            const commentDiv = document.getElementById("commentText");
    
            if (commentDiv) {
              commentDiv.value = '';
            }
            setTimeout(() => {
              setOpen(false);
             window.location.reload();
            }, 1000);
           //setCountcomment(countcomment + 1);
            setData('');
          }
          else{
              alert("Invalid");
          }
        }).catch(()=>{
              console.log('Error!! No connection');
              alert('Invalid');
        })
      }
      
  }



  const [comlist,setcomlist]=useState([]);

  useEffect(()=>{

    const fetchComment = async () => {
      try {
        axios.get('http://127.0.0.1:4000/comment/get/'+id).then((res)=>{
        
          setcomlist(res.data);
         // console.log(comlist);
        })
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };
    fetchComment(); 
  },[countcomment]);





  const toggleGrid = (i) => {
   // console.log("value of i :"+i)
    const targetDiv = document.getElementById("addReply"+i);
    
    if (targetDiv) {
      // Modify the style of the div as needed
      targetDiv.style.display = '';
      // Add more style modifications as needed
    }

    // setGridVisible(!isGridVisible);
    
  };

  // const gridStyle = {
  //   display: isGridVisible ? '' : 'none',
  // };

  const [repData, setRepData] = useState('');
  const inputReplyHandler = (e)=>{
    setRepData({...repData,[e.target.name]:e.target.value});
  }

 

  const addReplyHandler = (id,i)=>{

      const replyLabelDiv = document.getElementById("replyLabel"+i);
      if(repData.reply === undefined || repData.reply === null || repData.reply === '' )
      {
        if (replyLabelDiv) {
          // Modify the style of the div as needed
          replyLabelDiv.style.display = '';
          // Add more style modifications as needed
        }
      }
      else
      {
        if (replyLabelDiv) {
          // Modify the style of the div as needed
          replyLabelDiv.style.display = 'none';
          // Add more style modifications as needed
        }
  
  
        const dataToSend = {
          ...repData,
          commentid: id,
          username:stdname,
          userid:datauserId,
          // other data if needed
        };

   
        axios.post('http://127.0.0.1:4000/reply/add',dataToSend).then((res)=>{
        //alert(res.data.message);
          if(res.data.message==="saved")
          {
            setOpen(true);

            setTimeout(() => {
              setOpen(false);
            //window.location.reload();
            }, 1000);
            setRepData('');
            setCount(count + 1);
            const replyDiv = document.getElementById("replytext"+i);
      
            if (replyDiv) {
              // Modify the style of the div as needed
              replyDiv.value = '';
              // Add more style modifications as needed
            }
            const targetrDiv = document.getElementById("addReply"+i);
      
            if (targetrDiv) {
              // Modify the style of the div as needed
              targetrDiv.style.display = 'none';
              // Add more style modifications as needed
            }
                  
          }
          else{
              alert("Invalid");
          }
        }).catch(()=>{
            console.log('Error!! No connection');
            alert('Invalid');
        })
      }

  }


  /////////////////////......Pagination Comment......////////////////////////////


const [currentPage, setCurrentPage] = useState(1);
//const pageCount = 10; // Replace with the actual total number of pages
const itemsPerPage = 10;
const pageCount = Math.ceil(comlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = comlist.slice(startIndex, endIndex);


  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    // Perform any additional logic (e.g., fetch data for the new page) here
  };
  
 

  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" paddingTop={'20px'} paddingBottom={'20px'}>
      <Grid item xs={12} md={12} lg={12}  >
      {list ? (
        <Card sx={{ width: '100%' }} key={list._id}>
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

            {/* ............. Comment Add ............. */}

      <Grid item xs={12} md={12} lg={12}>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Typography component="h6" fontWeight={'bold'} textAlign={'left'}>Comments</Typography>
          <TextField fullWidth multiline rows={4}  id="commentText" name='comment'  onChange={inputHandler} label="write some of your comments" sx={{ mt: 2 }}  />
          <InputLabel id={"commentLabel"} style={{ color: "red", marginTop:'5px',display:'none' }} className='textAlignLeft' >Please write a comment</InputLabel>
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
        <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
                {currentData.map((row,i) => (
                  
                <>  
                  {/* ......................comment section.................. */}
                 
                <ListItem alignItems="flex-start" key={i}>
                  <ListItemAvatar>
                    <Avatar alt="" src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={row.username }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {row.comment}
                        </Typography>
                        
                      </React.Fragment>
                    }
                  />
                  {(datauserId===list.userid &&  datauserId!==row.userid)?(
                  <ListItemIcon>
                    <IconButton
                    size="small"
                      aria-label="display more actions"
                      edge="end"
                      onClick={()=>{toggleGrid(i)}}
                      sx={{fontSize:'14px',color:'#000'}}
                    >
                     <EditIcon sx={{fontSize:'16px',color:'#000'}}/>Reply
                    </IconButton>
                    
                     
                  </ListItemIcon>
                  ): ("")}

                </ListItem>

                {/* .......... add reply.............. */}
                      
                
                <Grid container spacing={1} marginBottom={'20px'}  id={"addReply"+i}  style={{display:'none'}}>         
                  <Grid item xs={1} md={1} lg={1} ></Grid>
                  <Grid item xs={11} md={11} lg={11} textAlign={'right'} >
                    <Box
                      sx={{
                        width: '90%',
                        maxWidth: '100%',
                      }}
                    >
                      <TextField fullWidth label="write a reply" id={"replytext"+i} name='reply'  onChange={inputReplyHandler}/>
                    <InputLabel id={"replyLabel"+i} style={{ color: "red", marginTop:'5px',display:'none' }} className='textAlignLeft'>Please write a reply</InputLabel>
                    </Box>
                  </Grid>
                  <Grid item xs={11} md={11} lg={11} textAlign={'right'}>
                    <Button variant='contained' sx={{ mt: 2 }} className='commonButton' onClick={()=>{addReplyHandler(row._id,i)}} >Submit</Button>
                  </Grid>
                </Grid>
                
                <Divider variant="inset" component="li" />
               
               
                {/* ...............reply section.............. */}

                
                <Reply commId={row._id} count={count}/>
                
                </>
              ))}
              </List>
              <Box>
               {(comlist.length>itemsPerPage)?  (           
                <CustomPagination pageCount={pageCount} currentPage={currentPage} onChange={handlePageChange}  />
                 ):''}
              </Box>
            </>
              ) : (
                <p>Loading...</p>
              )}

          

      </Grid>
    </Grid>
  )
}

export default ViewDiscussion
