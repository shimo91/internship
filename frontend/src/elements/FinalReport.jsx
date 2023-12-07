import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, TextareaAutosize, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { Box} from '@mui/material';
import { Grid} from '@mui/material'


const FinalReport = () => {
  const [file, setFile] = useState();
  const [downloadfile, setDownloadfile] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [username, setUsername] = useState(''); // Add this line

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername);
    handledownload();
  }, [])


 
  useEffect(() => {
    handledownload();
  }, []);

  const userReports = downloadfile.filter((data) => data.username === username);

  const showfile = () => {
    if (userReports.length > 0) {
      const filename = userReports[0].filename;
      alert(filename);
      window.open(`http://localhost:4000/report/file/${filename}`, '_blank', 'noreferrer');
    } else {
      alert('No report found for the logged-in user.');
    }
  };

  const handledownload = async () => {
    const result = await axios.get('http://localhost:4000/report/filedata');
    console.log(result.data.data);
    setDownloadfile(result.data.data);
  };

  function handleFile(event) {
    setFile(event.target.files[0]);
    
    setHasUploaded(false); // Reset the flag when a new file is selected
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    //to check username 
    const isUsernameExists = downloadfile.some((data) => data.username === username);

    if (isUsernameExists) {
      alert('Cannot upload.Report already submitted');
      return;
    }
    

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    console.log(username)
    console.log(file);
   

    try {
      const result = await axios.post('http://localhost:4000/report/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setHasUploaded(true);
      alert('Final Report successfully submitted');
      window.location.reload(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setHasUploaded(false);
      alert('Error submitting the report. Please try again.');
    }
  };

  return (
     
    <Container>
      <Box
    sx={{
        '& .MuiTextField-root': { m: 2, width: '50ch' },padding:'3%'
    }}
   
    >
    
      <Grid container spacing={10} >
      <Grid item xs={6}>
      <div className='report_heading'><h2>Submission Page</h2></div>
     <div className='report'>
<h3>Instructions for Submitting Final Internship Report</h3>
<h4>1. Formatting Requirements:</h4>
<li>Ensure that your report is formatted according to the guidelines provided in the internship manual.</li>
<li>Use a standard font (e.g., Times New Roman, Arial) and set the font size to 12 points.</li>
<li>Double-check for consistent margins and line spacing throughout the document.</li>
<h4>2. File Format:</h4>
<li>Submit your final internship report in PDF format.</li>
<li>Use a standard font (e.g., Times New Roman, Arial) and set the font size to 12 points.</li>
<li>The file name should follow the format: "LastName_FirstName_InternshipReport.pdf."</li>
</div> 
<br></br><br></br>
</Grid>
     
     <Grid item xs={6}>
   <div className="repo-img"></div>
   <br></br><br></br><br></br>
   <form onSubmit={handleUpload}>
        {/* <h1>Submission Page</h1> */}
        <input type="file" className="formcontrol" name="file" accept="application/pdf" onChange={handleFile} required />
        <input type="text" className="formcontrol" name="username" value={username} onChange={handleFile} required />
        <button type="submit" disabled={hasUploaded} >
          Upload
        </button>
        <br></br><br></br><br></br>
      </form>
      <div>
        {/* {downloadfile.map((data) => (
          <button key={data.filename} type="submit" onClick={() => showfile(data.filename,data.username)}>
            View Report
          </button>
        ))} */}
        {userReports.length > 0 && (
          <button type="submit" onClick={showfile}>
            View Report
          </button>
        )}
      </div>
   </Grid>
   </Grid>
</Box>
</Container>
   
  );
};

export default FinalReport;
