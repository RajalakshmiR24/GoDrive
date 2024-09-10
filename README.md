# 🚗 GoDrive Booking Website

A comprehensive rental booking website similar to Ola and Uber, developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform includes three main interfaces: an **Admin Panel** for managing vehicles, bookings, and rentals; a **User Interface** for browsing and booking available vehicles; and a **Delivery Partner Interface** for managing deliveries and viewing delivery history.

## 📚 Project Overview

### Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git and GitHub

### Key Requirements

#### 1. Admin Panel
- **Dashboard**: Overview of bookings, revenue, and vehicle status.
- **Vehicle Management**: Add, update, and remove vehicles.
- **Booking Management**: View, approve/decline, and manage bookings.
- **User Management**: View, ban/unban user profiles.
- **Reporting**: Generate booking and revenue reports.

#### 2. User Interface
- **User Registration and Login**: Register, log in, and manage personal profiles.
- **Vehicle Browsing**: View available vehicles, filter by type, price, and availability.
- **Booking**: Book vehicles, manage bookings, and cancel if needed.
- **Profile Management**: Update profile information.

#### 3. Delivery Partner Interface
- **Partner Registration and Login**: Delivery partners can register and log in.
- **Delivery Management**: View assigned deliveries, update status, and view earnings.
- **Profile Management**: Manage partner profiles.

## 🗂️ Database Schema

- **Admin**: `AdminID`, `Name`, `Email`, `Password`
- **Vehicle**: `VehicleID`, `Model`, `Make`, `Year`, `LicensePlate`, `Status`, `PricePerHour`
- **Booking**: `BookingID`, `UserID`, `VehicleID`, `StartDate`, `EndDate`, `Status`
- **User**: `UserID`, `Name`, `Email`, `Phone`, `Address`, `Status`
- **Partner**: `PartnerID`, `Name`, `Email`, `Password`, `Phone`, `VehicleID`
- **Delivery**: `DeliveryID`, `PartnerID`, `BookingID`, `Status`, `Earnings`

## 📅 Development Plan

### Sprint 1: Setup and Initial Development
- **Week 1**:
  - Set up project repository on GitHub.
  - Initialize React.js and Node.js projects.
  - Set up MongoDB database.
  - Design database schema.
- **Week 2**:
  - Implement user registration and login (frontend and backend).
  - Create admin dashboard layout (frontend).

### Sprint 2: Core Features Development
- **Week 3**:
  - Develop vehicle management (frontend and backend).
  - Implement vehicle browsing for users (frontend and backend).
- **Week 4**:
  - Develop booking management (frontend and backend).
  - Implement user profile management (frontend and backend).

### Sprint 3: Delivery Partner Interface Development
- **Week 5**:
  - Implement partner registration and login (frontend and backend).
  - Develop delivery management (frontend and backend).
  - Implement partner profile management (frontend and backend).

### Sprint 4: Finalization and Testing
- **Week 6**:
  - Implement reporting and statistics for admin.
  - Conduct unit testing and integration testing.
  - Fix bugs and optimize performance.
- **Week 7**:
  - Perform user acceptance testing.
  - Deploy the application to a cloud platform.

## 🚀 Getting Started

1. **Clone the Repository**: `git clone https://github.com/Godrive-Website-Team/GoDrive.git`
2. **Navigate to the Project Directory**: `cd GoDrive`
3. **Install Dependencies**: 
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
4. **Run the Application**:
   - Backend: `npm run dev` (from `backend` directory)
   - Frontend: `npm run dev` (from `frontend` directory)

## 📦 Dependencies

- **Frontend**: React, Axios, React Router
- **Backend**: Express, Mongoose, JWT, bcrypt
- **Database**: MongoDB
- **Others**: Nodemon (for development)

## 🧩 Contributing

1. **Fork** the repository.
2. **Create a new branch** (`git checkout -b feature/your-feature`).
3. **Commit your changes** (`git commit -m 'Add new feature'`).
4. **Push to the branch** (`git push origin feature/your-feature`).
5. **Open a pull request**.

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MERN stack for providing an excellent foundation.
- The open-source community for valuable libraries and tools.
