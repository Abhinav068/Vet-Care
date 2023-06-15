const { Router } = require('express');
const { clinicmodel } = require('../model/clinic.model');
const { doctormodel } = require('../model/doctor.model');
const { Schema } = require('mongoose');

const adminrouter = Router();

adminrouter.get('/', async (req, res) => {
    res.send('admin space')
})

adminrouter.post('/addclinic', async (req, res) => {
    try {
        const { name, address, opensAt, closesAt } = req.body;
        const clinic = new clinicmodel({ name, address, opensAt, closesAt });
        let result = await clinic.save();
        console.log(result);
        res.status(200).send({ msg: 'clinic sucessfully added' });
    } catch (error) {
        console.log(error);
        res.status(404).send({ error })
    }

})

adminrouter.post('/adddoctor/:clinicid', async (req, res) => {
    try {
        const { name, age, email, phoneNo } = req.body;
        let doctor = new doctormodel({ name, age, email, phoneNo });

        let result = await doctor.save();
        console.log(result);
        res.status(200).send({ result });
    } catch (error) {
        console.log(error);
        res.status(404).send({ error });
    }
})

adminrouter.patch('/booking/:slotno', async (req, res) => {
    let slotno = req.params.slotno;
    const { ObjectId } = Schema.Types;
    let u=`slots.slot${slotno}.status`;
    let change = await doctormodel.aggregate([
        {
          '$match': {
            'name': "Dr. strange"
          }
        }, {
          '$set': {
            "slots.slot2.status": false
          }
        }
      ]);

    res.send(change)
})
module.exports = { adminrouter }