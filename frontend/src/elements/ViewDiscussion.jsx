import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const ViewDiscussion = () => {
  return (
    <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingTop={'20px'} >
        <Grid item xs={12} md={12} lg={12}  >
            <Card sx={{ width:'100%' }}>
                <CardContent>
                    <Typography variant="h4" component="h4">
                    How much does it cost for a full stack development?
                    </Typography>
                    <Typography variant="body2" sx={{mt : 2}}>
                    The demand in IT development for every developer is often driven by the requirements and the role. 
                    Full stack developer is no different when it comes to the pay scale. 
                    The trend in 2020 was to hire a full stack developer for developing an all in one solution.
                     The first quarter of 2021 showed us that this year is going to be the same.
                    </Typography>
                </CardContent>
      
            </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              width: '100%',
            }}
            >
            <Typography  component="h6" fontWeight={'bold'} textAlign={'left'}>Comments</Typography>
            <TextField fullWidth multiline rows={4} label="write some of your comments" id="fullWidth" sx={{mt:2}} />
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12} textAlign={'right'}>
                <Button variant='contained' sx={{mt:2}} >Post Comment</Button>
            </Grid>
    </Grid>
  )
}

export default ViewDiscussion
