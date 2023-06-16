const { model, Schema } = require('mongoose');
const { ObjectId } = Schema.Types;
const Appointmentmodel = model('appointment', new Schema({
    doctorsid: { type: ObjectId, required: true },
    userid: { type: ObjectId, required: true },
    status: {
        code: { type: Number, default: 1, enum: [1, 2, 3] },
        name: { type: String, default: "upcoming", enum: ["cancelled", "upcoming", "closed"] },
    },
    petcategory: { type: String, required: true },
    bookingdate: { type: Date, required: true },
    appointmentdate: { type: Date, required: true },
    slotNo: { type: String, required: true },
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
//     "bookingdate": "12-09-2023",
//     "appointmentdate": "2017-02-09T03:35:02.055",
//     "slotNo": "4"
// }



