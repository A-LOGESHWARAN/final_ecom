# 🛒 Full-Stack E-Commerce Platform

A complete **role-based e-commerce web application** built using the **MERN stack** with **Admin, Seller, and Buyer dashboards**, real-time cart management, order approval workflow, and an **AI-powered chatbot** for product search and cart actions.

---

## 🚀 Features

### 👤 Authentication & Roles
- JWT-based authentication
- Role-based access control
- Supported roles:
  - **Admin**
  - **Seller**
  - **Buyer**

---

### 🧑‍💼 Admin Dashboard
- View total buyers
- View total sellers
- View active sellers
- Approve seller registration requests
- Monitor overall platform activity

---

### 🏪 Seller Dashboard
- Add new products
- Update stock using **+ / − buttons**
- Delete products
- View orders placed for their products
- Approve buyer orders
- Automatic stock reduction after order approval

---

### 🛍 Buyer Dashboard
- View all products
- Filter products by:
  - Category
  - Price
- View seller information
- Stock-aware UI (Out of Stock handling)
- Add products to cart
- Update cart quantity
- Remove items from cart
- Checkout and place orders
- Track order status (Pending / Approved)

---

### 🛒 Cart & Orders
- Persistent cart per user
- Quantity updates synced with backend
- Cart item removal
- Order creation from cart
- Seller approval-based order flow
- Automatic stock management

---

### 🤖 AI Chatbot
- Floating chatbot interface
- Product search
- Filter products by price
- Add products to cart via chat
- Prevents adding out-of-stock products
- Toast notifications for user actions

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API
- Framer Motion
- React Toastify
- Custom CSS (No Tailwind / Bootstrap)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (optional for image uploads)

---

🔐 Application Flow

Seller registers

Admin approves seller

Seller adds products

Buyer browses products

Buyer adds items to cart

Buyer places order

Seller approves order

Stock updates automatically

Buyer tracks order status

🧠 Key Learnings

Full-stack MERN development

REST API design

Role-based authorization

MongoDB relationships & population

Defensive UI coding

Cart synchronization

Order lifecycle handling

AI chatbot logic integration

Real-world debugging practices

📈 Future Enhancements

Online payment gateway (Razorpay / Stripe)

Invoice generation (PDF)

Product reviews & ratings

Admin analytics dashboard

Email notifications

Real AI integration (OpenAI / Gemini)

Dark mode support

👨‍💻 Author

Logeshwaran A
Full-Stack Developer
📍 India

⭐ Final Note

This project is resume-ready, placement-ready, and demonstrates real-world full-stack development skills including authentication, authorization, cart management, and AI-powered features.

If you like this project, consider giving it a ⭐ on GitHub!
