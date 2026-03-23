# SE NPRU TaskFlow Mini

ระบบจัดการงานส่วนบุคคล (Personal Task Management System) แบบ Fullstack ที่พัฒนาด้วย React, Redux Toolkit, Node.js, Express และ MongoDB

## คุณสมบัติหลัก

- **ระบบสมาชิก**: สมัครสมาชิกและเข้าสู่ระบบด้วย JWT Authentication
- **จัดการงาน**: สร้าง, อ่าน, อัปเดต, ลบ (CRUD) รายการงาน
- **สถานะงาน**: กำหนดสถานะเป็น pending, in-progress, completed
- **ระดับความสำคัญ**: กำหนด priority เป็น low, medium, high
- **Global State**: จัดการ state ด้วย Redux Toolkit
- **Responsive Design**: รองรับการแสดงผลบนทุกขนาดหน้าจอ

## เทคโนโลยีที่ใช้

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs (เข้ารหัสรหัสผ่าน)
- express-validator (validation)
- CORS

### Frontend
- React 18 + Vite
- Redux Toolkit (State Management)
- React Router DOM
- Axios (HTTP Client)
- Tailwind CSS v4 + DaisyUI v5 (UI Framework)

## การติดตั้งและรันระบบ

### 1. Clone Repository
```bash
git clone <repository-url>
cd SE-NPRU-TaskFlow-Mini
```

### 2. ตั้งค่า Backend

```bash
cd backend

# ติดตั้ง dependencies
npm install

# สร้างไฟล์ .env (ตามค่าในไฟล์ .env.example)
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=secret_key_taskflow
Client_URL=http://localhost:5173

# รัน server
npm run dev
```

Backend จะทำงานที่: http://localhost:3000

### 3. ตั้งค่า Frontend

```bash
cd frontend

# ติดตั้ง dependencies
npm install

# สร้างไฟล์ .env (ตามค่าในไฟล์ .env.example)
VITE_API_URL=http://localhost:3000/api
VITE_CLIENT_URL=http://localhost:5173

# รัน development server
npm run dev
```

Frontend จะทำงานที่: http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/me` - ดึงข้อมูลผู้ใช้ที่ล็อกอิน (ต้องมี token)

### Tasks
- `GET /api/tasks` - ดึงรายการงานทั้งหมดของผู้ใช้ (ต้องมี token)
- `GET /api/tasks/:id` - ดึงข้อมูลงานเฉพาะ (ต้องมี token)
- `POST /api/tasks` - สร้างงานใหม่ (ต้องมี token)
- `PUT /api/tasks/:id` - อัปเดตงาน (ต้องมี token)
- `DELETE /api/tasks/:id` - ลบงาน (ต้องมี token)

## ผลการทดสอบ API (API Test Results)

> ทดสอบด้วยข้อมูลสมมติ วันที่ 23 มีนาคม 2569 | ฐานข้อมูล: MongoDB Atlas

| # | Method | Endpoint | Description | Status | Response |
|---|--------|----------|-------------|--------|----------|
| 1 | POST | /api/auth/register | สมัครสมาชิกใหม่ | ✅ 200 OK | `{success:true, data:{_id, name, email, token}}` |
| 2 | POST | /api/auth/login | เข้าสู่ระบบ | ✅ 200 OK | `{success:true, data:{_id, name, email, token}}` |
| 3 | GET | /api/auth/me | ดึงข้อมูลผู้ใช้ปัจจุบัน | ✅ 200 OK | `{success:true, data:{_id, name, email}}` |
| 4 | POST | /api/tasks | สร้างงานใหม่ | ✅ 200 OK | `{success:true, data:{_id, title, status, priority, user, ...}}` |
| 5 | GET | /api/tasks | ดึงรายการงานทั้งหมด | ✅ 200 OK | `{success:true, count:1, data:[...]}` |
| 6 | GET | /api/tasks/:id | ดึงข้อมูลงานเฉพาะ | ✅ 200 OK | `{success:true, data:{...}}` |
| 7 | PUT | /api/tasks/:id | อัปเดตสถานะงาน | ✅ 200 OK | `{success:true, data:{...status:"in-progress"}}` |
| 8 | DELETE | /api/tasks/:id | ลบงาน | ✅ 200 OK | `{success:true, message:"Task removed"}` |

### ข้อมูลที่ใช้ทดสอบ

```json
// Register / Login
{
  "name": "Somsak Jaidee",
  "email": "somsak@npru.ac.th",
  "password": "123456"
}

