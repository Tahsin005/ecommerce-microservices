# E-Commerce Microservices Platform

A robust, scalable, and fully containerized E-Commerce platform built using a microservices architecture. The system is designed to handle users, products, carts, orders, payments, and notifications, communicating through a combination of REST APIs, gRPC, and message queues.

## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![gRPC](https://img.shields.io/badge/gRPC-009688?style=for-the-badge&logo=grpc&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)

## Architecture & Design Patterns

This platform is structured around a **Microservices Architecture**, breaking down the e-commerce domain into specific, manageable services:

- **User Service:** Manages user authentication, registration, and profile data.
- **Product Service:** Handles product catalog, categories, and inventory management. Implements **Redis** caching for lightning-fast retrieval.
- **Cart Service:** Manages shopping carts and synchronizes latest prices via gRPC.
- **Order Service:** Handles order placement, inventory reservation rollbacks, and cancellations.
- **Payment Service:** Processes (mock) payments and transitions order states.
- **Notification Service:** Dispatches asynchronous events (like order confirmations) to users.
- **API Gateway:** Serves as the single entry point for clients, routing requests to the appropriate backend services and centrally verifying JWT tokens.

### Design Patterns Used
* **Controller-Service-Repository (CSR) Pattern:** Each microservice strictly separates concerns to ensure maintainability and testability. 
  * *Controllers (Handlers)* manage HTTP request/response parsing and route handling.
  * *Services* encapsulate the core business logic and cross-service orchestration.
  * *Repositories* abstract away data access and database operations (Mongoose/MongoDB).
* **Factory Design Pattern:** Utilized heavily within the Notification Service to dynamically instantiate and manage different types of notification strategies (e.g., Email, SMS, Push) depending on the incoming event payload.
* **Asynchronous Event-Driven Architecture:** Uses **RabbitMQ** to publish and subscribe to domain events (e.g., `order.confirmed`). This allows downstream services to react to state changes without tight synchronous coupling.
* **Synchronous RPC Communication:** Uses **gRPC** for low-latency, internal, and reliable communication between microservices (e.g., Cart Service verifying stock with the Product Service, Order Service fetching User metadata).

## Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (v22+ recommended for local development)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tahsin005/ecommerce-microservices.git
   cd ecommerce-microservices
   ```

2. **Setup Environment Variables**
   The project provides `.env.example` files for each service. You must copy these over to actual `.env` files before running the project.
   
   From the root directory, you can run this command to easily copy all of them:
   ```bash
   for f in $(find . -name ".env.example"); do cp "$f" "${f%.example}"; done
   ```
   *(Note: Ensure the `JWT_SECRET` in the `user-service` and `gateway` `.env` files match each other).*

3. **Start the Application**
   Use Docker Compose to build and spin up all microservices, databases (MongoDB, Redis), and message brokers (RabbitMQ) in one command:
   ```bash
   docker compose -f docker/docker-compose.yml up -d --build
   ```

4. **Verify Deployment**
   The API Gateway will be exposed on port `80` (or `localhost`).
   You can begin interacting with the REST API directly through the gateway.
