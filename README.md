# 📚 Bookstore Application (MERN Stack)

A full-stack **Bookstore Management System** built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. This application allows users to **register**, **log in**, and **manage books** with cover images, using **Cloudinary** for image storage and **JWT** for secure authentication.

---

## 🚀 Features

- 👤 **User Authentication** (Register/Login with JWT)
- 📘 Add new books with cover images
- 📝 Update and delete book details
- 📷 Image upload handled via **Cloudinary**
- 📚 View a list of all books
- 🧭 Protected routes using JWT tokens
- 💡 Clean React UI with Axios for API communication

---

## 🛠️ Tech Stack

### 🔙 Backend
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Cloudinary** (Image Uploads)
- dotenv for environment variables

### 🌐 Frontend
- **React.js**
- **Axios**
- **React Router DOM**

---

## 📦 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | `/auth/signup`   | Register new user    |
| POST   | `/auth/login`    | Login user, return JWT |

### 📚 Book Routes

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/books`           | Get all books (public)          |
| GET    | `/books/:id`       | Get single book by ID           |
| POST   | `/books`           | Add new book (auth + image)     |
| PUT    | `/books/:id`       | Update book details             |
| DELETE | `/books/:id`       | Delete a book                   |

> ⚠️ `POST`, `PUT`, `DELETE` routes require a **valid JWT token** in the `Authorization` header.

---

## 🔐 Authentication & Authorization

- Uses **JWT** (JSON Web Token) for securing private routes
- JWT stored in browser localStorage and sent via headers:
