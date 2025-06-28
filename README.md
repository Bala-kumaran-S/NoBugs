# 🐞 NoBugs – Bug Bounty Platform for Educational Use

![NoBugs Banner](https://your-banner-url.com) <!-- Replace with your own banner if available -->

## 🚀 Overview

**NoBugs** is a modern educational bug bounty platform that simulates real-world vulnerability disclosure workflows between security researchers and organizations.  
Ideal for colleges, cybersecurity clubs, and training programs, it enables responsible disclosure in a secure and structured way.

> 🛡️ Learn security. Build credibility. Report ethically.

---

## 🎯 Features

### 👥 Authentication & Roles
- JWT-based login with Spring Security
- Role-based access (`ADMIN`, `ORGANIZATION`, `RESEARCHER`)
- Secure registration and login flow

### 🧑‍💻 Researcher Dashboard
- Browse public programs and scopes
- Submit detailed bug reports
- Track report status (Pending, Accepted, Rejected)

### 🏢 Organization Dashboard
- Create/manage bounty programs
- Define scope (title, domain, exclusions)
- Review incoming bug reports and respond

### 📊 Admin Panel
- View and manage all users and programs
- Moderate platform activity
- Toggle public/private access of organizations

---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3
- Spring Security + JWT
- MySQL
- Hibernate (JPA)

### Frontend
- Angular 17+
- Bootstrap 5
- Angular Reactive Forms

### Tools
- Postman (API testing)
- Docker (optional)
- Git & GitHub (version control)

---

## 🧪 Local Setup Instructions

### ✅ Prerequisites
- Java 17+
- Node.js 18+
- Angular CLI
- MySQL

### ⚙️ Backend Setup

```bash
cd backend
# Make sure `nobugs` database exists in MySQL
# Configure DB credentials in `application.properties`
./mvnw spring-boot:run
```
![image](https://github.com/user-attachments/assets/53fc2a1d-dc3a-4fa5-a5a2-5015cd074e70)
![image](https://github.com/user-attachments/assets/b68685cf-3c72-4e17-93b6-2ba6320c1e8d)
![image](https://github.com/user-attachments/assets/0dd546b5-7afc-411b-affa-47de8ed5a88a)
![image](https://github.com/user-attachments/assets/53ce47aa-0277-44a3-9c79-8bde62f4c81f)
![image](https://github.com/user-attachments/assets/58131955-575f-497c-aee4-da2581347937)
![image](https://github.com/user-attachments/assets/5a78219f-cf18-4e71-acd1-6c2e15ff763f)

