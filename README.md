# 🏥 Hospital Management System

A full-stack **Hospital Management System** developed to manage patients, doctors, appointments, medical records, prescriptions, and billing through a centralized web application.

The application uses **React.js** for the frontend, **Spring Boot** for the backend REST APIs, and **MySQL** for data storage.

---

# 📌 Project Overview

The Hospital Management System is designed to simplify common hospital management operations through a web-based application.

The system provides modules for:

- Dashboard
- Patient Management
- Doctor Management
- Appointment Management
- Medical Records
- Prescriptions
- Billing
- Patient details
- Patient editing
- Doctor management
- Appointment scheduling

The frontend and backend are connected through REST APIs.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- Bootstrap
- JavaScript
- CSS

## Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

## Database

- MySQL

## Development Tools

- Visual Studio Code
- IntelliJ IDEA
- MySQL Workbench
- Postman
- Git
- GitHub

---

# 🏗️ Application Architecture

```text
                  ┌─────────────────────┐
                  │    React Frontend   │
                  │                     │
                  │ React + Vite        │
                  │ React Router        │
                  │ Axios               │
                  │ Bootstrap + CSS     │
                  └──────────┬──────────┘
                             │
                             │ REST API
                             ▼
                  ┌─────────────────────┐
                  │    Spring Boot      │
                  │      Backend        │
                  │                     │
                  │ Controllers         │
                  │ Services            │
                  │ Repositories        │
                  │ JPA / Hibernate     │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │       MySQL         │
                  │                     │
                  │ Patients            │
                  │ Doctors             │
                  │ Appointments        │
                  │ Medical Records     │
                  │ Prescriptions       │
                  │ Billing             │
                  └─────────────────────┘
```

---

# ✨ Features

## 📊 Dashboard

The dashboard provides an overview of hospital operations.

It can display information such as:

- Total Patients
- Total Doctors
- Today's Appointments
- Pending Appointments
- Quick navigation
- Hospital statistics

---

# 🧑‍⚕️ Patient Management

The Patient Management module allows hospital staff to manage patient information.

Features include:

- Add patient
- View patients
- Edit patient
- Delete patient
- View patient details
- Search patients
- Patient information management

Patient information can include:

```text
Patient ID
Name
Age
Gender
Phone
Email
Address
Blood Group
Date of Birth
```

---

# 👨‍⚕️ Doctor Management

The Doctor Management module manages hospital doctors.

Features include:

- Add doctor
- View doctors
- Edit doctor
- Delete doctor
- Doctor details
- Specialization
- Contact information

Example information:

```text
Doctor ID
Name
Specialization
Phone
Email
Experience
```

---

# 📅 Appointment Management

The appointment module allows appointments to be scheduled and managed.

Features include:

- Schedule appointment
- View appointments
- Update appointment
- Delete appointment
- Assign doctor
- Assign patient
- Appointment date
- Appointment time
- Appointment status

Example statuses:

```text
Pending
Confirmed
Completed
Cancelled
```

---

# 📋 Medical Records

The Medical Records module maintains patient medical information.

Features can include:

- Patient medical history
- Diagnosis
- Treatment information
- Doctor notes
- Visit information
- Medical record details

---

# 💊 Prescriptions

The prescription module manages medicines prescribed to patients.

Information can include:

```text
Medicine Name
Dosage
Frequency
Duration
Instructions
Doctor
Patient
```

---

# 💳 Billing

The Billing module manages patient billing information.

Features include:

- Create bills
- View bills
- Track billing information
- Patient billing details
- Payment status

Example payment statuses:

```text
Pending
Paid
Partially Paid
```

---

# 👤 Patient Details

The application provides a dedicated patient details view.

Users can view:

- Patient information
- Appointment information
- Medical records
- Prescription information
- Billing information

This provides a centralized view of a patient's hospital information.

---

# ✏️ Patient Editing

Patient information can be updated when required.

The edit functionality allows authorized users to update patient details without recreating the patient record.

---

# 🔗 Frontend & Backend Integration

The React frontend communicates with the Spring Boot backend through REST APIs.

```text
React Component
      ↓
Axios API Service
      ↓
Spring Boot Controller
      ↓
Service Layer
      ↓
JPA Repository
      ↓
MySQL
```

Example:

```text
Patient Form
     ↓
Axios POST Request
     ↓
Patient Controller
     ↓
Patient Service
     ↓
Patient Repository
     ↓
MySQL
```

---

# 🏛️ Backend Architecture

The Spring Boot backend follows a layered architecture:

```text
Controller
     ↓
Service
     ↓
Repository
     ↓
Database
```

### Controller

Handles HTTP requests.

### Service

Handles business logic.

### Repository

Handles database operations using Spring Data JPA.

### Entity

Maps Java objects to database tables.

---

# 🗄️ Database

The application uses **MySQL** as its relational database.

The backend uses:

