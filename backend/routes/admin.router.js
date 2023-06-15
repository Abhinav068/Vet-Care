const { Router } = require('express');
const { clinicmodel } = require('../model/clinic.model');

const adminrouter = Router();

adminrouter.get('/', async (req, res) => {
    res.send('admin space')
})

adminrouter.post('/addclinic', async (req, res) => {
    try {
        const { name, address, opensAt, closesAt } = req.body;
        const clinic = new clinicmodel({name,address,opensAt,closesAt});
        let result = await clinic.save();
        console.log(result);
        res.status(200).send({msg:'clinic sucessfully added'});
    } catch (error) {
        console.log(error);
        res.status(404).send({ error })
    }

})

adminrouter.get('/adddoctor/:clinicid', async (req, res) => {
    try {
        const {}=req.body;
        
    } catch (error) {
        console.log(error);
        res.status(404).send({ error });
    }

    res.send('booking posted')
})

module.exports = { adminrouter }