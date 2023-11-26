import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Paper,
  Box,
} from '@mui/material';

const Topics = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleTopicChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTopics([...selectedTopics, value]);
    } else {
      setSelectedTopics(selectedTopics.filter((topic) => topic !== value));
    }
  };

  const csProjects = [
    'Web Development',
    'Mobile App Development',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    // Add more CS projects as needed
  ];

  const confirmSelection = () => {
    
    console.log('Selected Topics:', selectedTopics);
  };

  const cancelSelection = () => {
    setSelectedTopics([]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        CS Project Topics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Project</TableCell>
              <TableCell align="right">Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {csProjects.map((project, index) => (
              <TableRow key={project}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={selectedTopics.includes(project)}
                    onChange={handleTopicChange}
                    value={project}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" onClick={confirmSelection} sx={{ mr: 2 }}>
          Confirm
        </Button>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="error" onClick={cancelSelection}>
            Cancel
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Topics;
