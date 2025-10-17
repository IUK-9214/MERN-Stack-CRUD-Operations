const express=require('express')
const cors=require('cors');
const  mongoose  = require('mongoose');
const UserModel= require('./models/Users')

const app=express();
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb+srv://IbadUllahKhan:<db_password>@cluster0.pbwdvv1.mongodb.net/")
app.post('/Create',(req,res)=>{
    UserModel.create(req.body)
.then(user=>res.json(user))
.catch(err=>res.json(err))
})


app.listen(5000,()=>{
    console.log("I  am Listening You Buddy Donot Worry....");
    
})
