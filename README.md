# 🚀 TaskOrbit - Service Management Web Application

## 📌 Overview
TaskOrbit is a web-based household service management application developed as a project for the **IIT Madras BS Degree in Modern App Development 2**. It facilitates seamless interaction between **Admins**, **Customers**, and **Service Professionals** to manage household services efficiently. The application earned an **S grade (10/10)** for its robust design and implementation.

## 👥 User Roles
- **🛠️ Admin**: A superuser responsible for overseeing the platform, managing users, and ensuring smooth operation.
- **🏠 Customer**: A normal user who requests household services through the platform.
- **🔧 Service Professional**: A user who provides services to customers, such as plumbing, cleaning, or electrical work.

## ✨ Features
- 🔐 User authentication and role-based access control.
- 📝 Service request creation, tracking, and management.
- ⚙️ Backend task processing for efficient service assignment and notifications.
- 🎨 Responsive frontend for an intuitive user experience.
- 🗃️ Database-driven architecture for storing user data, service requests, and transaction history.

## 🛠️ Technologies Used

### 📌 Backend
- **Flask**: Python web framework for building the backend API.
- **SQLAlchemy**: ORM for database management.
- **Celery**: Asynchronous task queue for handling background tasks.
- **Flask-Security**: For user authentication and authorization.

### 🎨 Frontend
- **Vue.js**: JavaScript framework for building a dynamic and responsive user interface.

### 📂 Database
- **SQLite**: Lightweight relational database for storing application data.

### ⚙️ Other
- `requirements.txt`: Lists all Python dependencies for easy setup.

## 📂 Project Structure
```plaintext
TaskOrbit/
├── Backend/                # Flask backend code (API, models, routes)
├── Static/                 # Static files (CSS, JavaScript, images)
├── Template/               # HTML templates for server-side rendering
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

# 🚀 Setup Instructions
Follow these steps to set up and run TaskOrbit locally:

```bash
# 🔧 Installation
# Step 1: Clone the repository
git clone <repository-url>
cd TaskOrbit
```

```bash
# Step 2: Set up a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

```bash
# Step 3: Install Python dependencies
pip install -r requirements.txt
```

```bash
# Step 4: Start the backend server
python app.py
```

```bash
# 🌐 Access the application:
# Open your browser and navigate to:
# http://localhost:5000 (or your configured port)
```

# 📊 Database Schema
The database schema is designed to support the core functionality of TaskOrbit, including:

```bash
# Users: Stores information about Admins, Customers, and Service Professionals.
# Services: Details about available services (e.g., type, description, pricing).
# Requests: Tracks service requests, including status, assigned professional, and timestamps.
# Transactions: Logs payment or service completion details (if applicable).
#
# For detailed schema information, refer to the project report (22f3002166_report.pdf).
```

# 📌 Usage

```bash
# Admins: Log in to access the admin dashboard for user and service management.
# Customers: Sign up, browse services, create requests, and track their status.
# Service Professionals: Register, view assigned tasks, and update task statuses.
```

# 🎥 Video Demo

```bash
# A video demonstration of TaskOrbit is available in the project report (22f3002166_report.pdf, page 2).
```

# ✍️ Author

```bash
# Name: Harsh Pratap Singh
# Roll Number: 22f3002166
# Affiliation: IIT Madras BS Degree (Diploma level, transitioning to degree)
```
