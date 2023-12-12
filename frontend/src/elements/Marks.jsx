import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { jwtDecode } from "jwt-decode";
import axiosInstance from '../Components/axiosinterceptor'

const Marks = () => {

  const [week1, setWeek1] = useState(null)
  const [week2, setWeek2] = useState(null)
  const [week3, setWeek3] = useState(null)
  const [final, setFinal] = useState(null)
  const [viva, setViva] = useState(null)

  const [cmnts1, setCmnts1] = useState('')
  const [cmnts2, setCmnts2] = useState('')
  const [cmnts3, setCmnts3] = useState('')
  const [cmntsfinal, setCmntsFinal] = useState('')
  const [cmntsviva, setCmntsViva] = useState('')


  const token = sessionStorage.getItem("userToken");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.username;

  useEffect(() => {
    getMarks()
  })
  const getMarks = async () => {
    const response = await axiosInstance.get(`/marks/${userId}`);
    console.log(response)

    const {week_1_marks, week_2_marks, week_3_marks, finalreport_marks, vivavoce_marks, week_1_cmnts, week_2_cmnts, week_3_cmnts, final_cmnts, viva_cmnts} = response.data.marks

    setWeek1(week_1_marks)
    setWeek2(week_2_marks)
    setWeek3(week_3_marks)
    setFinal(finalreport_marks)
    setViva(vivavoce_marks)

    setCmnts1(week_1_cmnts)
    setCmnts2(week_2_cmnts)
    setCmnts3(week_3_cmnts)
    setCmntsFinal(final_cmnts)
    setCmntsViva(viva_cmnts)

    console.log(week1)
  }
  

  return (
    <Box width='100%'>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Week 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {week1 === '' && <Typography >
          Marks not uploaded
          </Typography>}
          {week1 && <Typography >
          <Grid container >
          <Grid item xs={12} > <h2> {week1} Marks </h2> </Grid>
          <Grid item xs={12}> <p> Comments: {cmnts1}</p></Grid>
          </Grid>
          </Typography>}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Week 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {week2 === '' && <Typography>
        Marks not uploaded
          </Typography>}
          {week2 && <Typography>
            <Grid container >
          <Grid item xs={12} > <h2> {week2} Marks </h2> </Grid>
          <Grid item xs={12}> <p> Comments: {cmnts2}</p></Grid>
          </Grid>
          </Typography>}
        </AccordionDetails>
        </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Week 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {week3 === '' && <Typography>
        Marks not uploaded
          </Typography>}
          {week3 && <Typography>
            <Grid container >
          <Grid item xs={12} > <h2> {week3} Marks </h2> </Grid>
          <Grid item xs={12}> <p> Comments: {cmnts3}</p></Grid>
          </Grid>
          </Typography>}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>Final Report</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {final === '' && <Typography>
        Marks not uploaded
          </Typography>}
          {final && <Typography>
            <Grid container >
          <Grid item xs={12} > <h1> {final} Marks </h1> </Grid>
          <Grid item xs={12}> <p> Comments: {cmntsfinal}</p></Grid>
          </Grid>
          </Typography>}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography>Viva voce</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {viva === '' && <Typography>
        Marks not uploaded
          </Typography>}
          {viva && <Typography>
            <Grid container >
          <Grid item xs={12} > <h1> {viva} Marks </h1> </Grid>
          <Grid item xs={12}> <p> Comments: {cmntsviva}</p></Grid>
          </Grid>
          </Typography>}
        </AccordionDetails>
      </Accordion>
      </Box>
  );
};

export default Marks;