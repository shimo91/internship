import { Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SummarizeIcon from '@mui/icons-material/Summarize';
import '../css/Overview.css'
import {  green, purple, red } from '@mui/material/colors';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Document from './Document';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Overview = () => {

    const token = sessionStorage.getItem("userToken");
    const decodeToken = jwtDecode(token);
    const userId = decodeToken.userid;
   // var { datauserId } = useData();
    //console.log("userid is iiiiiiiiiiiiiiiiiiiiii :"+userId);



    const [dtotal, setDtoatl] = useState('');
    


    useEffect(() => {

        axios.get('http://127.0.0.1:4000/discussion/total/'+userId).then((res) => {
            if (res.data.message === 'total') {
                setDtoatl(res.data.total);
               
              }
        })
      }, []);
   
    
  return (
    <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" >
    <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{  pt: 2,
                    pb:2,
                    pr:2,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'transparent',
                    boxShadow:'none'
                  }}
                >



        <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" >
            <Grid item xs={12} md={4}  >
                
                <Card className='carddiv bg-gradient-danger' >
                <div className='iconalign'><SummarizeIcon className='fontIcon' style={{ color: green[500] }}/><Typography className='fontIconText'> 0</Typography></div>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Done Submissions
                        </Typography>
                    </CardContent>
                    <CardActions justifyContent="center"  alignItems="center" className='cardbutton'>
                        <Button size="small">View More</Button>
                    </CardActions>
                </Card>                    
            </Grid>
            <Grid item xs={12} md={4} >
                
                <Card className='carddiv bg-gradient-danger' >
                <div className='iconalign'><PendingActionsIcon className='fontIcon' style={{ color: red[500] }}/><Typography className='fontIconText'> 0</Typography></div>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Pending submissions
                    </Typography>
                </CardContent>
                <CardActions justifyContent="center"  alignItems="center" className='cardbutton'>
                    <Button size="small">View More</Button>
                </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} >
                
                <Card className='carddiv bg-gradient-danger' >
                <div className='iconalign'><ConfirmationNumberIcon className='fontIcon' style={{ color: purple[500] }}/><Typography className='fontIconText'> {dtotal}</Typography></div>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Discussion
                    </Typography>
                </CardContent>
                <CardActions justifyContent="center"  alignItems="center" className='cardbutton'>
                    <Link to={'/forum'}><Button size="small" >View More</Button></Link>
                </CardActions>
                </Card>
            </Grid>
        </Grid>
    

        </Paper>
    </Grid>
    
      <Document userid={userId}/>
    </Grid>
  )
}

export default Overview
