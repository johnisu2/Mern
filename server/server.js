const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')


const app = express()

//เชิ้อมดาต้าเบส
mongoose.set('strictQuery',false);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=>console.log(err))


//middle
app.use(express.json()) //ส่งค่าไปแบบเจสัน
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api',blogRoute)
app.use('/api',authRoute)




// app.get("*", (req,res)=>{
//     res.json({
//         data:"message from server"
//     })
// })




const port = process.env.PORT || 8080
app.listen(port, ()=>console.log(`start server in port ${port}` ))