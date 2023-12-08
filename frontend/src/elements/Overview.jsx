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
    var total_pending=3;
    const [donesub, setDonesub] = useState(0);
    const [pending, setPending] = useState(total_pending);
    const [dtotal, setDtoatl] = useState(0);
    
    
    
    useEffect(() => {
        console.log("sdsdsdsd")
       
        axios.get('http://127.0.0.1:4000/discussion/total/'+userId).then((res) => {
            if (res.data.message === 'total') {
                setDtoatl(res.data.total);
               
              }
        })

        axios.get('http://127.0.0.1:4000/week/submission/'+userId).then((res) => {
            if (res.data.message === 'total') {
                setDonesub(res.data.total);
                setPending(total_pending-res.data.total);
               
              }
        })


      }, [total_pending]);
   
    
  return (
    <Grid container spacing={2} direction="row"  justifycontent="center"  alignitems="center" >
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



        <Grid container spacing={2} direction="row"  justifycontent="center"  alignitems="center" >
            <Grid item xs={12} md={4}  >
                
                <Card className='carddiv bg-gradient-danger' >
                <div className='iconalign'><SummarizeIcon className='fontIcon' style={{ color: green[500] }}/><Typography className='fontIconText'> {donesub}</Typography></div>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Done Submissions
                        </Typography>
                    </CardContent>
                    <CardActions justifycontent="center"  alignitems="center" className='cardbutton'>
                        <Link to={'/week'}><Button size="small">View More</Button></Link>
                    </CardActions>
                </Card>                    
            </Grid>
            <Grid item xs={12} md={4} >
                
                <Card className='carddiv bg-gradient-danger' >
                <div className='iconalign'><PendingActionsIcon className='fontIcon' style={{ color: red[500] }}/><Typography className='fontIconText'>{pending}</Typography></div>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Pending submissions
                    </Typography>
                </CardContent>
                <CardActions justifycontent="center"  alignitems="center" className='cardbutton'>
                    <Link to={'/week'}><Button size="small">View More</Button></Link>
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
                <CardActions justifycontent="center"  alignitems="center" className='cardbutton'>
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
