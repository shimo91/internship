import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import axiosInstance from '../Components/axiosinterceptor'

const WeeklyReport = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportData, setReportData] = useState({
    reportName: '',
    description: '',
  });
  const [week1Submitted, setWeek1Submitted] = useState(false);
  const [uploadedFileWeek1, setUploadedFileWeek1] = useState(null);
  const [week2Submitted, setWeek2Submitted] = useState(false);
  const [uploadedFileWeek2, setUploadedFileWeek2] = useState(null);
const [uploadedFileWeek3, setUploadedFileWeek3] = useState(null);

  const [expandedWeek1, setExpandedWeek1] = useState(true);
  const [expandedWeek2, setExpandedWeek2] = useState(false);
  const [expandedWeek3, setExpandedWeek3] = useState(false);
  const [selectedFileWeek2, setSelectedFileWeek2] = useState(null);
  const [week2Disabled, setWeek2Disabled] = useState(true);
  const [week3Disabled, setWeek3Disabled] = useState(true);

  const handleFileUpload = async (e, week) => {
    const uploadedFile = e.target.files[0];
    if (week === 1) {
      setSelectedFile(uploadedFile);
      setUploadedFileWeek1(uploadedFile);
    } else if (week === 2) {
      setSelectedFileWeek2(uploadedFile);
      setUploadedFileWeek2(uploadedFile);
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReportData({ ...reportData, [id]: value });
  };

  const handleSubmitWeek1 = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      
      const fileResponse = await axiosInstance.post('/week/upload', formData);
      
      // For demonstration purposes, set file upload success directly
      // Replace this with actual response handling from your server
      if (fileResponse.data === 'File uploaded successfully and processed.') {
      if (selectedFile) {
        setFileUploaded(true);
        setWeek1Submitted(true);
        setExpandedWeek1(false); // Collapse Week 1
        setExpandedWeek2(true); // Expand Week 2 after Week 1 submission
        setWeek2Disabled(false); // Enable Week 2 after Week 1 submission

        alert('File uploaded successfully!');
      } else {
        // Handle other file upload messages or cases
      }
    }

      console.log('Submitting report data:', reportData);
    } catch (error) {
      console.error('Error submitting data:', error);
      // Error handling remains the same
    }
  };

  const handleSubmitWeek2 = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('file', selectedFileWeek2);
  
      const fileResponse = await axiosInstance.post('/week/week2', formData);
  
      if (fileResponse.data === 'File uploaded successfully and processed.') {
        if (selectedFileWeek2) {
          setFileUploaded(true);
          setWeek2Submitted(true);
          setExpandedWeek2(false); // Collapse Week 2 after submission
          setExpandedWeek3(true); // Expand Week 3 after Week 2 submission
          setWeek3Disabled(false);
          alert('File uploaded successfully!');
        } else {
          // Handle other file upload messages or cases
        }
      }
  
      console.log('Submitting report data:', reportData);
    } catch (error) {
      console.error('Error submitting data:', error);
      // Error handling remains the same
    }
  };
  
  const handleSubmitWeek3 = async (e) => {
    e.preventDefault();
  
    try {
      // Assuming you need to send some data for Week 3 submission
      const week3Data = {
        // Include the data relevant for Week 3 submission
        // For example:
        reportNameWeek3: reportData.reportNameWeek3,
        descriptionWeek3: reportData.descriptionWeek3,
        // ... other fields or data relevant for Week 3
      };
  
      // Send Week 3 data to the server using Axios POST request
      const week3Response = await axiosInstance.post('/week/week3', week3Data);
  
      // Check the response from the server
      if (week3Response.status === 200) {
        // Update state variables after successful Week 3 submission
        setExpandedWeek2(false); // Collapse Week 2
        setExpandedWeek3(false); // Collapse Week 3 after submission
        setWeek3Disabled(false); // Enable Week 3 (if it was disabled)
        
        // Display an alert or perform other actions after successful submission
        alert('Week 3 data submitted successfully!');
      } else {
        // Handle other response statuses if needed
        console.error('Unexpected response status:', week3Response.status);
      }
    } catch (error) {
      // Handle errors if the Week 3 submission fails
      console.error('Error submitting Week 3 data:', error);
      // You can display an error message, perform retries, or other error-handling actions
    }
  };
  

  return (
    <Box>
      {/* Week 1 Accordion */}
      <Accordion expanded={expandedWeek1} onChange={() => setExpandedWeek1(!expandedWeek1)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Week 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
  <Box
    component="form"
    onSubmit={handleSubmitWeek1}
    border={1}
    p={3}
    width={900}
    bgcolor="white"
  >
    {/* Display the uploaded file for Week 1 */}
    {uploadedFileWeek1 && (
      <Box>
        <Typography variant="body1">
          File uploaded for Week 1: {uploadedFileWeek1.name}
        </Typography>
        {/* Add any other necessary information about the uploaded file */}
      </Box>
    )}

    {/* Week 1 form fields */}
    {/* Name and description fields */}
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

    {/* File upload */}
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
          File uploaded successfully: {selectedFile ? selectedFile.name : ''}
        </Typography>
      )}
    </Box>

    {/* Submit button for Week 1 */}
    <Button type="submit"  variant="contained" color="primary" >
      Submit Week 1
    </Button>
  </Box>
