const { model, Schema } = require('mongoose');
const doctormodel = model('clinic', new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    available: { type: Boolean, required: true, default: true },
    email: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    role: { type: String, required: true, default: "Doctor" },
    slots: {
        slot1: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "11am-11:30am" },
        },
        slot2: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "11:30am-12pm" },
        },
        slot3: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "12pm-12:30pm" },
        }

    },
    verified: { type: Boolean, required: true, default: false }
}))


module.exports = { doctormodel };

let doc = {
    "_id": {
        "$oid": "6489eb6144f9bda01cbcda3f"
    },
    "name": "Dr. Abc",
    "age": "34",
    "available": "true",
    "email": "abc@gmail.com",
    "phoneNo": "987654321",
    "role": "Doctor",
    "slots": {
        "slot1": {
            "status": true,
            "timing": "11am-11:30am"
        },
        "slot2": {
            "status": false,
            "timing": "11:30am-12pm"
        },
        "slot3": {
            "status": true,
            "timing": "12pm-12:30pm"
        }
    },
    "verified": true
}

