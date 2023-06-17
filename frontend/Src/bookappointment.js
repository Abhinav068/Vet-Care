
const bookingparURL = 'http://localhost:4900'

const booktoken = localStorage.getItem('token') || null

// if (!booktoken) {
//     location.href = '../View/login.html'
// }


const DoctorData = JSON.parse(localStorage.getItem('localDR')) || []

const userID = localStorage.getItem('userID') || null


const bookdate = document.getElementById('dateField')

const petcategory = document.getElementById('seletcategory')


const timingSlots = document.getElementById('booking_timingslots')

const DoctorID = document.getElementById('doctorID')

const Dname = document.getElementById('DR_name_here')


RenderDRinfo(DoctorData[0]._id, DoctorData[0].name)


const imagechangediv = document.getElementById('random_images')


const ArrayImages = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFq_GsDd9rLTifpGi809DqAQClHBDBa-KTbA&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQLkYMmYOhpMSM574K-y_cwgdoK-f8_3QdQ&usqp=CAU", "https://www.marketplace.org/wp-content/uploads/2021/08/veterinary-care.jpg?fit=2800%2C1866", "https://cdn.sanity.io/images/0vv8moc6/dvm360/054a7b14abf5e97fd9b874b2e7f99a9e04c4b6fa-5050x3366.jpg"]



setInterval(() => {
    imagechangediv.innerHTML = `<img src="${ArrayImages[(Math.floor(Math.random() * 10)) % 4]}" alt="Image" />`
}, 3000)




function RenderDRinfo(did, dname) {

    Dname.value = dname;

    DoctorID.value = did


    // filter available slots only here


    const TotalSlot = DoctorData[0].slots

    // console.log("slots",TotalSlot)


    // contains avail slot for booking


    const AvailSlots = []

    for (let slot in TotalSlot) {

        // filter free slots and store in availslot array

        if (TotalSlot[slot].status) {
            AvailSlots.push(TotalSlot[slot].timing)
        }
    }


    const slots = AvailSlots.map((ele, i) => {
        return getSlot(ele, i + 1)
    }).join('')

    timingSlots.innerHTML = `<option value="">Select Timing</option>${slots}`;



}


function getSlot(ele,i) {

    return `<option value="slot${i}">${ele}</option>`
}


function handleBookAppointMent() {

    if(!Dname || !DoctorID || !bookdate.value || !petcategory.value || !timingSlots.value){
        alert('Kindly Enter All required Details !!')
        return
    }


    const bookingObj = { doctorsid:DoctorID.value, userid:userID , petcategory:petcategory.value, bookingdate:bookdate.value, appointmentdate:new Date() }

    console.log("booking ==>",bookingObj)


    fetch(`${bookingparURL}/admin/booking/${timingSlots.value}`, {
        method: 'PATCH',
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