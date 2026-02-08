# Enterprise HR Management System (E-HRMS)

An **Enterprise HR Management System (E-HRMS)** is a scalable, modular, web-based application designed to manage and automate core human resource operations of an organization.  
This project focuses on the **frontend implementation** using modern React tooling and enterprise UI patterns.

---

## 🚀 Project Overview

This application serves as a **frontend foundation** for an enterprise-grade HRMS, covering:

- Employee Management
- Attendance Tracking
- Payroll Scaffolding
- Role-Based Access Control (RBAC)
- Analytics Dashboard (KPIs & Charts)
- Reports with Filters & Export

The project is intentionally structured to be **extensible, maintainable, and production-ready**.

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **TailwindCSS v3**
- **React Router DOM**
- **Recharts** (Charts & Analytics)
- **Context API** (Auth & Global State)

---

## 🔐 Authentication & RBAC

- Simple role-based login (Admin / HR / Manager)
- Protected routes using `ProtectedRoute`
- Role-based sidebar navigation
- Frontend-only authentication (no backend yet)

---

## 📊 Dashboard Features

- KPI Cards:
  - Total Employees
  - Active Employees
  - Departments
  - Open Positions
- Charts:
  - Headcount Trend
  - Attendance Trend
- Attendance Summary
- Employee Status Distribution

> ⚠️ Current dashboard metrics are mock values for UI scaffolding.

---

## 📋 Employee Management

- Employee listing with table view
- Search and department filter
- Add employee modal form
- Automatic ascending sort by Employee ID
- Clickable employee profile view

---

## ⏱️ Attendance Module

- Daily attendance marking
- Present / Absent status
- Attendance records display
- UI-ready for backend integration

---

## 💰 Payroll Module

- Payroll UI scaffolding
- Base salary, deductions, net pay (mock values)
- Designed for future payroll logic integration

---

## 📄 Reports Module

- Employee reports
- Department-based filtering
- CSV export functionality
- Frontend-only reporting logic

---

## 🎨 UI & UX Principles

- Light mode only (corporate enterprise style)
- Clean typography hierarchy
- Consistent spacing and layout
- Reusable UI components
- Dashboard-first experience

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd e-hrms
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

---

## 🧪 Sample Login Roles

| Role    | Access Level |
| ------- | ------------ |
| ADMIN   | Full access  |
| HR      | HR modules   |
| MANAGER | Limited view |

---

## 🔮 Future Enhancements

* Backend API integration
* Real-time analytics
* Advanced reporting (PDF, date ranges)
* Form validation (Zod / Yup)
* Notifications & audit logs
* Multi-tenant branding support

---

## 📌 Project Status

**Frontend foundation completed**
This project currently focuses on **UI architecture and interaction flow** and is ready for backend integration.

---

## 👤 Author

#### Anubhav Das
Computer Science Engineering Student

---

## 📜 License

This project is for **Educational and Academic Use** under the **MIT License**.

---
