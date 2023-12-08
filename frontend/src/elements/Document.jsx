import { Grid, Link, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import '../css/Overview.css'
import { lightBlue } from '@mui/material/colors';
import axios from 'axios';
import { useData } from '../context/DataContext';
import { jwtDecode } from "jwt-decode";

const Document = ({userid}) => {


  var topic_id;
  const [list, setList] = useState([]);
 // const { datauserId } =  useData();

useEffect(() => {
  const fetchReplies = async () => {
    try {
          // Assuming useData() returns a Promise
          axios.get(`http://127.0.0.1:4000/login/gettopic/${userid}`)
          .then(res => {
            //setTopic(res.data);
            topic_id=res.data.topic_id;
            return axios.get(`http://127.0.0.1:4000/sdashboard/getData/${topic_id}`);
          })
          .then(res1 => {
            setList(res1.data);
            //console.log(list1)
           
          })
          .catch(error => {
            // Handle errors for both requests
            console.error('Error:', error);
          });
        } catch (error) {
          console.error('Error fetching replies:', error);
        }
      };
  
     fetchReplies();
}, []); // Empty dependency array to ensure useEffect runs only once on mount




  return (
    <Grid item xs={12}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',paddingLeft:'25px' }}>
        <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingLeft={'20px'} >
            <Grid item xs={12}   >
                <Typography variant='h4' color= {lightBlue[800]}>{list.project_topic}</Typography>
                <div className='contentleft'>
                    <p>Dear Student,</p>

                    <p>Greetings from ICT Academy of Kerala...!!</p>

                    <p>Thank you for enrolling in ICT Academy of Kerala's Internship program.</p>

                    <p>You can download your detailed documentation of the project from below link </p>
                    <p className='iconalignleft'><AttachFileSharpIcon/> 
                      <Link href={process.env.PUBLIC_URL+list.document} download={encodeURIComponent(list.project_topic)}>
                      {list.project_topic}
                      </Link>
                    </p>
                </div>
            </Grid>
        
        </Grid>
      </Paper>
  </Grid>
    
  )
}

export default Document
