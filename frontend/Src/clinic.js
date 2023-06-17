// clinic javascript

const clinic_base_Url = 'http://localhost:4900'

// check user token then proceed

const token = localStorage.getItem('token') || null;



// if(!token){
//     location.href='../View/login.html'
// }



const ClinicDiv = document.getElementById('nit_clinic_cards');



const cd = [{_id:"648b20ef6a29595f07491533",name:"clinic A",address:"Lucknow",opensAt:"10am",closesAt:"6pm"},{_id:"648b20ef6a29595f07491533",name:"clinic B",address:"Lucknow",opensAt:"10am",closesAt:"6pm"},{_id:"648b20ef6a29595f07491533",name:"clinic C",address:"Lucknow",opensAt:"10am",closesAt:"6pm"},{_id:"648b20ef6a29595f07491533",name:"clinic D",address:"Lucknow",opensAt:"10am",closesAt:"6pm"},{_id:"648b20ef6a29595f07491533",name:"clinic A",address:"Lucknow",opensAt:"10am",closesAt:"6pm"},{_id:"648b20ef6a29595f07491533",name:"clinic B",address:"Lucknow",opensAt:"10am",closesAt:"6pm"}]




fetchClinicData()


function fetchClinicData(){

    fetch(`${clinic_base_Url}/book/clinic`)
    .then((res)=>{
        return res.text()
    })
    .then((data)=>{
        console.log(data)

        RenderClinic(cd)

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
    
    // location.href = ''
}




function handleSearch(){
    
    const data=document.getElementById('clinic_search').value;

    const res = cd.filter((ele)=>{
        return ele.name.toLowerCase().includes(data.toLowerCase())
    })

    RenderClinic(res)

    
}






