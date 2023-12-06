import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Divider, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const Reply = ({ commId, count}) => {

    //console.log("reply commentid : "+commId)

    const [replies, setReplies] = useState([]);
  
    useEffect(() => {
      const fetchReplies = async () => {
        try {
         
          
            axios.get('http://127.0.0.1:4000/reply/get/'+commId).then((res)=>{
                if(res.data!= undefined && res.data != null)
                {
                    setReplies(res.data);
                    //console.log("replies :"+res.data.reply)
                }
                
                
            })
            .catch(()=>{
                console.log('Error!! No connection');
            })
        } catch (error) {
          console.error('Error fetching replies:', error);
        }
      };
  
     fetchReplies();
    }, [count]);
  
    return (
      <div>
        
        {replies.map((reply,i) =>  (
            <Grid container spacing={1} key={i}>         
                <Grid item xs={1} md={1} lg={1} ></Grid>
                <Grid item xs={11} md={11} lg={11} textAlign={'right'}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="" src="" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={reply.username}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {reply.reply}
                            </Typography>
                          
                          </React.Fragment>
                        }
                      />
                      
                      
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Grid>
            </Grid>
            ))}

      </div>
    );
  };

export default Reply
