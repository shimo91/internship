const express = require('express')
const app = new express()
require('dotenv').config()
const cors = require('cors')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT

const morgan= require('morgan');
app.use(morgan('dev'));

require('./config/dbConnection')

// signup route
const signupRoutes = require('./Routes/signupRoutes')
app.use('/signup', signupRoutes)



const loginRoutes = require('./Routes/loginRoutes')
app.use('/login',loginRoutes)

<<<<<<< HEAD
const reprotRoutes = require('./Routes/reportRoutes')
app.use('/report',reprotRoutes)



const routerFile = require('./Routes/discussion');
=======
const routerFile = require('./Routes/forum');
>>>>>>> 49634681a42a8f82226683db02a49e62b706d98b
app.use('/discussion',routerFile);

const routerCommentFile = require('./Routes/comment');
app.use('/comment',routerCommentFile);

const routerstudent = require('./Routes/Sdashboard');
app.use('/sdashbaord',routerstudent);

const routerweek = require('./Routes/Week');
app.use('/week',routerweek);

const routerReplyFile = require('./Routes/reply');
app.use('/reply',routerReplyFile);

app.listen(PORT,()=>{
    console.log('Listening to '+ PORT)
})