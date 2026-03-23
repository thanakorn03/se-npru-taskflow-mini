# SE NPRU TaskFlow Mini - Implementation Plan

## โครงสร้างโปรเจกต์
```
SE-NPRU-TaskFlow-Mini/
├── backend/                 # Node.js + Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/                # React + Redux Toolkit
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── store.js
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## Phase 1: Backend Development (30 คะแนน)

### 1.1 สร้างโครงสร้าง Backend
- สร้างโฟลเดอร์ backend/ พร้อม package.json
- ติดตั้ง dependencies: express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv, express-validator

### 1.2 Database Models
- **User Model**: name, email, password, timestamps
- **Task Model**: title, description, status (pending/in-progress/completed), priority (low/medium/high), userId (ref), timestamps

### 1.3 Middleware
- **authMiddleware**: ตรวจสอบ JWT token
- **errorHandler**: จัดการ error ส่ง HTTP status ที่เหมาะสม
- **validation**: validate ข้อมูลนำเข้าด้วย express-validator

### 1.4 Routes & Controllers

#### Auth Routes (`/api/auth`)
- `POST /register` - สมัครสมาชิก (validate: name, email, password)
- `POST /login` - เข้าสู่ระบบ (validate: email, password)
- `GET /me` - ดึงข้อมูลผู้ใช้ที่ล็อกอิน (protected)

#### Task Routes (`/api/tasks`)
- `POST /` - สร้างงานใหม่ (protected, validate: title, status, priority)
- `GET /` - ดึงรายการงานของผู้ใช้ปัจจุบัน (protected)
- `PUT /:id` - อัปเดตงาน (protected, ตรวจสอบเจ้าของงาน)
- `DELETE /:id` - ลบงาน (protected, ตรวจสอบเจ้าของงาน)

### 1.5 การจัดการ Error
- 400: Bad Request (validation error)
- 401: Unauthorized (ไม่มี token หรือ token ไม่ถูกต้อง)
- 403: Forbidden (ไม่ใช่เจ้าของงาน)
- 404: Not Found
- 500: Server Error

---

## Phase 2: Frontend Development (30 คะแนน)

### 2.1 สร้างโครงสร้าง Frontend
- สร้างโฟลเดอร์ frontend/ ด้วย Vite + React
- ติดตั้ง dependencies: react-router-dom, @reduxjs/toolkit, react-redux, axios

### 2.2 Redux Store Structure
```
src/store/
├── store.js           # configureStore
└── slices/
    ├── authSlice.js   # authUser, token, login/logout
    └── taskSlice.js   # tasks, loading, error, CRUD actions
```

### 2.3 Services (API Calls)
- `authService.js` - เรียก API สำหรับ auth
- `taskService.js` - เรียก API สำหรับ tasks
- `api.js` - axios instance พร้อม interceptor สำหรับ token

### 2.4 Pages & Components

#### Pages
- **RegisterPage** (`/register`) - ฟอร์มสมัครสมาชิก
- **LoginPage** (`/login`) - ฟอร์มเข้าสู่ระบบ
- **DashboardPage** (`/dashboard`) - แสดงรายการงาน + ฟอร์มเพิ่มงาน
- **TaskDetailPage** (`/tasks/:id`) - แสดง/แก้ไขรายละเอียดงาน

#### Components
- **Navbar** - แสดงข้อมูลผู้ใช้ + ปุ่ม logout
- **TaskList** - รายการงาน
- **TaskItem** - แต่ละงานพร้อมปุ่ม edit/delete
- **TaskForm** - ฟอร์มสร้าง/แก้ไขงาน
- **LoadingSpinner** - แสดงสถานะ loading
- **ErrorMessage** - แสดง error

### 2.5 UX Features
- Loading state ขณะเรียก API
- Error handling แสดงข้อความที่เหมาะสม
- Protected Routes (redirect ไป login ถ้ายังไม่ได้ล็อกอิน)
- Form validation ฝั่ง client

---

## Phase 3: Global State with Redux Toolkit (25 คะแนน)

### 3.1 Auth Slice
```javascript
// state
{
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null
}

// actions
- login
- register
- logout
- getMe
- clearError
```

### 3.2 Task Slice
```javascript
// state
{
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null
}

// actions
- fetchTasks
- createTask
- updateTask
- deleteTask
- setCurrentTask
- clearError
```

### 3.3 Async Thunks
- ใช้ createAsyncThunk สำหรับทุก API call
- จัดการ pending, fulfilled, rejected states

---

## Phase 4: Deployment (15 คะแนน)

### 4.1 Backend Deploy (Render)
- สร้าง account Render
- สร้าง Web Service ใหม่
- Connect GitHub repository
- ตั้งค่า Environment Variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `NODE_ENV=production`
  - `PORT=10000`
- Deploy

### 4.2 Frontend Deploy (Vercel)
- สร้าง account Vercel
- Import GitHub repository
- ตั้งค่า Environment Variables:
  - `VITE_API_URL` (URL ของ backend ที่ deploy แล้ว)
- Deploy

### 4.3 CORS Configuration
- อัปเดต backend ให้อนุญาต origin ของ Vercel

---

## Phase 5: Documentation

### 5.1 README.md
- วิธีติดตั้งและรันระบบทั้งสองฝั่ง
- URL ของระบบที่ deploy แล้ว
- ภาพ capture การทำงานของระบบ

### 5.2 .env.example
- ไฟล์ตัวอย่างสำหรับตัวแปร environment

---

## เหตุผลการเลือกใช้ Redux Toolkit

1. **Standard อุตสาหกรรม**: Redux เป็น state management ที่นิยมใช้ใน production
2. **Redux Toolkit ลด boilerplate**: ลดโค้ดที่ต้องเขียนเทียบกับ Redux แบบดั้งเดิม
3. **DevTools ที่ดี**: มี Redux DevTools สำหรับ debug
4. **Async Handling**: createAsyncThunk จัดการ async operations ได้ดี
5. **Scalable**: เหมาะกับการขยายโปรเจกต์ในอนาคต

---

## ลำดับการทำงาน

1. สร้าง Backend structure + MongoDB connection
2. สร้าง Models (User, Task)
3. สร้าง Middleware (auth, error handling)
4. สร้าง Auth Routes + Controllers
5. สร้าง Task Routes + Controllers
6. ทดสอบ Backend ด้วย Postman
7. สร้าง Frontend ด้วย Vite
8. สร้าง Redux Store + Slices
9. สร้าง Services (API calls)
10. สร้าง Pages + Components
11. เชื่อมต่อ Frontend กับ Backend
12. Deploy Backend บน Render
13. Deploy Frontend บน Vercel
14. ทดสอบระบบที่ deploy แล้ว
15. เขียน Documentation
