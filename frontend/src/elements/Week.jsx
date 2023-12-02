import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const WeeklyReport = () => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0]; // Access the uploaded file

    // Simulating file upload logic with a timeout (replace this with actual file upload logic)
    setTimeout(() => {
      // If upload is successful
      setFileUploaded(true); // Update state to indicate successful upload
    }, 2000); // Simulating 2 seconds of file upload time
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission (add your form submission logic here)
    // Example: Submit data to the server or perform further actions
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
        sx={{ mb: 2 }}
      />

      <TextField
        id="description"
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
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
            Upload File
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
