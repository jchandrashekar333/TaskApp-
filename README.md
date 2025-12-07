🚀 Task Management Microservices (Node.js + Docker)

A simple microservices-based Task Management System using Node.js, Express, MongoDB, RabbitMQ, and Docker.
The system follows event-driven architecture where the Task Service sends events and the Notification Service consumes them.


-> Services Ports

| Service              | Port  |
| -------------------- | ----- |
| User Service         | 5000  |
| Task Service         | 5001  |
| Notification Service | 5002  |
| RabbitMQ             | 5672  |
| RabbitMQ UI          | 15672 |
