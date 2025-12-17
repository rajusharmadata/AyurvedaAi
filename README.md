# 🌿 Ayurved AI – Ayurvedic Health Assistant

Ayurved AI is a full-stack healthcare application built using the MERN (MongoDB, Express, React, Node.js) stack. It combines ancient Ayurvedic wisdom with modern AI technology to provide personalized health recommendations.

---

## 🚀 Features

- 💬 **AI-Powered Chat**: Integrated with OpenAI to provide intelligent, context-aware Ayurvedic advice.
- 🩺 **Remedy Finder**: Database-driven remedy search for common symptoms.
- 👨‍⚕️ **Practitioner Connect**: Find and connect with Ayurvedic practitioners.
- 🧠 **Hybrid Response System**: Uses both a local knowledge base and OpenAI for comprehensive answers.
- 🔐 **Secure Authentication**: User signup and login functionality.

---

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI Integration**: OpenAI API

---

## ⚙️ Setup & Installation

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create a `config/config.env` file (see `config/config.env` for reference) and add your OpenAI API Key:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
```

Start the server:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🧪 API Testing Guide

You can test the backend APIs using Postman or cURL. The base URL is `http://localhost:5000/api/v1`.

### 1. Chat API

**Endpoint**: `POST /chat`

**Description**: Sends a user message to the bot. Returns an AI-generated response or a matched remedy from the database.

**Request Body**:
```json
{
  "message": "I have a headache and cold"
}
```

**Response (AI)**:
```json
{
  "type": "ai_response",
  "content": "Based on Ayurveda, for a headache and cold..."
}
```

**Response (Local DB)**:
```json
[
  {
    "symptoms": ["headache"],
    "remedy": ["Ginger Tea"],
    "description": "..."
  }
]
```

### 2. Authentication APIs

**Signup**: `POST /auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login**: `POST /auth/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Practitioner APIs

**Get All Practitioners**: `GET /practitioners`

---

## 📂 Project Structure

```
AyurvedAI/
├── Backend/         # Node.js & Express backend
│   ├── config/      # Configuration (DB, Env)
│   ├── controllers/ # Route logic
│   ├── module/      # Mongoose Models
│   ├── Routes/      # API Routes
│   └── server.js    # Entry point
│
├── Frontend/        # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── vite.config.js
```
