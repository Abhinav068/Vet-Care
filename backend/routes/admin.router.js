const { Router, response } = require('express');
const { clinicmodel } = require('../model/clinic.model');
const { doctormodel } = require('../model/doctor.model');
const { Schema, Types } = require('mongoose');
const { Appointmentmodel } = require('../model/booking.model');

const adminrouter = Router();

adminrouter.get('/', async (req, res) => {
  res.send('admin space')
})

adminrouter.post('/addclinic', async (req, res) => {
  try {
    const { name, address, opensAt, closesAt } = req.body;
    const clinic = new clinicmodel({ name, address, opensAt, closesAt });
    let result = await clinic.save();
    res.status(200).send({ msg: 'clinic sucessfully added' });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error })
  }

})

adminrouter.get('/allclinic', async (req, res) => {
  try {
    let allclinic = await clinicmodel.find();
    res.status(200).send({ allclinic });
  } catch (error) {
    res.status(404).send({ error })
  }
})

adminrouter.post('/adddoctor/:clinicid', async (req, res) => {
  try {
    const { name, age, email, phoneNo, clinicId } = req.body;
    let doctor = new doctormodel({ name, age, email, phoneNo, clinicId });

    let result = await doctor.save();

    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
})

adminrouter.get('/getdoctors/:clinicid', async (req, res) => {
  try {
    const { clinicid } = req.params;
    let doctors = await doctormodel.aggregate([
      {
        '$match': {
          'clinicId': clinicid
        }
      }
    ]);

    res.status(200).send({ doctors });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
})

adminrouter.post('/booking/:slotno', async (req, res) => {
  try {
    const { doctorsid, userid, petcategory, bookingdate, appointmentdate } = req.body;
    let slotNo = req.params.slotno;
    const { ObjectId } = Types;
    let u = `slots.slot${slotNo}.status`;

    let appointment = new Appointmentmodel({
      doctorsid: new ObjectId(doctorsid),
      userid: new ObjectId(userid),
      petcategory,
      bookingdate,
      appointmentdate,
      slotNo
    });
    let response = await appointment.save();

    // let change1 = await doctormodel.findOneAndUpdate(
    //   {
    //     _id: new ObjectId(doctorsid)
    //   }, {
    //   [u]: false
    // }
    // );

    res.status(200).send({ msg: 'Appointment booked successfully' });

  } catch (error) {
    res.status(404).send({ error });
  }
})

adminrouter.get('/getappointments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { ObjectId } = Types;
    let data = await Appointmentmodel.aggregate(
      [
        {
          '$match': {
            '$or': [
              {
                'userid': new ObjectId(id)
              }, {
                'doctorsid': new ObjectId(id)
              }
            ]
          }
        }, {
          '$lookup': {
            'from': 'doctors',
            'localField': 'doctorsid',
            'foreignField': '_id',
            'as': 'docDetails'
          }
        }, {
          '$unwind': {
            'path': '$docDetails'
          }
        }, {
          '$lookup': {
            'from': 'users',
            'localField': 'userid',
            'foreignField': '_id',
            'as': 'userDetails'
          }
        }, {
          '$unwind': {
            'path': '$userDetails'
          }
        }, {
          '$project': {
            'userDetails._id': 0,
            'docDetails._id': 0,
            '__v': 0
          }
        }, {
          '$sort': {
            'status.code': 1,
            'appointmentdate': 1
          }
        }
      ]
    )
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
})

adminrouter.patch('/reschedule/:appointmentId', async (req, res) => {
  try {
    const apt_id = req.params.appointmentId;
    const { newtime } = req.body;
    const data = await Appointmentmodel.findByIdAndUpdate(apt_id, { appointmentdate: newtime }, { new: true });
    res.status(200).send({ data });
  } catch (error) {
    res.status(404).send({ error });
  }
})

module.exports = { adminrouter }