# MERN Stack Chat Application with Socket.io

A real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) integrated with Socket.io for live, bi-directional communication.

---

## Features

- Real-time messaging between users using WebSockets (Socket.io)
- User authentication and authorization with JWT tokens
- Fetch and display chat history between users
- Responsive and clean UI built with React
- REST API backend built with Express and MongoDB for data persistence
- Easy to extend for group chats, notifications, and more

---

## Demo

![image](https://github.com/user-attachments/assets/6b89d74d-6214-44f4-ab75-3ec7e5dc25c5)

---

## Tech Stack

| Frontend       | Backend           | Real-time Communication | Database |
| -------------- | ----------------- | ----------------------- | -------- |
| React (Hooks)  | Node.js + Express | Socket.io               | MongoDB  |

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas cloud instance)
- npm or yarn

### Installation

1. Clone the repo

    ```bash
    git clone https://github.com/007jbks/MERN-Stack-Chat-Application-with-Socket.io.git
    cd MERN-Stack-Chat-Application-with-Socket.io
    ```

2. Install dependencies for server and client

    ```bash
    # Install backend dependencies
    npm install

    # Navigate to client folder and install frontend dependencies
    cd client
    npm install
    ```

3. Configure environment variables

Create a `.env` file in the root folder and add your MongoDB connection string and JWT secret, for example:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5001
    ```

4. Run the backend server

    ```bash
    npm run start
    ```

5. Run the React client (in a separate terminal window)

    ```bash
    cd client
    npm start
    ```

6. Open your browser at `http://localhost:5173`

---

## Usage

- Register and log in as a user
- See the list of available users
- Click on a user to start chatting in real-time
- Messages are sent and received instantly using Socket.io
- Chat history is saved and retrieved from MongoDB

---

## Folder Structure

