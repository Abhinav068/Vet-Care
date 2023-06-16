
const bookingparURL = ''

const booktoken = localStorage.getItem('') || null

if (!booktoken) {
    location.href = ''
}


const Did = localStorage.getItem('doctorID')


const DoctorData = []


FetchDRData()


function FetchDRData() {

    fetch(`${bookingparURL}/${Did}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)

            DoctorData = data

            RenderDRinfo(data._id, data.name)

        })
        .catch((err) => {
            console.log(err)
        })


}



const bookdate = document.getElementById('dateField')

const petcategory = document.getElementById('seletcategory')

const customerName = document.getElementById('cust-Name')



function RenderDRinfo(did, dname) {


    const timingSlots = document.getElementById('timingslots')

    const DoctorID = document.getElementById('doctorID')

    const Dname = document.getElementById('DR_name_here')


    Dname.innerText = dname;

    DoctorID.innerText = did


    // filter available slots only here


    // contains total slots from 9-6

    const TotalSlot = []


    // contains avail slot for booking


    const AvailSlots = []

    for () {

        // filter free slots and store in availslot array

    }



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