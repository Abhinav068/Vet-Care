
const bookingparURL = 'http:localhost:4900'

const booktoken = localStorage.getItem('token') || null

if (!booktoken) {
    location.href = '../View/login.html'
}


const DoctorData =  JSON.parse(localStorage.getItem('localDR')) || []


const bookdate = document.getElementById('dateField')

const petcategory = document.getElementById('seletcategory')

const customerName = document.getElementById('cust-Name')


console.log("==>",DoctorData[0]._id, DoctorData[0].name)


RenderDRinfo(DoctorData[0]._id, DoctorData[0].name)


function RenderDRinfo(did, dname) {


    const timingSlots = document.getElementById('timingslots')

    const DoctorID = document.getElementById('doctorID')

    const Dname = document.getElementById('DR_name_here')


    Dname.value = dname;

    DoctorID.value = did


    // filter available slots only here


    // contains total slots from 9-6

    const TotalSlot = []


    // contains avail slot for booking


    const AvailSlots = []

    // for () {

    //     // filter free slots and store in availslot array

    // }



    const slots = AvailSlots.map((ele) => {
        return getSlot(ele)
    }).join('')

    timingSlots.innerHTML =  ` <option value="">Select Timing</option>${slots}`;


}


function getSlot(ele) {

    // return dynamically available slots

    return `
    
    <option value="${ele}">${ele}</option>
    
    `
}


function handleBookAppointMent() {


    const bookingObj = {

        doctorid,
        doctorname,
        date,
        petcategory,
        username,
        slottiming

    }


    fetch(`${bookingparURL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${booktoken}`
        },
        body: JSON.stringify(bookingObj)
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            alert('Appointment has been booked successfully !!')
        })
        .catch((err) => {
            console.log(err)
        })



}