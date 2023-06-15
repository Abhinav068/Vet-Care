const { model, Schema } = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Appointmentmodel = model('clinic', new Schema({
    doctorsid: { type: ObjectId, required: true },
    userid: { type: ObjectId, required: true },
    status: {
        code: { type: Number, default: 1, enum: [0, 1, 2] },
        name: { type: String, default: "upcoming", enum: ["cancelled", "upcoming", "closed"] },
    },
    petcategory: {type:String, required:true},
    date: {type:Date, required:true},
    time: {type:String, required:true},
    slotNo: {type:Number, required:true},
}))


module.exports = { Appointmentmodel };

// let booking = {
//     "doctorsid": "45666",
//     "userid": "1234",
//     "status": {
//         "code": 1,
//         "name": "upcoming"
//     },
//     "petcategory": "Dog",
//     "date": "12-09-2023",
//     "time": "2pm-2:30pm",
//     "slotNo": 4
// }



