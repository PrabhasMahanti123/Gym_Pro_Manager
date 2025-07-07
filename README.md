# 🏋️‍♂️ Gym Pro Manager

**Gym Pro Manager** is a comprehensive **MERN stack** application designed to streamline gym management. It allows administrators to manage users and create workout slots, while users can book these slots, view workout guides, and manage their appointments. The application features **role-based access control**, ensuring a secure and tailored experience for both regular users and administrators.

---

## ✨ Features

### 👤 User Features
- 🔒 **Secure Authentication:** Register & log in securely using JWT.
- 📺 **Workout Guides:** Access workout categories (Chest, Back, Legs, etc.) with video tutorials.
- 🗓️ **Slot Booking:** Browse and book available gym slots by date and time.
- 📋 **Appointment Management:** View all your booked appointments.
- 🔔 **Notifications:** Get real-time alerts for important events (e.g., new slot availability).
- 🧑 **Profile Management:** View your profile information.

### 🛠️ Admin Features
- 👥 **User Management:**  
  - View all registered users  
  - Search by name/email  
  - Block/unblock users
- 🗓️ **Slot Management:**  
  - Create new slots for specific dates  
  - Define time ranges & capacity  
  - View all slots, filter by date
- 📊 **Dashboard:** Quick access to all management features

---

## 🛠️ Tech Stack

**Frontend:**  
⚛️ React &nbsp; | &nbsp; 🛠️ Redux Toolkit &nbsp; | &nbsp; 🧭 React Router &nbsp; | &nbsp; 🎨 Ant Design &nbsp; | &nbsp; 📡 Axios &nbsp; | &nbsp; 🕒 Moment.js

**Backend:**  
🟢 Node.js &nbsp; | &nbsp; 🚂 Express.js &nbsp; | &nbsp; 🍃 MongoDB &nbsp; | &nbsp; 🗄️ Mongoose &nbsp; | &nbsp; 🔑 JWT &nbsp; | &nbsp; 🔒 bcryptjs

**Development:**  
🔁 Concurrently &nbsp; | &nbsp; 🔄 Nodemon

---

## 🚀 Getting Started

### 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/atlas))

### 🛠️ Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/PrabhasMahanti123/Gym_Pro_Manager
    cd Gym_Pro_Manager
    ```

2. **Set up the Backend:**
    - Navigate to the root directory.
    - Install server dependencies:
      ```sh
      npm install
      ```
    - Create a `.env` file in the root directory and add:
      ```env
      MONGODB_URL=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      PORT=8000
      ```

3. **Set up the Frontend:**
    - Navigate to the `client` directory:
      ```sh
      cd client
      ```
    - Install client dependencies:
      ```sh
      npm install
      ```

---

### ▶️ Running the Application

From the root directory, run:

```sh
npm run dev
```

- Backend: [http://localhost:8000](http://localhost:8000)
- Frontend: [http://localhost:3000](http://localhost:3000)

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
Gym_Pro_Manager/
├── client/         # React frontend application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── styles/
├── config/         # Database configuration
├── controllers/    # Express route controllers
├── middlewares/    # Custom middlewares (e.g., auth)
├── models/         # Mongoose data models
├── routes/         # Express API routes
├── .env            # Environment variables (create this file)
├── package.json
└── server.js       # Main backend server file
```

---

## 💡 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
