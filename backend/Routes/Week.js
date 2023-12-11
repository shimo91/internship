// Your router file
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Weekdata = require('../Models/Weekdata.js');
const UserData = require('../Models/UserData');

// ... (other middleware and functions)

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
  },
});

const jwt = require('jsonwebtoken');

function verifytoken(req,res,next){
    try {
        const token = req.headers.token;
       // console.log("token :"+token)
        if(!token) throw 'Unauthorized';
        let payload=jwt.verify(token,'yourSecretKey');
        if(!payload) throw 'Unauthorized';
        //res.status(200).send(payload);
        req.authUser = payload;
        next();
    } catch (error) {
        res.status(401).send('Error')
    }
}

router.post('/upload', verifytoken, upload.single('file'), async (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded');
  }

  try {
      // Extract the user email from the authenticated user's data
      const userEmail = req.authUser.username;
       // Assuming email is stored in 'username' field of authUser
console.log(userEmail);
      // Find the user based on the extracted email or username
      const user = await UserData.findOne({ username: userEmail });

      console.log("fetched user",user);
      if (!user) {
          return res.status(404).send('User not found');
      }

      const newFile = new Weekdata({
          file: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
              originalName: req.file.originalname,
          },
          userid: user._id, 
          week1Submitted: true,// Assign the user's ID to the 'userid' field
          // Add other fields related to the uploaded file or report if needed
          // ...
      });

      await newFile.save();
      
      return res.status(200).send('File uploaded successfully and processed.');
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Failed to upload file.');
  }
});
// Assuming you have already set up your routes and necessary imports
// Add this route to handle Week 2 submission

router.post('/week2', verifytoken, upload.single('file'), async (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded');
  }

  try {
      // Extract the user email from the authenticated user's data
      const userEmail = req.authUser.username;
       // Assuming email is stored in 'username' field of authUser
console.log(userEmail);
      // Find the user based on the extracted email or username
      const user = await UserData.findOne({ username: userEmail });

      console.log("fetched user",user);
      if (!user) {
          return res.status(404).send('User not found');
      }

      const newFile = new Weekdata({
          file: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
              originalName: req.file.originalname,
          },
          userid: user._id, 
          week2Submitted: true,// Assign the user's ID to the 'userid' field
          // Add other fields related to the uploaded file or report if needed
          // ...
      });

      await newFile.save();
      
      return res.status(200).send('File uploaded successfully and processed.');
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Failed to upload file.');
  }
});

router.post('/week3', verifytoken, upload.single('file'), async (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded');
  }

  try {
      // Extract the user email from the authenticated user's data
      const userEmail = req.authUser.username;
       // Assuming email is stored in 'username' field of authUser
console.log(userEmail);
      // Find the user based on the extracted email or username
      const user = await UserData.findOne({ username: userEmail });

      console.log("fetched user",user);
      if (!user) {
          return res.status(404).send('User not found');
      }

      const newFile = new Weekdata({
          file: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
              originalName: req.file.originalname,
          },
          userid: user._id, 
          week3Submitted: true,// Assign the user's ID to the 'userid' field
          // Add other fields related to the uploaded file or report if needed
          // ...
      });

      await newFile.save();
      
      return res.status(200).send('File uploaded successfully and processed.');
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Failed to upload file.');
  }
});

router.get('/submission/:id',verifytoken, async (req, res) => {
  try 
  {
      const id=req.params.id;
      //console.log('Query:', await Weekdata.find({ userid: id }));
      const totalDocuments  = await Weekdata.countDocuments({"userid": id});
      //const userIdExists = totalDocuments > 0;

      //console.log("total submsn :"+totalDocuments)
      res.status(200).send({message:'total',total:totalDocuments});
  }
  catch (error) 
  {
      console.log("error is :"+error)
      res.status(404).send('Error!!');
  }
})



module.exports = router;
