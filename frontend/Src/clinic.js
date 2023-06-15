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

                    <img src="${ele.image}" alt="Clinic Image">

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
    
    location.href = ''
}


// clinic schema

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
