import React, { useState, useEffect} from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios'

const theme = createTheme();


function Vivavoce() {
  const [docLink, setDocLink] = useState('');
  const [reportName, setReportName] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('pending');
  const [submitted, setSubmitted] = useState(null)
  const [finalReport, setFinalReport] = useState(null)
  const email = sessionStorage.getItem('username');

  const [formErrors, setFormErrors] = useState({
    reportName: '',
    doclink: ''
  });

  useEffect(() => {
    checkSubmission() 
  })

  const validateForm = () => {
    const errors = {};
    // Add validation rules for each field
    const linkRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/
    if (!linkRegex.test(docLink)) {
      errors.doclink = 'Doc link is required';
    }

    if (reportName.trim() === '') {
      errors.reportName = 'Report name is required';
    }

    setFormErrors(errors);
    console.log("errors",errors)
    console.log("form errors",formErrors)

    // Return true if there are no errors, false otherwise
    return Object.values(errors).every((error) => error === '');
  };

  const checkSubmission = async () => {
    try {
      const response = await axios.post('http://localhost:4000/getvivavoce', {email})
      const {submitted, finalreport} = response.data

      if (submitted === true){
        setSubmitted(true)
        setFinalReport(true)
      }else{
        setSubmitted(false)
        if(finalreport === true){
          setFinalReport(true)
        }else{
          setFinalReport(false)
        }
      }
    }catch(error){
      console.error('Error: ', error)
    }
  }

  const handleSubmission = async () => {
    try {
      if (docLink.trim() !== '' && reportName.trim() !== '') {
        const response = await axios.post('http://localhost:4000/googledoclinksubmit', { docLink, reportName, email });
        setSubmissionStatus('submitted');
        console.log(response.data.message);
      } else {
        setSubmissionStatus('pending');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('pending');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {submitted === false && <Container component="main" maxWidth="md" >
          <Typography variant="h4" align='left' >Submit Google Doc Link</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="docLink"
            label="Google Doc Link"
            name="docLink"
            autoFocus
            value={docLink}
            onChange={(e) => setDocLink(e.target.value)}
            error={!!formErrors.doclink}
            helperText={formErrors.doclink}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="reportName"
            label="Report Name"
            name="reportName"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            error={!!formErrors.reportName}
            helperText={formErrors.reportName}
          />
          {finalReport === true && <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#146e87', color: (255,255,255) }}
            onClick={() => validateForm() && handleSubmission}
          >
            Submit
          </Button>
          }
          {finalReport === false && <span>Submit final report for submitting viva voce</span> 
          }
          <Typography variant="subtitle1" style={{ marginTop: theme.spacing(2) }}>
             Submission status: {submissionStatus}
          </Typography>
      </Container>
      }
      { submitted === true && <div>
        <Typography variant='h4' align='left' style={{ marginTop: theme.spacing(3)}}> Report submitted  </Typography> 
      </div>
      }
    </ThemeProvider>
  );
}

export default Vivavoce;
