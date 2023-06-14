user={
    name,
    age,
    email,
    password,
    phoneNo,
    role:user 
}

clinic={
    name,
    address,
    doctors:[doctorid1,docid2]
}

Doctors={
    ...name,
    role:doctor
    availability:true,
    slots:{1:{status:false,timing:11-11:30}, 2:{status:false,timing:11-11:30}, 3:{status:false,timing:11-11:30}}
}

Bookings:{
    userid,
    doctorsid,
    status: upcoming || closed || cancelled,
    petcategory: Dog || cat,
    date,
    time,
    slotNo,
}


usersprofile 

doctor's profile
