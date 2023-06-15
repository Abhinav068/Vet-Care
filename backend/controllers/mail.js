require('dotenv').config();
const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.mailid, 
        pass: process.env.mailpass 
    }
});

transporter.sendMail({
    to:'tony281997@gmail.com', //this must be correct 
    from: "",
    subject:'testing mail',
    text:'hello there. I hope you are doing great.',
    html:'<h1>Hello</h1>'
})
.then(()=>{
    console.log('mail sent successfully');
})
.catch((err)=>{
    console.log('error sending mail');
    console.log(err);
})

// for gmail, search for 'gmail smtp server host'.