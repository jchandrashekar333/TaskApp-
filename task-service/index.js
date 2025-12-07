const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const amqp = require("amqplib")

const app = express();
const PORT = 5001

app.use(bodyParser.json());


//creating the schema & model for the task
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    
    },
    userId:{
        type : String,
        required: true
    },
    status:{
        type: String,
        default: "pending"

    }
},{timestamps : true })


const Task = mongoose.model("Task",taskSchema);




//mongoose Connection   
mongoose.connect("mongodb://mongo:27017/tasks")
.then(()=>console.log("Mongodb is connected successfully"))
.catch(err=>console.log("error occured while connecting to the mongodb",err));


//creating the task
app.post("/task",async(req,res)=>{
    const {title,description,userId,status} = req.body;

    if(!title || !userId){
        return res.status(400).json({error: "Name and user is requried to create the task"})
    }
    try{
        const task = new Task({title,description,userId,status});
        await task.save();
        const message = {taskId:task._id, userId, title}
        if(!channel){
            return res.status(503).json("RabbitMQ is not connected");
        }

        channel.sendToQueue("task_created", Buffer.from(JSON.stringify(message)));



        res.status(201).json(task)
    }catch(error){
        console.error("Error is:",error);
        res.status(500).json({error:"Internal server error"});

    }
})


//fetch All Tasks that are related to that PARTICULAR USER
app.get("/alltasks",async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.send(tasks);

    }catch(error){
        console.error("Error is due to :",error);
        res.status(500).json({error:"Internal server error"})
    }
})


let channel,connection;

async function connectTheRabbitMQWithRetry(retries = 5, delay = 3000){
    while(retries){
        try{

            connection = await amqp.connect("amqp://rabbitmq");
            channel = await connection.createChannel();
            await channel.assertQueue("task_created");
            console.log("producer connected to the rabbitMQ");
            return;
        }catch(error){
            console.error("connection failed :",error.message);
            retries--;
            console.log("retrying agian :",retries);
            await new Promise(res =>setTimeout(res, delay));

        }
    }
}




app.listen(PORT,()=>{
    console.log(`this task service server is running in the ${PORT}`);
    connectTheRabbitMQWithRetry();
})  