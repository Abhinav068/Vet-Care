
const doctorBaseURL = ''

const dtoken = localStorage.getItem('') || null;

if(!dtoken){
    location.href = ''
}

const clinicID = localStorage.getItem('ClinicID') || null;

const DoctorDiv = document.getElementById('nit_doctor_cards');



fetchDoctorData()


function fetchDoctorData(){

    // make fetch request to get doctors data

    fetch(`${doctorBaseURL}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)

        RenderDR(data)

    })
    .catch((err)=>{
        console.log(err)
    })


}





function RenderDR(data){

    DoctorDiv.innerHTML = ''

    const doccards = data.map((ele)=>{

        return getCards(ele)
    
    }).join('')


    DoctorDiv.innerHTML= doccards;

}



function getCards(ele){


    return ` 
            <div class="nit-doc-card">

                 <div>

                    <img src="${}" alt="Doctor Image">

                </div>

                <div>
                    <p>Name : ${}</p>
                    <p>Email-ID : ${}</p>
                    <p>Contact : ${}</p>
                    <p>Experience : ${}</p>

                </div>

                <div>
                    <button onclick="handleAppointmentBook('${}')">Schedule Appointment</button>
                </div>


            </div>
            
        `

}




function handleAppointmentBook(dr_ID){

    localStorage.setItem('doctorID',dr_ID)

    location.href = ''
}





// clinic schema

// _id
// name:"clinic 2"
// img:url
// address:"UttarPradesh"
// opensAt:"10am"
// closesAt:"6pm"
// doctors:[1,2,3,4,5,6,7,8,9]


// doctors schema


//_id
// name:"Dr Def"
// age:"34"
// available:"true"
// email:"abc@gmail.com"
// phoneNo:"987654321"
// role:"doctor"
// slots:{ slot1 : { timing:, status: } }
// verified :false

