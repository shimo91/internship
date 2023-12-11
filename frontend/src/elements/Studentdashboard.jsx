import React, { useEffect, useState } from 'react';

import {Box,CssBaseline,AppBar,Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Grid,
  Modal,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosInstance from '../Components/axiosinterceptor'

const Studentdashboard = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSelectedTopic, setHasSelectedTopic] = useState(false);

  useEffect(() => {
    axiosInstance.get('/sdashboard/')
      .then((response) => {
        setTopics(response.data);
      })
      
      .catch((error) => {
        console.error('Error fetching topics:', error);
      });
  }, []);

  


  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setConfirmationOpen(true);
  };
  



  

  
  const handleConfirm = () => {
   
    axiosInstance.post('/sdashboard/topic', { projectId: selectedTopic._id })
      .then((response) => {
        // Handle success, maybe show a success message
        console.log('Topic stored successfully:', response.data);
  
        // Optionally, you can update the UI or perform additional actions upon successful selection
      })
      .catch((error) => {
        // Handle error, maybe show an error message
        console.error('Error storing topic:', error);
      });
  
    // Close the confirmation modal
    setConfirmationOpen(false);
    // Redirect or perform any other necessary action
    window.location.href = '/dashboard'
  };





  
  
 
  const handleViewMore = (topicId) => {

    return <Link to={`/topic/${topicId}`} />;
  };



  const handleClose = () => {
    // Close the confirmation modal without performing any action
    setConfirmationOpen(false);
  };



  

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ background: '#146e87' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuBookIcon />
          </IconButton>
          <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ICT Internship Portal
          </Typography>
          <IconButton component={Link} to="/dashboard" size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
   Go to dashboard
</IconButton>
          </Toolbar>
          
      </AppBar>
      <Container  sx={{
  flexGrow: 1,
  bgcolor: 'background.default',
  p: 3,
  paddingTop: '80px',
  overflowY: 'scroll', // Use 'scroll' to enable scrolling
  maxHeight: 'calc(100vh - 80px)', // Adjust height based on your needs
  '&::-webkit-scrollbar': {
    display: 'none', // Hide the scrollbar
  },
}}>
        <Typography variant="h6" noWrap component="div" sx={{ textAlign: 'center', fontSize: '40px', color: '#146e87' }}>
          Main Topics
        </Typography>
        <br />
        <Grid container spacing={2} justifyContent="center">
          {topics.map((topic, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={topic.project_image}
                  alt={`Topic ${index}`}
                />
               <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column'}}> 
                  <Typography gutterBottom variant="h6" component="div">
                    {topic.project_topic}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{ fontFamily: 'in', textAlign: 'justify', flex: 1}}>
                    {topic.project_description}
                  </Typography>
                  
                 
                  <Button
  disabled={isAuthenticated ? selectedTopic?._id !== topic._id : false}
  onClick={() => handleSelectTopic(topic)}
>
  {selectedTopic?._id === topic._id ? 'Topic Selected' : 'Select Topic'}
</Button>

                  <Link to={`/topic/${topic._id}`}>
                    <Button variant="outlined"
        sx={{
          borderColor: '#146e87',
          color: '#146e87',
          '&:hover': {
            backgroundColor: '#eaf6ff',
          },
          mb: 1,
        }}>View More</Button>
                  </Link>
              
                </CardContent>
              </Card>
            </Grid> 
          ))}
        </Grid>
      </Container>
      {/* Confirmation Modal */}
      <Modal
        open={confirmationOpen}
        onClose={handleClose}
        aria-labelledby="confirm-topic-modal"
        aria-describedby="confirm-topic-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="confirm-topic-description" sx={{ mb: 2 }}>
            Once you click, you may not be able to edit the topic.
          </Typography>
          <Button variant="contained" onClick={handleConfirm} sx={{ mr: 2 }}>
            
            Yes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Studentdashboard;