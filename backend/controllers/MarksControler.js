const UserData = require('../Models/UserData');

const getMarks = async(req,res) => {
    try {
    const username = req.params.id ;

    const user = await UserData.findOne({username});

    const marksData = {
        week_1_marks: user.week_1_marks ? user.week_1_marks: '',
        week_2_marks: user.week_2_marks ? user.week_2_marks: '',
        week_3_marks: user.week_3_marks ? user.week_3_marks: '',
        finalreport_marks: user.finalreport_marks ? user.finalreport_marks: '',
        vivavoce_marks: user.vivavoce_marks ? user.vivavoce_marks: '',
    }
    console.log(marksData)
    console.log(user)
    res.status(200).json({marks: marksData})
    } catch (error) {
        console.log(error)
        res.status(200).json({message: 'User not found'})
        
    }
    

}

module.exports = getMarks