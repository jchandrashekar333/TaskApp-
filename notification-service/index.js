

const amqp = require("amqplib");


let channel,connection;    
async function start(){
   try{
        connection = await amqp.connect("amqp://rabbitmq");
        channel = await connection.createChannel();

        await channel.assertQueue("taskk_created");
        console.log("Notification service is listing to the queue for the message");

        await channel.consume('task_created',(msg)=>{
            const taskData = JSON.parse(msg.content.toString());
            console.log("Notification: NEW MESSAGE :", taskData.title);
            console.log("NOtification: NEW MESSAGE :",taskData);
            channel.ack(msg); 
        })

   }catch(error){
        console.error("RabbitMQ connection ERROR:",error.message);

    }
}




start();

