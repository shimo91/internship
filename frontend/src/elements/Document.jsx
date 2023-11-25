import { Grid, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import '../css/Overview.css'
import { lightBlue } from '@mui/material/colors';

const Document = () => {
  return (
    <Grid item xs={12}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',paddingLeft:'25px' }}>
        <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingLeft={'20px'} >
            <Grid item xs={12}   >
                <Typography variant='h4' color= {lightBlue[800]}>Topic Name</Typography>
                <div className='contentleft'>
                    <p>Dear Student,</p>

                    <p>    Greetings from ICT Academy of Kerala...!!</p>

                    <p>Thank you for enrolling in ICT Academy of Kerala's Internship program.</p>

                    <p>You can download your detailed documentation of the project from below link </p>
                    <p className='iconalignleft'><AttachFileSharpIcon/> <Link component="button"  variant="body2"  > topic name </Link></p>
                </div>
            </Grid>
        
        </Grid>
      </Paper>
  </Grid>
    
  )
}

export default Document
