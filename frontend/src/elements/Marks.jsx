import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { jwtDecode } from "jwt-decode";
import axiosInstance from '../Components/axiosinterceptor'

const Marks = () => {

  const [week1, setWeek1] = useState(null)
  const [week2, setWeek2] = useState(null)
  const [week3, setWeek3] = useState(null)
  const [final, setFinal] = useState(null)
  const [viva, setViva] = useState(null)


  const token = sessionStorage.getItem("userToken");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.username;

  useEffect(() => {
    getMarks()
  })
  const getMarks = async () => {
    const response = await axiosInstance.get(`http://localhost:4000/marks/${userId}`);
    console.log(response)

    const {week_1_marks, week_2_marks, week_3_marks, finalreport_marks, vivavoce_marks} = response.data.marks

    setWeek1(week_1_marks)
    setWeek2(week_2_marks)
    setWeek3(week_3_marks)
    setFinal(finalreport_marks)
    setViva(vivavoce_marks)

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
            <h3> {week1} Marks </h3>
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
            <h3> {week2} Marks </h3>
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
            <h3> {week3} Marks</h3>
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
            <h3> {final} Marks</h3>
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
            <h3> {viva} Marks</h3>
          </Typography>}
        </AccordionDetails>
      </Accordion>
      </Box>
  );
};

export default Marks;