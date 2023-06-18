
const doctorBaseURL = 'http://localhost:4900'

const dtoken = localStorage.getItem('token') || null;

if(!dtoken){
    location.href = '../View/login.html'
}



let DoctorsData = []


const clinicID = localStorage.getItem('ClinicID') || null;

const DoctorDiv = document.getElementById('nit_doctor_cards');



fetchDoctorData()


function fetchDoctorData(){

    // make fetch request to get doctors data

    fetch(`${doctorBaseURL}/admin/getdoctors/${clinicID}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data.doctors)

        DoctorsData=data.doctors;

        RenderDR(DoctorsData)

    })
    .catch((err)=>{
        console.log(err)
    })


}





function RenderDR(data){

    DoctorDiv.innerHTML = ''

    const doccards = data.map((ele)=>{

        if(ele.verified==false){

            return getCards(ele)
        }

    }).join('')


    DoctorDiv.innerHTML= doccards;

}



function getCards(ele){


    return ` 
            <div class="nit-doc-card">

                 <div>

                    <img src="https://www.shutterstock.com/image-photo/positive-young-female-doctor-working-260nw-1958929786.jpg" alt="Doctor Image">

                </div>

                <div>
                    <p>Name : ${ele.name}</p>
                    <p>Email-ID : ${ele.email}</p>
                    <p>Contact : ${ele.phoneNo}</p>
                    <p>Experience : ${Math.floor(Math.random()*10)+1} + Years</p>

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

    location.href = '../View/booking.html'
}




function handleDoctorSearch(){


    const data=document.getElementById('doctor_search').value;

    if(data){

        const res = DoctorsData.filter((ele)=>{
            return ele.name.toLowerCase().includes(data.toLowerCase())
        })

        RenderDR(res)
    }
    else{
        
        RenderDR(DoctorsData)
    }

}


