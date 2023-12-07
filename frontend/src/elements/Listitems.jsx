import React from 'react'
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
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Divider } from '@mui/material';



const Listitems = () => {
  const location=useLocation();
  const path=location.pathname;
 

  // Split the path based on "/"
  const pathParts = path.split("/");

  // Get the starting path (index 1)
  const startingPath = pathParts[1];
  console.log("match : "+startingPath)

  return (
    <React.Fragment>
    <Link to={'/dashboard'}  sx={{textDecoration:'none'}}>
    <ListItemButton 
    className={path === '/dashboard' ? 'activatedLink' : ''}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItemButton></Link>
    <Link to={'/reference'}  sx={{textDecoration:'none'}}>
    <ListItemButton 
    className={path === '/reference' ? 'activatedLink' : ''}
    >
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="Reference Materials" />
    </ListItemButton>
    </Link>
    
    <Divider sx={{ my: 1 }} />


   <Link to={'/week'}  sx={{textDecoration:'none'}}>
    <ListItemButton 
    className={path === '/week' ? 'activatedLink' : ''}
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Weekly Reports" />
    </ListItemButton>
    </Link>
    <Link to={'/report'}  sx={{textDecoration:'none'}}>
    <ListItemButton
    className={path === '/report' ? 'activatedLink' : ''}
    >
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
    <ListItemButton 
    className={ (startingPath && path.startsWith('/viewdiscussion/')) || 
    path === '/forum' || path === '/discussion' || path === '/viewdiscussion' || path=== '/editdiscussion' ? 'activatedLink' : '' }
    >
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Discussion Forum" />
    </ListItemButton>
    </Link>
  </React.Fragment>

  )
}

export default Listitems

