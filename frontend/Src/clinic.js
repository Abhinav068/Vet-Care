// clinic javascript

const clinic_base_Url = 'https://plain-gray-moccasins.cyclic.app'

// check user token then proceed

const token = localStorage.getItem('token') || null;


if(!token){
    location.href='../View/login.html'
}


const ClinicDiv = document.getElementById('nit_clinic_cards');

let AllClinicData = []



fetchClinicData()


function fetchClinicData(){

    fetch(`${clinic_base_Url}/admin/allclinic`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data.allclinic)

        AllClinicData=data.allclinic;

        RenderClinic(AllClinicData)

    })
    .catch((err)=>{
        console.log(err)
    })


}





function RenderClinic(data){

    ClinicDiv.innerHTML = ''

    const cliniccards = data.map((ele)=>{

        return getCards(ele)
    
    }).join('')


    ClinicDiv.innerHTML= cliniccards;

}



function getCards(ele){


    return ` <div onclick="handleClinicClick('${ele._id}')" class="nitesh-cli-card">

                <div>

                    <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg" alt="Clinic Image">

                </div>

                <p>Name : ${ele.name}</p>

                <p>Address : ${ele.address}</p>

                <p>Opening Time : ${ele.opensAt}</p>
                <p>Closing Time : ${ele.closesAt}</p>

            </div> 
            
        `

}



function handleClinicClick(id){

    localStorage.setItem('ClinicID',id)

    // move to doctors page
    
    location.href = '../View/doctors.html'
}




function handleSearch(){
    
    const data=document.getElementById('clinic_search').value;

    if(data){

        const res = AllClinicData.filter((ele)=>{
            return ele.name.toLowerCase().includes(data.toLowerCase())
        })

        RenderClinic(res)
    }
    else{
        
        RenderClinic(AllClinicData)
    }



    
}






