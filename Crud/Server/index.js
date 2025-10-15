const express=require('express')
const cors=require('cors');
const  mongoose  = require('mongoose');
const UserModel= require('./models/Users')

const app=express();
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb+srv://IbadUllahKhan:Ibad2004@cluster0.pbwdvv1.mongodb.net/Crud")



app.listen(5000,()=>{
    console.log("I  am Listening You Buddy Donot Worry....");
    
})
