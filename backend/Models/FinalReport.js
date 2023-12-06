const mongoose = require('mongoose')
const reportSchema = mongoose.Schema({
    
    filename: {type: String},
})

const ReportData = mongoose.model('reportdatas',reportSchema)
module.exports = ReportData