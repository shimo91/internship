import React, { useEffect, useState } from 'react'
import { useDiscussion } from '../context/DiscussionContext'
import { Alert, Box, Button, Collapse, Grid, TextField, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import { useData } from '../context/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Components/axiosinterceptor'

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }]
    ]
}

const EditDiscussion = () => {
    const navigate = useNavigate();

    const [htmlValue, setHtmlValue] = useState('')

    var { discussionId } = useDiscussion();

    if (discussionId === null) {

        discussionId = sessionStorage.getItem('discussionId');
        /// console.log("inside session :"+discussionId)
    }


    const [count, setCount] = useState(0);
    const [list, setlist] = useState([]);
    useEffect(() => {

        //const did= discussionId;

        axiosInstance.get('/discussion/get/' + discussionId).then((res) => {
            setlist(res.data);
            //console.log("list of discussion : "+res.data);
            setHtmlValue(res.data.description)
        })


    }, [count]);




    const [open, setOpen] = useState(false);

    const [disData, setData] = useState('');

    const handleQuillChange = (value) => {
        setHtmlValue(value);
    };

    const inputHandler = (e) => {
        setlist({ ...list, [e.target.name]: e.target.value });
    }

    const { datauserId } = useData();
    const { stdname } = useData();

    const editHandler = () => {
        console.log('clicked editHandler : ');

        const dataToSend = {
            ...list,
            description: htmlValue,
           // username: stdname,
            // userid: datauserId
            // other data if needed
        };
        console.log("data to send :"+dataToSend)

        axiosInstance.put('/discussion/update/' + discussionId, dataToSend).then((res) => {

            if (res.data.message == "Updated successfully") {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate(`/viewdiscussion/${discussionId}`)
                }, 3000);
                setCount(count + 1);

            }
            else {
                alert("Invalid");
            }
        }).catch(() => {
            console.log('Error!! No connection');
            alert('Invalid');
        })

    }


    return (
        <div >
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" paddingTop={'20px'}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" component="h6">
                        Create a new discussion
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12} noValidate>
                    <TextField id="outlined-basic"
                        name='title'
                        value={list.title}
                        onChange={inputHandler}
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ height: '100%' }}>
                    <ReactQuill theme="snow" value={htmlValue} className='editor-input' placeholder='content here' onChange={handleQuillChange} />
                </Grid>
                <Grid item xs={12} md={12} lg={12} >
                    <Button variant='contained' sx={{ mt: 6 }} onClick={editHandler} className='commonButton'>Update Discussion</Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert

                        sx={{ mb: 2 }}
                    >
                        Updated Successfully
                    </Alert>
                </Collapse>

            </Box>
        </div>
    )
}

export default EditDiscussion
