import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const modules = {
    toolbar: [
        [{header : [1,2,3,4,5,6, false] }],
        [{font : [] }],
        [{size : []}]
    ]
}

const Discussion = () => {
    const [value, setValue] = useState('');
    
    

  return (
    <div >
        <Grid container spacing={2} direction="row"  justifyContent="center"  alignItems="center" paddingTop={'20px'}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h6" component="h6">
                    Create a new discussion
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <TextField id="outlined-basic" label="Title" variant="outlined" sx={{width:'100%'}} />

            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{height:'100%'}}>
                <ReactQuill 
                    theme="snow" 
                    value={value} 
                    onChange={setValue} 
                    className='editor-input'
                    placeholder='content here'
                    
                    />;
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Button variant='contained' sx={{mt:2}}>Create Discussion</Button>
            </Grid>
        </Grid>
    </div>
  )
}

export default Discussion
