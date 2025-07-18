# 💬 Real-Time Chat Application

A full-stack real-time chat application built with the **MERN stack** and **Socket.io**, offering a smooth and interactive user experience for one-on-one messaging, complete with profile management and multimedia support.

---

## 🚀 Features

### 🔗 Real-Time Messaging
- Instant one-to-one chat using **Socket.io**
- Fast, seamless communication without refreshing the page
- Typing indicators and online/offline user status (optional)

### 🧑‍💼 User Profile Page
- Update profile picture, name, and email
- Each user has a unique profile visible to others in the chat

### 🗂️ Chat List
- Displays all users (except yourself)
- Real-time syncing of chat status and unread messages

### 🖼️ Multimedia Support
- Send and receive:
  - Text messages
  - Images (via Cloudinary or base64 preview)
  - Emojis (optional)
- Image preview before sending

### 🔒 Authentication & Authorization
- JWT-based login and signup system
- Protected routes for chat pages

---

## 🛠️ Tech Stack

### 💻 Frontend
- **React** (with Hooks)
- **Tailwind CSS** for modern responsive UI
- **Axios** for API requests
- **Socket.io-client** for WebSocket communication
- **React Router** for navigation
- **React Hot Toast** for notifications

### 🌐 Backend
- **Node.js + Express.js** – REST API and WebSocket server
- **Socket.io** – Real-time bidirectional communication
- **MongoDB + Mongoose** – Database for user and message data
- **JWT** – Authentication
- **Multer / Cloudinary** – For image handling

---

## 📁 Project Structure

chat-app/
├── client/ # React frontend
│ ├── pages/
│ ├── components/
│ ├── store/
│ └── App.jsx
├── server/ # Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── socket/ # Socket.io logic
│ └── server.js
├── .env
└── README.md

yaml
Copy
Edit

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/real-time-chat-app.git
cd real-time-chat-app
2. Setup Environment Variables
Create a .env file in the server/ folder:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

3. Install Dependencies

Server
bash
Copy
Edit

cd server
npm install

Client
bash
Copy
Edit
cd ../client
npm install

4. Run the Application

Start both client and server:

bash
Copy
Edit
# In one terminal
cd server
npm run dev

# In another terminal
cd client
npm run dev
