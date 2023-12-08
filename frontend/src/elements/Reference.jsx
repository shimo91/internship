import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Link, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useData } from '../context/DataContext';
import axios from 'axios';
import { KeyboardArrowRight } from '@mui/icons-material';
import { jwtDecode } from "jwt-decode";

const Reference = () => {

  //var { datauserId } = useData();

  const token = sessionStorage.getItem("userToken");
    const decodeToken = jwtDecode(token);
    const userId = decodeToken.userid;

  var topic_id;
  //const [topic, setTopic] = useState('');
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);



  useEffect(() => {

        axios.get('http://127.0.0.1:4000/login/gettopic/'+userId)
        .then(res => {
          //setTopic(res.data);
          topic_id=res.data.topic_id;
          return axios.post('http://127.0.0.1:4000/ref/getData',{topic_Id:topic_id,refn:1} );
        })
        .then(res1 => {
          setList1(...list1, res1.data);
          //console.log(list1)
          return axios.post('http://127.0.0.1:4000/ref/getData',{topic_Id:topic_id,refn:2} );
        })
        .then(res2 => {
          setList2(...list2, res2.data);
          //console.log(list1)
          return axios.post('http://127.0.0.1:4000/ref/getData',{topic_Id:topic_id,refn:3} );
        })
        .then(res3 => {
          setList3(...list3, res3.data);
          //console.log(list1)
        })
        .catch(error => {
          // Handle errors for both requests
          console.error('Error:', error);
        });
  }, []);



  return (
    <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingTop={'20px'}>
        <Grid item xs={12} md={12} lg={12}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Material 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ width: '100%' }}>
            {list1.map((rows, i) => (
              <ListItem key={i} sx={{ width: '100%' }}>
                {rows.type === 'link' ? (
                  <Link href={rows.data} target='_blank'>
                    {rows.description}
                  </Link>
                ) : rows.type === 'file' ? (
                  <Link href={process.env.PUBLIC_URL+rows.data} download={encodeURIComponent(rows.description)}>
                    {rows.description}
                  </Link>
                ) : (
                  <ListItemText primary={rows.description} />
                )}
              </ListItem>
            ))}
          </List>

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Material 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ width: '100%' }}>
              {list2.map((row2, i) => (
                <ListItem key={i} sx={{ width: '100%' }}>
                  {row2.type === 'link' ? (
                    <Link href={row2.data} target='_blank'>
                      {row2.description}
                    </Link>
                  ) : row2.type === 'file' ? (
                    <Link href={process.env.PUBLIC_URL+row2.data} download={encodeURIComponent(row2.description)}>
                      {row2.description}
                    </Link>
                  ) : (
                    <ListItemText primary={row2.description} />
                  )}
                </ListItem>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Material 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ width: '100%' }}>
              {list2.map((row2, i) => (
                <ListItem key={i} sx={{ width: '100%' }}>
                  {row2.type === 'link' ? (
                    <Link href={row2.data} target='_blank'>
                      {row2.description}
                    </Link>
                  ) : row2.type === 'file' ? (
                    <Link href={process.env.PUBLIC_URL+row2.data} download={encodeURIComponent(row2.description)}>
                      {row2.description}
                    </Link>
                  ) : (
                    <ListItemText primary={row2.description} />
                  )}
                </ListItem>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
  )
}

export default Reference
