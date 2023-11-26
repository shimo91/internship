import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Card, CardContent, CardMedia, CardActions, Button, Container, Grid, Paper, TextField, Modal } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './App.css';

const topics = [
  {
    imageUrl: 'https://www.zdnet.com/a/img/resize/1b0f3a471607ff123236026b04b964e1853ed41b/2023/04/05/e0478a88-b3ed-4516-8459-e0b919b4b2bc/artificial-intelligence.jpg?auto=webp&fit=crop&height=900&width=1200',
    title: 'Artificial Intelligence (AI)',
    description: 'AI is the intelligence of machines or software, as opposed to the intelligence of humans or animals.',
  },
  {
    imageUrl: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/How_5G_networks_will_change_the_world_as_we_know_it.jpg',
    title: '5G Technology',
    description: '5Gs swift connectivity promises to generate approximately $12 trillion in global economic value over the coming two decades.',
  },
  {
    title: 'Cybersecurity',
    imageUrl: 'https://media.licdn.com/dms/image/D5612AQE0r5WC8r0HQg/article-cover_image-shrink_720_1280/0/1657711469335?e=2147483647&v=beta&t=y46kqfqImgi-IbshBGRs3lMz1HCTBvL8RjFAILShitg',
    description: 'cyber security is how individuals and organisations reduce the risk of cyber attack.'
    
  },
  {
    title: 'Data Science',
    imageUrl: 'https://d1m75rqqgidzqn.cloudfront.net/wp-data/2019/09/11134058/What-is-data-science-2.jpg',
    description: 'Data science is the study of data to extract meaningful insights for business.'
    
  },
  {
    title: 'Big Data',
    imageUrl: 'https://u01.appmifile.com/images/2018/09/16/892c3245-101d-4f83-883b-7073e5f85b45.png',
    description: 'The definition of big data is data that contains greater variety, arriving in increasing volumes and with more velocity.'
    
  },
  {
    title: 'Machine Learning',
    imageUrl: 'https://s40424.pcdn.co/in/wp-content/uploads/2023/03/types-of-machine-learning.jpg.optimal.jpg',
    description: 'Machine learning, part of AI and computer science, uses data and algorithms to mimic human learning, enhancing accuracy over time.'
    
  },
  {
    title:'IoT',
    imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/6530cc59fe49b3d2fa51d506/2024-IoT-And-Smart-Device-Trends--What-You-Need-to-Know-For-The-Future/960x0.jpg?format=jpg&width=960',
    description:'Emotions shape sentiment analysis outcomes, whereas connectivity defines the essence of the Internet of Things.'
  },
  {
    title:'Robotics',
    imageUrl: 'https://media.licdn.com/dms/image/D5612AQE03WW0tnU2wg/article-cover_image-shrink_600_2000/0/1675014214058?e=2147483647&v=beta&t=DWFkrwWKkhp_9r7joXXFXt7l7hclw3l8YZh2q9UWmWI',
    description:'Robotics is a branch of engineering and computer science that involves the conception, design, manufacture and operation of robots.'
  }
  
];

const Dashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [name, setName] = useState('');

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setShowConfirmationModal(true);
  };

  const handleConfirm = () => {
    if (selectedTopic && name.trim() !== '') {
      console.log(`Confirmed: ${selectedTopic.title} by ${name}`);
      setShowConfirmationModal(false);
      setSelectedTopic(null);
      setName('');
    }
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
    setSelectedTopic(null);
    setName('');
  };

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      
      
    }}>
      <CssBaseline />
      
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Student Dashboard
          </Typography>
          <IconButton color="inherit" aria-label="Logout">
            Exit<ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, paddingTop: '80px' }}>
        <Typography variant="h6" noWrap component="div" sx={{ textAlign: 'center', fontSize: '50px',color:'Highlight' }}>
          Main Topics
        </Typography>
        <br/>
        <Grid container spacing={6}>
          {topics.map((topic, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardMedia
                    component="img"
                    alt={`Image ${index + 1}`}
                    height="140"
                    image={topic.imageUrl}
                  />
                  <CardContent sx={{ height: 170 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {topic.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: 'justify' }}>
                      {topic.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button size="small" onClick={() => handleSelectTopic(topic)}>
                      Select topic
                    </Button>
                    <Button size="small">View More</Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Modal open={showConfirmationModal} onClose={handleCancel}>
          <Box
            sx={{
              position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 8,
            p: 4,
            borderRadius: '12px',
            maxWidth: '400px',
            width: '80%',
            }}
          >
            <Typography variant="h6">Enter your name:</Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Your Name"
              variant="outlined"
              sx={{ mt: 2, mb: 2, width: '100%' }}
            />
             <br/>
            <Typography variant="body1">Once you confirm,you are not able to edit this later.</Typography>
            <br/>
            
            <Typography variant="body1">Do you wish to continue?</Typography>
            <br/>
            <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ mr: 2 }}>
              Confirm
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Dashboard;