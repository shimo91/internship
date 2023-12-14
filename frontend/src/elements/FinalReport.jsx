import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, TextareaAutosize, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { Box} from '@mui/material';
import { Grid} from '@mui/material';
import axiosInstance from '../Components/axiosinterceptor';
import { jwtDecode } from "jwt-decode";


const FinalReport = () => {
  const [file, setFile] = useState(null);
  const [downloadfile, setDownloadfile] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [username, setUsername] = useState('');
  const [warning, setWarning] = useState('');
  const [completionDate, setCompletionDate] = useState(null);
  const [futureDate, setFutureDate] = useState(null);
  const [link, setLink] = useState('');

  const token = sessionStorage.getItem("userToken");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.userid;
console.log('userid'+userId)
  const currentDate = new Date();

  useEffect(() => {
    axiosInstance.get('/login/getuser/'+userId)
      .then(res => {
        const start_date = res.data.start_date;
        console.log(res)
        console.log('start_date'+start_date)
        console.log('current'+currentDate)

        const formatedcompleteddate = new Date(start_date);
        setCompletionDate(formatedcompleteddate);
  
        const futureDateValue = new Date(formatedcompleteddate);
        futureDateValue.setDate(formatedcompleteddate.getDate() + 28);
        setFutureDate(futureDateValue);
  
        console.log("completiondate", formatedcompleteddate);
        console.log('futuredate', futureDateValue);
      })
      .catch(error => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername);
    handledownload();
  }, []);
  const handledownload = async () => {
    const result = await axiosInstance.get('/report/filedata');
    console.log(result.data.data);
    setDownloadfile(result.data.data);
  };

  function handleLinkChange(event) {
    setLink(event.target.value);
    setHasUploaded(false);
}
 
  const handleUpload = async (e) => {
    e.preventDefault();
   let date = Date()
   console.log(date)
   if (hasUploaded) {
    alert('Report already submitted');
    return;
}


    if (!futureDate || !completionDate) {
        console.error('futureDate or completionDate is not defined. Make sure the data is loaded.');
        return;
    }

    const isUsernameExists = downloadfile.some((data) => data.username === username);
    if (futureDate.getTime() > currentDate.getTime()) {
        setWarning(<span style={{ color: 'red' }}>Upload report allowed on or after {futureDate.toLocaleDateString()}.</span>);
        return;
    } else if (futureDate.getTime() <= currentDate.getTime() && isUsernameExists) {
        alert('Cannot upload. Report already submitted');
        return;
    }

    try {
        const result = await axiosInstance.post('/report/upload', {
            link: link,
            username: username,
        });

        setHasUploaded(true);
        alert('Final Report successfully submitted');
        // window.location.reload(false);
    } catch (error) {
        console.error('Error uploading link:', error);
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
<li>Submit your final internship report as google document link.</li>
<li>Use a standard font (e.g., Times New Roman, Arial) and set the font size to 12 points.</li>
<li>You will not be able to submit report again once submitted"</li>
</div> 
<br></br><br></br>
</Grid>
     
     <Grid item xs={6}>
   <div className="repo-img"></div>
   <br></br><br></br><br></br>
   <form onSubmit={handleUpload}>
   {warning}
      {completionDate && (
        <p>Report submission starts from: {futureDate.toLocaleDateString()}</p>

      )}
      <TextField
                label="Google Document Link"
                variant="outlined"
                fullWidth
                value={link}
                onChange={handleLinkChange}
                required
            />
        {/* <input type="file" className="formcontrol" name="file" accept="application/pdf" onChange={handleFile} required /> */}
        {/* <input type="text" className="formcontrol" name="username" value={username} onChange={handleFile} required /> */}
        <button type="submit" disabled={hasUploaded} >
          Upload
        </button>
        <br></br><br></br><br></br>
      </form>
      {/* <div>
       
        {userReports.length > 0 && (
          <button type="submit" onClick={showfile}>
            View Report
          </button>
        )}
      </div> */}
   </Grid>
   </Grid>
</Box>
</Container>
   
  );
};

export default FinalReport;
