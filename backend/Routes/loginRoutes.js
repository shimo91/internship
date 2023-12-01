const express = require('express')
const router = express.Router()
const userData = require('../Models/UserData')
const jwt = require('jsonwebtoken')
const cors = require('cors')


router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(cors())

router.get('/',async (req, res) => {
    try{
        const data = await userData.find()
        res.status(200).json(data)
    }
    catch(error){
        console.log(error)
    }
})




router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)

        
            const user = await userData.findOne({ username, password });

        if (user) {
            //console.log('User found'+user._id);

            // Generate token with a unique identifier (e.g., user ID)
            let payload = { username: username, password: password ,userid : user._id};
            const token = jwt.sign(payload, 'yourSecretKey');

            // Send success response with token
         res.status(200).json({ message: 'success', token });
            // res.status(200).json(user);

        } else {
            console.log('User not found');
            // Authentication failed
            res.status(401).send('Invalid credentials');
        }
}catch (err) {
        console.error('Error finding user:', err);
        res.json({ success: false });
        return;
    }
})
module.exports = router;