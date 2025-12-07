🚀 Task Management Microservices Application

A fully containerized Microservices-based Task Management System built with Node.js, Express, MongoDB, RabbitMQ, and Docker.
The system follows an Event-Driven Architecture, where the Task Service publishes events and the Notification Service consumes them via RabbitMQ.

📌 Microservices Included

1️⃣ User Service

Handles

-> User registration

-> Fetching user details

-> Stores user data in MongoDB

2️⃣ Task Service (Producer)
Handles:
-> Creating tasks
-> Fetching tasks
-> Publishes task_created event to RabbitMQ
->Stores task data in MongoDB

3️⃣ Notification Service (Consumer)
-> Listens to RabbitMQ queue
-> Consumes task_created event
-> Sends/logs notifications based on the event

4️⃣ RabbitMQ (Message Broker)
-> Manages message queues
-> Used queue: task_created

Exposes:
Port 5672 → AMQP
Port 15672 → Management Console

5️⃣ MongoDB
-> Each service uses MongoDB instance to store the data.




🛠 Tech Stack
Node.js + Express
MongoDB + Mongoose
RabbitMQ (amqplib)
Docker & Docker Compose
REST APIs
Event-Driven Architecture






📁 Project Structure
TaskApp/
│
├── user-service/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
│
├── task-service/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
│
├── notification-service/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md

🔌 Service Ports
Service	Port
User Service	5000
Task Service	5001
Notification Service	5002
RabbitMQ	5672
RabbitMQ Management UI	15672
🐳 Docker Setup
▶️ Start all services
docker-compose up --build

🛑 Stop all services
docker-compose down

🎯 Architecture Overview (Event-Driven Flow)
User → Task Service → RabbitMQ Queue → Notification Service


Task Service publishes a task_created event

RabbitMQ stores the message

Notification Service consumes and processes it
