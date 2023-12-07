import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'; // Importing axios directly

const Vivavoce = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportData, setReportData] = useState({
    reportName: '',
    description: '',
  });

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setSelectedFile(uploadedFile);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReportData({ ...reportData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // File upload logic
      const formData = new FormData();
      formData.append('file', selectedFile); // Use the selected file

      const fileResponse = await axios.post('http://localhost:4000/vivavoce/upload', formData);
      if (fileResponse.data === 'File uploaded successfully and processed.') {
        setFileUploaded(true);
        alert('File uploaded successfully!');
      } else {
        // Handle other file upload messages or cases
      }

      // Logic to submit report data
      // This function needs to be implemented based on your requirements
      console.log('Submitting report data:', reportData);
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle different error scenarios here
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      border={1}
      p={3}
      width={900}
      height={500}
      bgcolor="white"
    >
      <Typography variant="h4" mb={1}>
       
      </Typography>

      <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingTop={'20px'}>
        <Grid item xs={12} md={12} lg={12}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <List
          sx={{
            listStyleType: 'disc',
            listStylePosition: 'inside'
            }}
            >
            <ListItem sx={{ display: 'list-item' }}>
            File should be in the form of .pdf .docx or .doc
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
            File size should not exceed 50 MB
            </ListItem>
            </List>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Grid>
      </Grid>

      <TextField
        id="reportName"
        label="Name of Your Report"
        required
        variant="outlined"
        fullWidth
        value={reportData.reportName}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <Box display="flex" alignItems="center" mb={2}>
        <label htmlFor="fileUploadInput" style={{ marginRight: '10px' }}>
          <input
            id="fileUploadInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            {selectedFile ? selectedFile.name : 'Upload File'}
          </Button>
        </label>
        {fileUploaded && (
          <Typography variant="body1" display="flex" alignItems="center">
            <CheckCircleIcon sx={{ color: 'green', marginRight: '5px' }} />
            File uploaded successfully!
          </Typography>
        )}
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default Vivavoce;
