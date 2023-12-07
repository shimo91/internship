import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'; // Importing axios directly

const WeeklyReport = () => {
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

      const fileResponse = await axios.post('http://localhost:4000/week/upload', formData);
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
        Weekly Report
      </Typography>

      <TextField
        id="reportName"
        label="Name of Your Report"
        variant="outlined"
        fullWidth
        value={reportData.reportName}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        id="description"
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={reportData.description}
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

export default WeeklyReport;
