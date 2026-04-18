# Project: STEM Teacher-Dispatch (Elite Dual-Role Demo)
# Context: Node/Express MVC Backend + React/Tailwind Frontend

## 🛠 Commands
- Start Backend: `node server.js`
- Create Frontend: `npm create vite@latest client -- --template react`
- Install Deps: `cd client && npm install axios lucide-react react-router-dom lucide-react`

## 🎯 THE MISSION (2-HOUR SPRINT)
Build a "Real Auth" system where a peer can log in as either an Admin or an Instructor.

### Admin Flow (Role: 'admin')
- Dashboard: Fetch `/api/instructors/stats` -> Show "Revenue at Risk" KPI.
- Management: Master list of all Assignments (Open & Staffed).
- View: High-contrast Dark Sidebar.

### Instructor Flow (Role: 'instructor')
- Dashboard: "Open Assignments" list with 'Claim' button.
- Logic: PATCH `/api/assignments/claim/:id` (Success = Toast notification).
- View: Clean, professional Light Sidebar.

## 🔑 AUTH & CREDENTIALS (For Demo)
- Admin: `admin@test.com` / `admin123`
- Instructor: `teacher@test.com` / `password123`
- Token: Store in localStorage; attach as Bearer token to all Axios requests.

## 📏 Standards
- UI: Tailwind CSS, modern SaaS/FinTech aesthetic.
- Components: Functional React components, clean separation.
- API: Use central `src/api.js` Axios instance pointing to `http://localhost:3000/api`.

## IMPORTANT: Completion Hook
When you finish a task (after the code is written and files are saved), run this terminal command to notify me:
- Mac: `say "Task Complete"`
- Linux/WSL: `notify-send "Claude Task Complete"`
- Windows: `powershell.exe [console]::beep(500,300)`