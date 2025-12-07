-------------------------------------------------------------Task Management Microservices Application ----------------------------------------------------------------------

A fully containerized microservices-based Task Management System built using Node.js, Express, MongoDB, RabbitMQ, and Docker.
The system uses an event-driven architecture, where the Task Service produces messages and the Notification Service consumes them through RabbitMQ.


---------------- > Microservices Included
1️⃣ User Service
Handles:
-> User registration
-> Fetching users
-> Stores data in MongoDB.

2️⃣ Task Service (Producer)
Handles:
-> Creating tasks
-> Fetching tasks
-> Sends task_created event to RabbitMQ.
-> Stores data in MongoDB.

3️⃣ Notification Service (Consumer)
-> Listens to RabbitMQ queue
-> Processes task creation events
-> Logs/sends notifications

4️⃣ RabbitMQ
-> Acts as the message broker
-> Queue used: task_created

5️⃣ MongoDB
-> Each microservice uses MongoDB instance to store the data .


🛠 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- RabbitMQ (using amqplib)
- Docker & Docker Compose
- REST APIs
- Event-driven Architecture


 
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
 ------------------------------------
| Service                | Port      |
| ---------------------- | --------- |
| User Service           |   5000    |
| Task Service           |   5001    |  
| Notification Service   |   5002    |
| RabbitMQ               |   5672    |
| RabbitMQ Management UI |   15672   |
 ------------------------------------


🐳 Docker Setup
Start all services:
docker-compose up --build

Stop the application:
docker-compose down
