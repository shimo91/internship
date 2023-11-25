import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import SummarizeIcon from '@mui/icons-material/Summarize';
import '../css/Overview.css'
import {  green, purple, red } from '@mui/material/colors';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Overview = () => {
    
  return (
    <div >
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
                <div className='iconalign'><ConfirmationNumberIcon className='fontIcon' style={{ color: purple[500] }}/><Typography className='fontIconText'> 0</Typography></div>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Open Tickets
                    </Typography>
                </CardContent>
                <CardActions justifyContent="center"  alignItems="center" className='cardbutton'>
                    <Button size="small" >View More</Button>
                </CardActions>
                </Card>
            </Grid>
        </Grid>
    </div>

    
    
  )
}

export default Overview
