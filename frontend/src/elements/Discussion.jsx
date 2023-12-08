import { Alert, Box, Button, Collapse, Grid, IconButton, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { jwtDecode } from "jwt-decode";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }]
    ]
}

const Discussion = () => {

    // const { setNewDataId } = useData();

    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const [htmlValue, setHtmlValue] = useState('');

    const [disData, setData] = useState('');

    const handleQuillChange = (value) => {
        setHtmlValue(value);
    };

    const inputHandler = (e) => {
        setData({ ...disData, [e.target.name]: e.target.value });
    }

    //console.log("value is :"+value)
    var dis_id;
    const token = sessionStorage.getItem("userToken");
    const decodeToken = jwtDecode(token);
    const datauserId = decodeToken.userid;
    const userName = decodeToken.username;
    const stdname = decodeToken.stdname;

    //const { datauserId } = useData();
    // const { stdname } = useData();

    const addHandler = () => {
        console.log('clicked addHandler : ');
        const titleLabelDiv = document.getElementById("titleLabel");
        const contentLabelDiv = document.getElementById("contentLabel");
        console.log("disdata title :" + disData.title + " htmlvalue : " + htmlValue)

        if (disData.title === undefined || disData.title === null || disData.title === '') {
            console.log("inside if ")
            if (titleLabelDiv) {
                // Modify the style of the div as needed
                titleLabelDiv.style.display = '';
                // Add more style modifications as needed
            }
            if (contentLabelDiv) {
                // Modify the style of the div as needed
                contentLabelDiv.style.display = 'none';
                // Add more style modifications as needed
            }
        }
        else if (htmlValue === '' || htmlValue === null || htmlValue === undefined) {
            console.log("inside else if ")
            if (contentLabelDiv) {
                // Modify the style of the div as needed
                contentLabelDiv.style.display = '';
                // Add more style modifications as needed
            }
            if (titleLabelDiv) {
                // Modify the style of the div as needed
                titleLabelDiv.style.display = 'none';
                // Add more style modifications as needed
            }
        }
        else {
            console.log("inside else")
            if (titleLabelDiv) {
                // Modify the style of the div as needed
                titleLabelDiv.style.display = 'none';
                // Add more style modifications as needed
            }
            if (contentLabelDiv) {
                // Modify the style of the div as needed
                contentLabelDiv.style.display = 'none';
                // Add more style modifications as needed
            }

            const dataToSend = {
                ...disData,
                description: htmlValue,
                username: stdname,
                userid: datauserId
                // other data if needed
            };

            axios.post('http://127.0.0.1:4000/discussion/add', dataToSend).then((res) => {
                //alert(res.data.message);
                if (res.data.message == "saved") {
                    // alert(res.data);
                    dis_id = res.data.id;
                    //console.log("data id :"+dis_id)
                    setOpen(true);

                    //setNewDataId(dis_id);
                    // Automatically close the alert after 3000 milliseconds (3 seconds)
                    setTimeout(() => {
                        setOpen(false);
                        navigate(`/viewdiscussion/${dis_id}`);
                    }, 3000);


                }
                else {
                    alert("Invalid");
                }
            }).catch(() => {
                console.log('Error!! No connection');
                alert('Invalid');
            })
        }
    }



    return (
        <div >
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" paddingTop={'20px'}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" component="h6">
                        Create a new discussion
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ width: '100%' }} name='title' onChange={inputHandler}
                    />
                    <InputLabel id={"titleLabel"} style={{ color: "red", marginTop: '5px', display: 'none' }} className='textAlignLeft' >Please write a title</InputLabel>
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ height: '100%' }}>
                    <ReactQuill theme="snow" value={htmlValue} className='editor-input' placeholder='content here' onChange={handleQuillChange} />

                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }}>
                    <InputLabel id={"contentLabel"} style={{ color: "red", marginTop: '10px', display: 'none' }} className='textAlignLeft' >Please write a content</InputLabel>
                    <Button variant='contained' sx={{ mt: 2 }} onClick={addHandler} className='commonButton'>Create Discussion</Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert

                        sx={{ mb: 2 }}
                    >
                        Added Successfully
                    </Alert>
                </Collapse>
                {/* <Button
                disabled={open}
                variant="outlined"
                onClick={() => {
                setOpen(true);
                }}
            >
                Re-open
            </Button> */}
            </Box>
        </div>
    )
}

export default Discussion
