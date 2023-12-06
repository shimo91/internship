const mongoose = require('mongoose');
const topicShema=mongoose.Schema({
    studentId:String,
    selectedTopicTitle:String,
    disabledTopics:Array
})
const StudentTopic=mongoose.model('student',topicShema);
module.exports=StudentTopic;