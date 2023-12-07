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

const reprotRoutes = require('./Routes/reportRoutes')
app.use('/report',reprotRoutes)




const routerFile = require('./Routes/forum');
app.use('/discussion',routerFile);

const routerCommentFile = require('./Routes/comment');
app.use('/comment',routerCommentFile);

const routerstudent = require('./Routes/Sdashboard');
app.use('/sdashboard',routerstudent);

const routerweek = require('./Routes/Week');
app.use('/week',routerweek);

<<<<<<< HEAD
const routertopic = require('./Routes/topic');
app.use('/topic', routertopic);

=======
const routerReplyFile = require('./Routes/reply');
app.use('/reply',routerReplyFile);
>>>>>>> 281e8007c06a50cdd406d76cfcb541903b5d3308

app.listen(PORT,()=>{
    console.log('Listening to '+ PORT)
})