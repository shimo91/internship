import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Vivavoce() {
  const [docLink, setDocLink] = useState('');
  const [reportName, setReportName] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('pending');

  const handleSubmission = () => {
    if (docLink.trim() !== '') {
      setSubmissionStatus('submitted');
    } else {
      setSubmissionStatus('pending');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
          <Typography variant="h5">Submit Google Doc Link</Typography>
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
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmission}
          >
            Submit
          </Button>
          <Typography variant="subtitle1" style={{ marginTop: theme.spacing(2) }}>
            Submission Status: {submissionStatus}
          </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default Vivavoce;
