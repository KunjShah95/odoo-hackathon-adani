# 🛠️ GearGuard: The Ultimate Maintenance Tracker

<div align="center">

![GearGuard Banner](https://img.shields.io/badge/GearGuard-Maintenance_Tracker-blue?style=for-the-badge&logo=gear&logoColor=white)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**A comprehensive, modern, and intuitive maintenance management system designed to track equipment, manage maintenance teams, and streamline maintenance requests.**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🏗️ Architecture](#️-system-architecture) • [🔧 API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [System Architecture](#️-system-architecture)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Installation Guide](#-installation-guide)
- [API Reference](#-api-reference)
- [Frontend Pages & Components](#-frontend-pages--components)
- [Database Schema](#-database-schema)
- [Usage Guide](#-usage-guide)
- [Development Workflow](#-development-workflow)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

GearGuard is a centralized, digital platform that transforms maintenance operations by providing a **single source of truth** for all maintenance-related activities. It empowers organizations to transition from reactive, "fire-fighting" mode to a **proactive, predictive maintenance strategy**.

---

## 🏴 The Problem

In today's fast-paced industrial environments, maintenance tracking often involves:

| Challenge | Impact |
|-----------|--------|
| 📊 **Fragmented Tools** | Spreadsheets, emails, sticky notes scattered everywhere |
| 💰 **Lost Revenue** | Unexpected equipment downtime halts production |
| 📈 **Increased Costs** | Reactive maintenance is 3-10x more expensive than planned maintenance |
| 👁️ **Poor Visibility** | No clear picture of asset maintenance history |
| 👥 **Inefficient Teams** | Difficulty tracking workload and task assignments |
| 💬 **Communication Gaps** | Delays between issue reporting and resolution |

---

## 💡 Our Solution

GearGuard addresses these challenges with a modern, unified approach:

- ✅ **Centralized Dashboard** - Bird's-eye view of all maintenance operations
- ✅ **Real-time Kanban Board** - Visual workflow management with drag-and-drop
- ✅ **Proactive Scheduling** - Calendar view for preventive maintenance
- ✅ **Team Collaboration** - Role-based access and team assignments
- ✅ **Comprehensive Analytics** - Data-driven insights and reporting

---

## ✨ Key Features

### 🖥️ Dashboard
- Real-time statistics and KPIs
- Recent activity timeline
- Overdue task alerts
- Quick action buttons

### 🔧 Equipment Management
- Complete asset registry with detailed records
- Serial numbers, specifications, warranty tracking
- Maintenance history per equipment
- Status tracking (Operational, Under Maintenance, Scrapped)

### 👥 Team Management
- Create and organize maintenance teams
- Assign team leads and technicians
- Define specializations and skills
- Workload visibility

### 📋 Work Orders (Kanban Board)
- **Drag-and-drop** status updates
- Visual workflow: `New → In Progress → Repaired → Scrap`
- Priority indicators (Critical, High, Medium, Low)
- Overdue task highlighting
- Auto-fill team based on equipment selection

### 📅 Calendar View
- Preventive maintenance scheduling
- Visual timeline of upcoming tasks
- Recurring maintenance planning

### 📊 Reports & Analytics
- Equipment downtime analysis
- Team performance metrics
- Request statistics by category/priority
- Exportable reports

### 🔐 Authentication & Authorization
- JWT-based secure authentication
- Role-based access control (Admin, Manager, Technician, User)
- Session management

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer (React + Vite)"
        A[Authentication Pages]
        B[Dashboard]
        C[Equipment Module]
        D[Team Module]
        E[Request Module - Kanban]
        F[Calendar View]
        G[Reports & Analytics]
    end

    subgraph "API Layer (Node.js + Express)"
        H[REST API Gateway]
        I[Authentication Service]
        J[Equipment Service]
        K[Team Service]
        L[Request Service]
        M[Dashboard Service]
    end

    subgraph "Data Layer (PostgreSQL)"
        N[Users]
        O[Equipment]
        P[Teams & Members]
        Q[Maintenance Requests]
    end

    A & B & C & D & E & F & G --> H
    H --> I & J & K & L & M
    I --> N
    J --> O
    K --> P
    L --> Q
    M --> N & O & P & Q
```

### Directory Structure

```
gearguard/
├── 📁 backend/                    # Node.js + Express API
│   ├── 📁 prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   ├── 📁 src/
│   │   ├── index.ts               # Entry point
│   │   ├── app.ts                 # Express app setup
│   │   ├── 📁 config/             # Configuration files
│   │   ├── 📁 controllers/        # Route handlers
│   │   ├── 📁 middleware/         # Auth, validation, error handling
│   │   ├── 📁 routes/             # API route definitions
│   │   ├── 📁 services/           # Business logic
│   │   └── 📁 types/              # TypeScript types
│   ├── .env.example               # Environment template
│   ├── package.json
│   └── tsconfig.json
│
├── 📁 frontend/                   # React + Vite SPA
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── main.tsx               # Entry point
│   │   ├── App.tsx                # Root component with routing
│   │   ├── index.css              # Global styles + Design system
│   │   ├── 📁 api/                # API client & service modules
│   │   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 context/            # React Context (Auth)
│   │   ├── 📁 hooks/              # Custom hooks
│   │   ├── 📁 pages/              # Page components
│   │   ├── 📁 types/              # TypeScript types
│   │   └── 📁 utils/              # Helper functions
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── implementation_plan.md         # Development roadmap
├── task.md                        # Task tracking
└── README.md                      # This file
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool & Dev Server |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Axios** | HTTP Client |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express** | Web Framework |
| **TypeScript** | Type Safety |
| **Prisma** | ORM |
| **PostgreSQL** | Database |
| **JWT** | Authentication |
| **bcrypt** | Password Hashing |
| **Zod** | Request Validation |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or later
- **npm** or **yarn**
- **PostgreSQL** 15.x (or Docker)
- **Docker** (optional, for database)

### 5-Minute Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/gearguard.git
cd gearguard

# 2. Start PostgreSQL (using Docker)
docker run --name gearguard-db -e POSTGRES_PASSWORD=HACKER_K -e POSTGRES_DB=gearguard -p 5432:5432 -d postgres:15

# 3. Setup Backend
cd backend
npm install
cp .env.example .env    # Configure your environment
npx prisma migrate dev  # Apply database schema
npm run dev             # Start backend server (port 5000)

# 4. Setup Frontend (new terminal)
cd ../frontend
npm install
npm run dev             # Start frontend (port 5173)
```

🎉 **Open your browser at `http://localhost:5173`**

---

## 📦 Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/gearguard.git
cd gearguard
```

### Step 2: Database Setup

#### Option A: Using Docker (Recommended)

```bash
docker run --name gearguard-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=HACKER_K \
  -e POSTGRES_DB=gearguard \
  -p 5432:5432 \
  -d postgres:15
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL 15.x
2. Create a database named `gearguard`
3. Note your connection credentials

### Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

Edit `.env` file:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:HACKER_K@localhost:5432/gearguard?schema=public"

# JWT Secret (Change in production!)
JWT_SECRET="your-super-secret-jwt-key"

# Server Configuration
PORT=5000
NODE_ENV=development
```

Apply database migrations:

```bash
# Generate Prisma client and apply migrations
npx prisma migrate dev --name init

# (Optional) Seed with sample data
npx prisma db seed
```

Start the backend server:

```bash
npm run dev
# Server running at http://localhost:5000
```

### Step 4: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend running at http://localhost:5173
```

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **API**: `http://localhost:5000/api`

---

## 🔧 API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | User login | ❌ |
| `POST` | `/auth/logout` | User logout | ✅ |
| `GET` | `/auth/me` | Get current user | ✅ |

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "TECHNICIAN",
  "department": "Maintenance"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "TECHNICIAN"
  }
}
```

---

### Equipment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/equipment` | List all equipment | ✅ |
| `POST` | `/equipment` | Create equipment | ✅ (Admin/Manager) |
| `GET` | `/equipment/:id` | Get equipment details | ✅ |
| `PATCH` | `/equipment/:id` | Update equipment | ✅ (Admin/Manager) |
| `DELETE` | `/equipment/:id` | Delete equipment | ✅ (Admin) |
| `GET` | `/equipment/:id/requests` | Get equipment's requests | ✅ |

#### Create Equipment
```http
POST /api/equipment
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Conveyor Belt Line 4",
  "serialNumber": "CB-2024-001",
  "category": "MACHINERY",
  "department": "Production",
  "location": "Factory Floor, Section G",
  "purchaseDate": "2024-01-15T00:00:00.000Z",
  "warrantyExpiry": "2027-01-15T00:00:00.000Z",
  "maintenanceTeamId": "clx456..."
}
```

---

### Teams Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/teams` | List all teams | ✅ |
| `POST` | `/teams` | Create team | ✅ (Admin/Manager) |
| `GET` | `/teams/:id` | Get team details | ✅ |
| `PATCH` | `/teams/:id` | Update team | ✅ (Admin/Manager) |
| `DELETE` | `/teams/:id` | Delete team | ✅ (Admin) |
| `POST` | `/teams/:id/members` | Add member to team | ✅ (Admin/Manager) |
| `DELETE` | `/teams/:id/members/:userId` | Remove member | ✅ (Admin/Manager) |

#### Create Team
```http
POST /api/teams
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Electrical Team",
  "specialization": "Electrical",
  "description": "Handles all electrical maintenance and repairs"
}
```

---

### Maintenance Requests Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/requests` | List all requests | ✅ |
| `POST` | `/requests` | Create request | ✅ |
| `GET` | `/requests/:id` | Get request details | ✅ |
| `PATCH` | `/requests/:id` | Update request | ✅ |
| `PATCH` | `/requests/:id/status` | Update request status | ✅ (Team Member Only) |
| `GET` | `/requests/calendar` | Get calendar view data | ✅ |
| `GET` | `/requests/kanban` | Get kanban board data | ✅ |

#### Create Request
```http
POST /api/requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "subject": "Main Conveyor Belt Misalignment",
  "description": "The belt is shifting to the left during heavy load cycles.",
  "type": "CORRECTIVE",
  "priority": "CRITICAL",
  "equipmentId": "clx789...",
  "teamId": "clx456...",
  "scheduledDate": "2024-12-28T10:00:00.000Z"
}
```

#### Update Status
```http
PATCH /api/requests/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "assignedToId": "clx123..."
}
```

---

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/dashboard/stats` | Get dashboard statistics | ✅ |
| `GET` | `/dashboard/recent` | Get recent activities | ✅ |

---

## 📱 Frontend Pages & Components

### Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Public landing page |
| `/login` | `LoginPage` | User authentication |
| `/register` | `RegisterPage` | User registration |
| `/dashboard` | `Dashboard` | Main dashboard with stats |
| `/equipment` | `EquipmentPage` | Equipment management |
| `/teams` | `TeamsPage` | Team management |
| `/requests` | `RequestsPage` | Kanban board for work orders |
| `/calendar` | `CalendarPage` | Calendar view for scheduling |
| `/reports` | `ReportsPage` | Reports and analytics |
| `/documentation` | `DocumentationPage` | Help & documentation |

### Key Components

#### UI Components (`/components/ui/`)
- `Button` - Customizable button with variants
- `Input`, `TextArea` - Form inputs
- `Select` - Dropdown selection
- `Modal` - Dialog/modal component
- `Badge` - Status and priority badges
- `Card` - Content containers

#### Layout Components (`/components/layout/`)
- `Sidebar` - Navigation sidebar
- `Header` - Page headers
- `Layout` - Main layout wrapper

### Custom Hooks

| Hook | Purpose |
|------|---------|
| `useAuth()` | Authentication state and methods |
| `useEquipment()` | Equipment CRUD operations |
| `useTeams()` | Team CRUD operations |
| `useRequests()` | Request CRUD operations |

---

## 🗄️ Database Schema

### Enums

```prisma
enum Role {
  ADMIN
  MANAGER
  TECHNICIAN
  USER
}

enum Category {
  MACHINERY
  VEHICLE
  IT_EQUIPMENT
  ELECTRICAL
  HVAC
  PLUMBING
  OTHER
}

enum EquipmentStatus {
  OPERATIONAL
  UNDER_MAINTENANCE
  SCRAPPED
  DECOMMISSIONED
}

enum RequestType {
  CORRECTIVE
  PREVENTIVE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum RequestStatus {
  NEW
  IN_PROGRESS
  REPAIRED
  SCRAP
}
```

### Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│      User       │       │ MaintenanceTeam │
├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │
│ email           │◄──────│ name            │
│ password        │       │ specialization  │
│ name            │       │ description     │
│ role            │       └────────┬────────┘
│ department      │                │
└────────┬────────┘                │
         │                         │
         │  ┌───────────────┐      │
         ├──►  TeamMember   ◄──────┘
         │  ├───────────────┤
         │  │ userId        │
         │  │ teamId        │
         │  │ role          │
         │  └───────────────┘
         │
         │       ┌─────────────────┐
         │       │   Equipment     │
         ├──────►├─────────────────┤
         │       │ id              │
         │       │ name            │
         │       │ serialNumber    │
         │       │ category        │
         │       │ status          │
         │       │ maintenanceTeamId
         │       └────────┬────────┘
         │                │
         │                │
         │  ┌─────────────▼──────────────┐
         └─►│   MaintenanceRequest       │
            ├────────────────────────────┤
            │ id                         │
            │ subject                    │
            │ description                │
            │ type                       │
            │ priority                   │
            │ status                     │
            │ equipmentId                │
            │ teamId                     │
            │ createdById                │
            │ assignedToId               │
            └────────────────────────────┘
```

---

## 📖 Usage Guide

### 1. Register & Login

1. Navigate to `/register`
2. Fill in your details (name, email, password, role)
3. After registration, you'll be redirected to the dashboard

### 2. Add Equipment

1. Go to **Equipment** page
2. Click **"+ Add Equipment"**
3. Fill in details:
   - Name, Serial Number
   - Category (Machinery, HVAC, etc.)
   - Department, Location
   - Purchase Date, Warranty
   - Assign a Maintenance Team (optional)
4. Click **Create**

### 3. Create Maintenance Teams

1. Go to **Teams** page
2. Click **"+ Create Team"**
3. Enter team name and specialization
4. Add team members from registered users

### 4. Submit Work Orders

1. Go to **Work Orders** (Requests) page
2. Click **"+ New Request"**
3. Fill in:
   - Subject and Description
   - Priority (Critical, High, Medium, Low)
   - Type (Corrective or Preventive)
   - Select Equipment (team auto-fills!)
4. Submit the request

### 5. Manage Work Orders (Kanban)

- **Drag and drop** cards between columns
- Columns: `New → In Progress → Repaired → Scrap`
- **Red indicator** shows overdue tasks
- Click quick action buttons to advance status

### 6. Schedule Preventive Maintenance

1. Go to **Calendar** page
2. View scheduled maintenance tasks
3. Click dates to add new scheduled maintenance

### 7. View Reports

1. Go to **Reports** page
2. View analytics:
   - Requests by Team
   - Requests by Equipment Category
   - Priority distribution
   - Status breakdown

---

## 🔄 Development Workflow

### Backend Development

```bash
cd backend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name <migration-name>

# View database in Prisma Studio
npx prisma studio
```

### Frontend Development

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Variables

#### Backend (`.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/gearguard"
JWT_SECRET="your-secret-key"
PORT=5000
NODE_ENV=development
```

#### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🤝 Contributing

We welcome contributions from the community!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons

---

<div align="center">

**Built with ❤️ for the Odoo Hackathon**

[⬆ Back to Top](#️-gearguard-the-ultimate-maintenance-tracker)

</div>