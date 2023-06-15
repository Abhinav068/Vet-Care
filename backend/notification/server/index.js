

require("dotenv").config();
const express = require("express")
const app = express()
const router = require("./routes/router")
const cors = require("cors")

const port  = 8000


app.use(express.json())
app.use(cors())
app.use(router)

// app.get("/",(req,res)=>{
//     res.send("running")
// })

app.listen(port,()=>{
    console.log(`serveris runnint at ${port}`)
})