// Create Task
{
  "title": "ส่งรายงาน SE",
  "description": "เขียนรายงานวิศวกรรมซอฟต์แวร์",
  "priority": "high",
  "dueDate": "2026-04-01"
}

// Update Task
{
  "status": "in-progress"
}
```

### ผลการทดสอบ Validation (Error Cases)

| Case | Input | Expected | Result |
|------|-------|----------|--------|
| Register ซ้ำ email | email เดิม | 400 Bad Request | ✅ Pass |
| Login password ผิด | password ผิด | 401 Unauthorized | ✅ Pass |
| เรียก API โดยไม่มี token | ไม่มี Authorization header | 401 Unauthorized | ✅ Pass |
| PUT task โดยไม่มี title | `{"status":"in-progress"}` | 200 OK (title optional) | ✅ Pass |

## โครงสร้าง Redux Store

### Auth Slice
```javascript
{
  user: null | { _id, name, email, token },
  token: null | string,
  isLoading: boolean,
  error: null | string
}
```

### Task Slice
```javascript
{
  tasks: [],
  currentTask: null,
  isLoading: boolean,
  error: null | string
}
```

## เหตุผลการเลือกใช้ Redux Toolkit

1. **Standard อุตสาหกรรม**: Redux เป็น state management ที่นิยมใช้ใน production ทั่วโลก
2. **ลด Boilerplate**: Redux Toolkit ลดโค้ดที่ต้องเขียนเทียบกับ Redux แบบดั้งเดิม
3. **DevTools ที่ดี**: มี Redux DevTools สำหรับ debug และติดตามการเปลี่ยนแปลง state
4. **Async Handling**: createAsyncThunk จัดการ async operations ได้อย่างมีประสิทธิภาพ
5. **Scalable**: เหมาะกับการขยายโปรเจกต์ในอนาคต

## การ Deploy

### Backend (Render)

1. สร้างบัญชีที่ [Render](https://render.com)
2. สร้าง Web Service ใหม่
3. Connect กับ GitHub repository
4. ตั้งค่า:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: URL ของ MongoDB Atlas
     - `JWT_SECRET`: Secret key สำหรับ JWT
     - `NODE_ENV`: production
     - `PORT`: 10000

### Frontend (Vercel)

1. สร้างบัญชีที่ [Vercel](https://vercel.com)
2. Import GitHub repository
3. ตั้งค่า:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL`: URL ของ Backend ที่ deploy บน Render

## URLs ของระบบที่ Deploy แล้ว

- **Frontend**: https://se-npru-taskflow-mini.vercel.app
- **Backend API**: https://se-npru-taskflow-mini-u0yi.onrender.com

## ภาพตัวอย่างการใช้งาน

### หน้า Login
![Login Page](./screenshots/login.png)

### หน้า Register
![Register Page](./screenshots/register.png)

### หน้า Dashboard
![Dashboard Page](./screenshots/dashboard.png)

### หน้า Task Detail
![Task Detail Page](./screenshots/task-detail.png)

## การใช้งาน AI ในการพัฒนา

โปรเจกต์นี้ใช้ AI (Qoder) ช่วยในการเขียนโค้ด ได้แก่:
- สร้างโครงสร้างโปรเจกต์ทั้ง Backend และ Frontend
- เขียน Redux slices และ async thunks
- สร้าง React components และ pages
- ออกแบบ UI ด้วย Tailwind CSS และ DaisyUI

**หมายเหตุ**: โค้ดทั้งหมดได้รับการตรวจสอบและปรับแก้ให้เหมาะสมกับความต้องการของระบบ

## ผู้พัฒนา

พัฒนาโดย: [Your Name]
วิชา: 7153310 การพัฒนาโปรแกรมสำหรับอุปกรณ์เคลื่อนที่ & 7153311 การพัฒนาซอฟต์แวร์เชิงคอมโพเนนต์
มหาวิทยาลัยราชภัฏนครปฐม (NPRU)
