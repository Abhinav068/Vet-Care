
const bookingparURL = 'http://localhost:4900'

const booktoken = localStorage.getItem('token') || null

if (!booktoken) {
    location.href = '../View/login.html'
}


const DoctorData = JSON.parse(localStorage.getItem('localDR')) || []

const userID = localStorage.getItem('userID') || null


const bookdate = document.getElementById('dateField')

const petcategory = document.getElementById('seletcategory')


const timingSlots = document.getElementById('booking_timingslots')

const DoctorID = document.getElementById('doctorID')

const Dname = document.getElementById('DR_name_here')


RenderDRinfo(DoctorData[0]._id, DoctorData[0].name)


const imagechangediv = document.getElementById('random_images')


const ArrayImages = ["https://acropolium.com/img/articles/on-demand-veterinary-app/img02.jpg","https://images.ctfassets.net/4f3rgqwzdznj/6DOtzwn4l2bVQi3qnIhzAW/b83b900cb429d77157de09ce1e16307e/vet_otoscope_beagles_1308010798.jpg","https://cdcssl.ibsrv.net/ibimg/smb/1920x1280_80/webmgr/0f/o/p/acadia/blade1-10.jpg.webp","https://www.thebestcalgary.com/wp-content/uploads/2020/03/Best-Vet-Clinics-in-Calgary.jpg"]



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


    const bookingObj = { doctorsid:DoctorID.value, userid:userID , petcategory:petcategory.value, bookingdate:new Date(), appointmentdate: bookdate.value}

    console.log("booking ==>",bookingObj)


    if(!confirm('Are you sure you want to book the appointment ?')){
        return
    }

    //console.log("--->",timingSlots.value)

    const slotNo = timingSlots.value.split('')[4]

    console.log(slotNo)

    fetch(`${bookingparURL}/admin/booking/${slotNo}`, {

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
            console.log("data received",data)
            alert('Appointment has been booked successfully !!')
            window.location.href="../index.html";
        })
        .catch((err) => {
            console.log(err)
        })



}