const express=require('express')
const cors=require('cors');
const  mongoose  = require('mongoose');
const UserModel= require('./models/Users')

const app=express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://IbadUllahKhan:Ibad2004@cluster0.pbwdvv1.mongodb.net/Crud')
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ Connection Error:", err));


app.get('/',(req,res)=>{
UserModel.find({})
.then(users=>res.json(users))
.catch(err=>res.json(err))
})

app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id
    UserModel.findById({_id:id} )
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})

app.put('/UpdateUser/:id',(req,res)=>{
    const id=req.params.id
    UserModel.findByIdAndUpdate({_id:id},
        {
            name:req.body.name,
            email:req.body.email,
            age:req.body.age})

    .then(Updateusers=>res.json(Updateusers))
    .catch(err=>res.json(err))

})

app.post('/create',(req,res)=>{

    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})



app.listen(5000,()=>{
    console.log("I  am Listening You Buddy Donot Worry....");
    
})
