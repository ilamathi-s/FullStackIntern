# FullStackIntern

A full-stack task management application designed to help users efficiently organize, manage, and track their daily tasks. The project includes a complete authentication system along with role-based access control for Admin and User, along with fully implemented frontend and backend modules.

---

## 🚀 Features

### ✅ Completed

#### 🔐 Authentication
- User Registration (Frontend + Backend)
- User Login Authentication
- Secure API handling with JWT
- Form validation with user-friendly feedback

#### 👥 Role-Based Access Control
- Separate login for **Admin** and **User**
- Role selection before authentication
- Protected routes based on user roles
- Admin and User dashboards
- Prevention of unauthorized access (e.g., user cannot log in as admin)

#### 📋 Task Management System
- Create tasks
- View all tasks
- Update/edit tasks
- Delete tasks
- Persistent storage with backend integration

#### 🔗 Integration
- Seamless API integration between frontend and backend
- RESTful API architecture

#### 🎨 UI/UX
- Fully responsive design
- Clean and modern interface using Tailwind CSS
- Custom theming with CSS variables

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- React Hook Form

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 🔐 Authentication Flow

1. User selects role (Admin/User)
2. Registers or logs in based on selected role
3. Backend validates credentials
4. JWT token is generated and stored
5. User is redirected to:
   - Admin → Admin Dashboard
   - User → User Dashboard

---

## ⚙️ Key Highlights

- Role-based route protection
- Secure token-based authentication
- Clean separation of frontend and backend
- Scalable project structure

---




### Clone the repository
```bash
git clone https://github.com/ilamathi-s/FullStackIntern.git
