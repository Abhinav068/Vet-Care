const { model, Schema } = require('mongoose');
const doctormodel = model('doctor', new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    available: { type: Boolean, required: true, default: true },
    clinicId: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    role: { type: String, required: true, default: "Doctor" },
    slots: {
        slot1: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "11am-11:30am" },
            time: { type: String, required: true, default: "11 00" },
        },
        slot2: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "11:30am-12pm"},
            time: { type: String, required: true, default: "11 30" },
        },
        slot3: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "12pm-12:30pm"},
            time: { type: String, required: true, default: "12 00" },
        },
        slot4: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "12:30pm-01:00pm"},
            time: { type: String, required: true, default: "12 30" },
        },
        slot5: {
            status: { type: Boolean, required: true, default: true },
            timing: { type: String, required: true, default: "01:00pm-12:30pm"},
            time: { type: String, required: true, default: "01 00" },
        },

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
    "clinicId": "6489f6fb44f9bda01cbcda47",
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

