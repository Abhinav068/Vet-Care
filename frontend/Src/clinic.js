// clinic javascript

const clinic_base_Url = ''

// check user token then proceed

const token = localStorage.getItem('') || null;



if(!token){
    location.href=''
}



const ClinicDiv = document.getElementById('nit_clinic_cards');



fetchClinicData()


function fetchClinicData(){

    fetch(`${clinic_base_Url}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)

        RenderClinic(data)

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

                    <img src="https://www.wealthmanagement.com/sites/wealthmanagement.com/files/veterinary-clinic.jpg" alt="Clinic">

                </div>

                <p>Name : ${ele}</p>

                <p>Address : ${ele}</p>

                <p>Opening Time : ${ele}</p>

            </div> 
            
        `

}



function handleClinicClick(id){

    localStorage.setItem('ClinicID',id)

    // move to doctors page
    
    location.href = ''
}