</AccordionDetails>
      </Accordion>

      {/* Week 2 Accordion */}
      <Accordion expanded={expandedWeek2} onChange={() => setExpandedWeek2(!expandedWeek2)} disabled={week2Disabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Week 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <Box
            component="form"
            onSubmit={handleSubmitWeek2}
            border={1}
            p={3}
            width={900}
            bgcolor="white"
          >
            {/* Week 2 form */}
            {/* Name and Description fields */}
            <TextField
              id="reportNameWeek2"
              label="Name of Your Report for Week 2"
              variant="outlined"
              fullWidth
              // Add appropriate value and onChange handlers
              // Example: value={reportData.reportNameWeek2}
              // onChange={handleInputChangeWeek2}
              sx={{ mb: 2 }}
            />
            <TextField
              id="descriptionWeek2"
              label="Description for Week 2"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              // Add appropriate value and onChange handlers
              // Example: value={reportData.descriptionWeek2}
              // onChange={handleInputChangeWeek2}
              sx={{ mb: 2 }}
            />
            {/* File upload */}
            <Box display="flex" alignItems="center" mb={2}>
              <label htmlFor="fileUploadInputWeek2" style={{ marginRight: '10px' }}>
                <input
                  id="fileUploadInputWeek2"
                  type="file"
                  style={{ display: 'none' }}
                  // Add appropriate onChange handler
                  // Example: onChange={handleFileUploadWeek2}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                 Submit week 2
                </Button>
              </label>
              {/* Display file upload status for Week 2 if needed */}
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Submit Week 2
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Week 3 Accordion */}
      <Accordion expanded={expandedWeek3} onChange={() => setExpandedWeek3(!expandedWeek3)} disabled={week3Disabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Week 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleSubmitWeek3}
            border={1}
            p={3}
            width={900}
            bgcolor="white"
          >
            {/* Week 3 form */}
            {/* Name and Description fields */}
            <TextField
              id="reportNameWeek3"
              label="Name of Your Report for Week 3"
              variant="outlined"
              fullWidth
              // Add appropriate value and onChange handlers
              // Example: value={reportData.reportNameWeek3}
              // onChange={handleInputChangeWeek3}
              sx={{ mb: 2 }}
            />
            <TextField
              id="descriptionWeek3"
              label="Description for Week 3"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              // Add appropriate value and onChange handlers
              // Example: value={reportData.descriptionWeek3}
              // onChange={handleInputChangeWeek3}
              sx={{ mb: 2 }}
            />
            {/* File upload */}
            <Box display="flex" alignItems="center" mb={2}>
              <label htmlFor="fileUploadInputWeek3" style={{ marginRight: '10px' }}>
                <input
                  id="fileUploadInputWeek3"
                  type="file"
                  style={{ display: 'none' }}
                  // Add appropriate onChange handler
                  // Example: onChange={handleFileUploadWeek3}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload File for Week 3
                </Button>
              </label>
              {/* Display file upload status for Week 3 if needed */}
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Submit Week 3
            </Button>
          </Box>
          
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default WeeklyReport;