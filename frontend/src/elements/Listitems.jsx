import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ForumIcon from '@mui/icons-material/Forum';
import '../css/Dashboard.css'
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to={'/dashboard'}  sx={{textDecoration:'none'}}>
    <ListItemButton className='activatedLink' >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItemButton></Link>
    <Link to={'/reference'}  sx={{textDecoration:'none'}}>
    <ListItemButton>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="Reference Materials" />
    </ListItemButton>
    </Link>
    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
   
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Weekly Reports" />
    </ListItemButton>
    <Link to={'/report'}  sx={{textDecoration:'none'}}>
    <ListItemButton>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Final Reports" />
    </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Viva Voce" />
    </ListItemButton>
    
    <Link to={'/forum'}  sx={{textDecoration:'none'}}>
    <ListItemButton>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Discussion Forum" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);