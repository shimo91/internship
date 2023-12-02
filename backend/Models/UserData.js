const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        index: true 
    },
    password: {
        type:String,
        required: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    phone: {
        type: String
    }
})

const UserData = mongoose.model('userdata',userSchema)
module.exports = UserData