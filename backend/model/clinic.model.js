const { model, Schema } = require('mongoose');
const { ObjectId } = Schema.Types;
const clinicmodel = model('clinic', new Schema({
    name: { type: String },
    address: { type: String },
    opensAt: { type: String },
    closesAt: { type: String },
    // doctors: [
    //     { type: ObjectId }
    // ]
}))


module.exports = { clinicmodel };


// let clinic = {
//     "name": "clinic 2",
//     "address": "UttarPradesh",
//     "opensAt": "10am",
//     "closesAt": "6pm",
//     "doctors": [
//         "docid3",
//         "docid4"
//     ]
// }