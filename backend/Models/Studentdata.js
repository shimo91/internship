const mongoose=require('mongoose');
const student=mongoose.Schema({
   studentId:String,
   selectedTopicTitle: String, 
   disabledTopics: [String],
})
const data=mongoose.model('students',student);
module.exports=data