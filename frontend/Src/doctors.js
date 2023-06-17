
const doctorBaseURL = 'http:localhost:4900'

const dtoken = localStorage.getItem('token') || null;

if(!dtoken){
    location.href = '../View/login.html'
}



let obj = {
    _id:"648c89d44633c054aaf5640f",
    image:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    name:"Drstrange",
    age:34,
    available:true,
    clinicId:"648b20ef6a29595f07491533",
    email:"abc@gmail.com",
    phoneNo:987654321,
    role:"Doctor",
    slots:{
    
        slot1:{
            status:true,
            timing:"11am-11:30am",
            time:"11 00"
        },
        slot1:{
            status:false,
            timing:"11am-11:30am",
            time:"11 00"
        },
        slot1:{
            status:true,
            timing:"11am-11:30am",
            time:"11 00"
        }
    
    },
    verified:false
    }



const DoctorsData = [obj,obj,obj,obj,obj,obj]



const clinicID = localStorage.getItem('ClinicID') || null;

const DoctorDiv = document.getElementById('nit_doctor_cards');



fetchDoctorData()


function fetchDoctorData(){

    // make fetch request to get doctors data

    fetch(`${doctorBaseURL}/book/doctors/${clinicID}`)
    .then((res)=>{
        return res.text()
    })
    .then((data)=>{
        console.log(data)

        RenderDR(DoctorsData)

    })
    .catch((err)=>{
        console.log(err)
    })


}





function RenderDR(data){

    DoctorDiv.innerHTML = ''

    const doccards = data.map((ele)=>{

        if(ele.verified){

            return getCards(ele)
        }

    }).join('')


    DoctorDiv.innerHTML= doccards;

}



function getCards(ele){


    return ` 
            <div class="nit-doc-card">

                 <div>

                    <img src="${ele.image}" alt="Doctor Image">

                </div>

                <div>
                    <p>Name : ${ele.name}</p>
                    <p>Email-ID : ${ele.email}</p>
                    <p>Contact : ${ele.phoneNo}</p>
                    <p>Experience : 20+ Years</p>

                </div>

                <div>
                    <button onclick="handleAppointmentBook('${ele._id}')">Schedule Appointment</button>
                </div>


            </div>
            
        `

}




function handleAppointmentBook(dr_ID){

    const localdr = DoctorsData.filter((ele)=> ele._id===dr_ID)

    localStorage.setItem('localDR',JSON.stringify(localdr))

    // location.href = ''
}