```text
Spring Data JPA
       +
Hibernate
       +
MySQL
```

Main entities include:

```text
Patient
Doctor
Appointment
MedicalRecord
Prescription
Billing
```

---

# 📂 Project Structure

```text
Hospital-Management-System/
│
├── Hospital-frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Patients/
│   │   │   ├── Doctors/
│   │   │   ├── Appointments/
│   │   │   ├── MedicalRecords/
│   │   │   ├── Prescriptions/
│   │   │   └── Billing/
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── Data/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── Hospital-Backend/
    │
    └── hospital-management-system/
        │
        ├── src/
        │   └── main/
        │       ├── java/
        │       │   └── ...
        │       │
        │       └── resources/
        │           └── application.properties
        │
        └── pom.xml
```

---

# 🌐 REST APIs

The backend provides REST APIs for different hospital modules.

Example API areas:

```text
/patients
/doctors
/appointments
/medical-records
/prescriptions
/billing
```

Example patient APIs:

```http
GET    /patients
GET    /patients/{id}
POST   /patients
PUT    /patients/{id}
DELETE /patients/{id}
```

Example doctor APIs:

```http
GET    /doctors
GET    /doctors/{id}
POST   /doctors
PUT    /doctors/{id}
DELETE /doctors/{id}
```

Example appointment APIs:

```http
GET    /appointments
GET    /appointments/{id}
POST   /appointments
PUT    /appointments/{id}
DELETE /appointments/{id}
```

---

# 🧪 API Testing

The backend APIs can be tested using **Postman**.

Example testing flow:

```text
1. Start Spring Boot Backend
       ↓
2. Open Postman
       ↓
3. Test GET APIs
       ↓
4. Test POST APIs
       ↓
5. Test PUT APIs
       ↓
6. Test DELETE APIs
       ↓
7. Verify changes in MySQL
```

---

# ⚙️ Installation

## Prerequisites

Install:

- Java JDK
- Maven
- Node.js
- MySQL
- IntelliJ IDEA
- Visual Studio Code
- Postman

---

# 🗄️ Database Setup

Create the database in MySQL:

```sql
CREATE DATABASE hms_db;
```

Configure the backend database connection in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hms_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

# ▶️ Run Backend

Navigate to the Spring Boot project:

```bash
cd Hospital-Backend/hospital-management-system
```

Run:

```bash
mvn clean install
```

Then:

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

# ▶️ Run Frontend

Navigate to the frontend:

```bash
cd Hospital-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔗 Full Application Flow

Example: Adding a Patient

```text
User
 ↓
Patient Form
 ↓
React
 ↓
Axios
 ↓
POST /patients
 ↓
Spring Boot Controller
 ↓
Patient Service
 ↓
Patient Repository
 ↓
Hibernate / JPA
 ↓
MySQL
 ↓
Response
 ↓
React UI Updated
```

---

# 📱 Responsive Design

The application includes responsive layouts so that the major application pages can be used across different screen sizes.

Responsive areas include:

- Navigation
- Sidebar
- Dashboard
- Patient pages
- Doctor pages
- Appointment pages
- Forms
- Tables
- Details pages

---

# 🎯 Skills Demonstrated

This project demonstrates practical experience with:

### Java

- Core Java
- Object-Oriented Programming
- Classes and Objects
- Exception Handling

### Spring Boot

- Spring Boot
- Spring MVC
- REST API
- Controllers
- Services
- Repositories

### Database

- MySQL
- SQL
- Database relationships
- CRUD operations

### ORM

- Spring Data JPA
- Hibernate
- Entity mapping

### Frontend

- React.js
- JavaScript
- React Router
- Axios
- Bootstrap
- CSS
- Responsive Design

### Development

- REST API integration
- Postman API testing
- Git
- GitHub
- Full-stack development

---

# 📌 Project Type

**Full-Stack Hospital Management Web Application**

### Frontend

```text
React.js
Vite
React Router
Axios
Bootstrap
CSS
```

### Backend

```text
Java
Spring Boot
Spring Web
Spring Data JPA
Hibernate
Maven
```

### Database

```text
MySQL
```

---

# 🚧 Future Enhancements

Possible future improvements:

- JWT authentication
- Role-based access control
- Admin dashboard
- Doctor login
- Patient login
- Email notifications
- Appointment reminders
- Online appointment booking
- Advanced hospital reports
- Prescription PDF generation
- Invoice PDF generation
- Docker deployment
- Cloud deployment

---

# 👨‍💻 Author

**Gowsik B. S.**

B.E. Computer Science and Engineering

Full Stack Java + MERN Stack Developer

LinkedIn:

https://www.linkedin.com/in/gowsik-balamurugan

---

⭐ **Hospital Management System** is a full-stack application demonstrating the integration of React.js, Spring Boot, Spring Data JPA, Hibernate, REST APIs, and MySQL to build a practical hospital management solution.
