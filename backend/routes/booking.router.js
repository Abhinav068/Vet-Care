const { Router } = require('express');

const bookrouter = Router();

bookrouter.get('/', async (req, res) => {
    res.send('bookings')
})


bookrouter.get('/clinic', async (req, res) => {

    res.send('All clinics')
})

bookrouter.get('/doctors/:clinicid', async (req, res) => {
    res.send('booking posted')
})

module.exports = { bookrouter }