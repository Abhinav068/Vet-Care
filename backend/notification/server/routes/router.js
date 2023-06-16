const express = require("express")

const router = new express.Router()
const nodemailer = require("nodemailer");



router.post("/notification",(req,res)=>{
    // console.log(req.body)

    const{email}=req.body;

    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
            })

            const mailOption = {
                from : process.env.EMAIL,
                to : email,
                //taking mail from line no 11
                subject: "Confirmation of Your Pet's Appointment with the Veterinarian",
                html:`<pre><h4>We are pleased to inform you that your appointment with the veterinarian has been successfully booked.
We look forward to providing the best possible care for your beloved pet.</h4>
<p>In the event that you need to reschedule or cancel your appointment,
we kindly request that you contact our clinic at least 24 hours in advance,as this will allow us to offer the time slot to another pet owner in need.
Our team of dedicated veterinarians and staff members is committed to providing compassionate and comprehensive care to your furry friend.
We look forward to seeing you and your pet soon.
If you have any further questions or require additional information, please feel free to contact us at 9876543210.</p>
<h4>Thank you for reaching out to us for your pet's healthcare needs.</h4>
                    
                    </pre>`
            }
            transporter.sendMail(mailOption,(error,info)=>{
                if(error){
                    console.log("error",error)
                }
                else{
                    console.log("mail sent" + info.response);
                    res.status(201).json({status:201,info} )
                }
            })

        
    } catch (error) {
        res.status(201).json({status:401,error} )
    }

});

module.exports = router