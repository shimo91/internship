import { Avatar, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  

const Forum = () => {
  return (
    <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingTop={'20px'}>
        <Grid item xs={12} md={12} lg={12}>
            <Button variant="contained" >
                Start a Discussion
            </Button>
        </Grid>
       <Grid item xs={12} md={12} lg={12}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="What all technology stack is required to develop a website ?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — Full stack developer needs to know more than one technology stack …"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="How to Fix 403 Forbbiden Error on your server?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Hey, I just launched my first website using Linode and I followed some instructions online…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="How much does it cost for a full stack development?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — what is basic cost for full stack developer & what model available…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </Grid>
    </Grid>
  )
}

export default Forum
