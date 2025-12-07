 const express = require("express");
 const dotenv  = require("dotenv").config();
 const bodyParser = require("body-parser");
 const mongoose = require("mongoose");


const app = express();
const PORT = 5000


app.use(bodyParser.json());



//mongoose Schema & Model
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

const User = mongoose.model('User',userSchema);



//MongoDb Connection
 mongoose.connect('mongodb://mongo:27017/users')
 .then(()=>console.log("Connected to the MongoDB"))
 .catch(err => console.log("Error,connecting to the MongoDB",err));

//creating the new user
app.post('/user',async(req,res)=>{
    const {name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({error:"Name and email is required"})
    }

    try{
        const user = new User({name, email});
        await user.save();
        res.status(201).json(user)
    }catch(error){
        console.error("Error saving",error)
        res.status(500).json({error:"internal server error"})

    }
})

//Fetch the all users data

app.get("/allUsers",async(req,res)=>{
    const userId = req.query.user;
    if(!userId){
        res.status(400).json({error:"User ID is required"})
    }
    try{
        const users = await User.find();
        res.json(users);

    }catch(error){
        console.error("Error Found:",error);
        res.status(500).json({error:"Internal server error"})
    }
})




 app.listen(PORT,()=>{
    console.log(`Application is running in the port: ${PORT}`);
 })