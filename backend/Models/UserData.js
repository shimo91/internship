const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
})

const UserData = mongoose.model('userdatas',userSchema)
module.exports = UserData