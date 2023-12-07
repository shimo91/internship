const express=require('express')
const mongoose=require('mongoose');
const router = express.Router()
const cors = require('cors');
//const student=require('../Models/Studentdata');
const student=require('../Models/StudentTopic');
const app=new express();
const jwt = require('jsonwebtoken');



router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(cors())//should be under express.json always


function verifytoken(req,res,next){
    try{
      const token=req.headers.token;
      console.log(token);
      if(!token) throw 'Unauthorized';
      let payload=jwt.verify(token,'reactempapp');
      if(!payload) throw 'Unauthorized';
      next()
    }
    catch(error){
      //console.log(error);
      res.status(401).send('error');
    }
  }

// const path=require('path');
// mongoose.connect('mongodb+srv://amaluirfana:amalu1992@emaployee.ldagpy6.mongodb.net/student?retryWrites=true&w=majority')
// .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to DB:", error);
//   });

  router.post('/add', async (req, res) => {
    try {
      const { studentId, selectedTopic: { title: selectedTopicTitle } } = req.body;
      const savedData = await new student({ studentId, selectedTopicTitle }).save();
      res.status(201).send('Added successfully');
    } catch (error) {
      console.error('Error creating entry:', error);
      res.status(500).send(error);
    }
  });
  
  
  
  
router.get('/',verifytoken, async (req, res) => {
    try {
      const data = await student.find();
       res.json(data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      res.status(404).json(error);
    }
  });

  module.exports=router;

