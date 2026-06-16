# 📝 Blog Platform — CSC 202 Group 4

> **Full-stack blog platform** built with Node.js + Express (backend) and React + TypeScript (frontend).

## 👥 Group Members
| # | Matric No. | Name | Role |
|---|---|---|---|
| 1 | 24120112005 | ADONGO, Oryiman | Team Lead |
| 2 | 24120112011 | AROWOLO, Adetunlese | Backend Dev |
| 3 | 23120112018 | ERIC-MAKWE, Chigozirim | Backend Dev |
| 4 | 24120112027 | KUKOYI, Oluwajuwonlo | Presentation Designer |
| 5 | 24120112036 | NGIGE, Nnaemeka | Frontend Dev |
| 6 | 25120112062 | OBARISIAGBON, Eseosa | Frontend Dev |
| 7 | 24120112046 | ONWUEGBUCHU, Brian | QA / Docs |
| 8 | 24120112055 | SOYINKA, Fikunmi | QA / Docs|

---

## 🗂️ Project Structure
```
blog-platform/
├── backend/         # Node.js + Express API
│   └── src/
│       ├── config/      # DB connection
│       ├── controllers/ # Route logic
│       ├── middleware/  # JWT auth
│       ├── models/      # Mongoose schemas
│       ├── routes/      # API routes
│       └── server.js    # Entry point
└── frontend/        # React + TypeScript (Vite)
    └── src/
        ├── api/         # Axios API client
        ├── components/  # Reusable UI components
        ├── context/     # Auth context
        ├── pages/       # Page components
        └── types/       # TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repo
```bash
git clone https://github.com/<your-org>/blog-platform.git
cd blog-platform
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env — set MONGO_URI and JWT_SECRET
npm install
npm run dev
```
Backend runs at **http://localhost:5000**

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
# Ensure VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```
Frontend runs at **http://localhost:5173**

---

## 🔌 API Endpoints

### Auth (`/api/auth`)
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login user, returns JWT | ❌ |
| GET | `/me` | Get current user | ✅ |

### Posts (`/api/posts`)
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/` | Get all published posts | ❌ |
| GET | `/:slug` | Get a single post | ❌ |
| POST | `/` | Create a post | ✅ |
| PUT | `/:id` | Update a post | ✅ |
| DELETE | `/:id` | Delete a post | ✅ |
| POST | `/:id/like` | Toggle like on a post | ✅ |
| GET | `/my-posts` | Get current user's posts | ✅ |

### Comments (`/api/comments`)
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/:postId` | Get comments for a post | ❌ |
| POST | `/:postId` | Add a comment | ✅ |
| DELETE | `/:id` | Delete a comment | ✅ |

### Users (`/api/users`)
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/:id` | Get user profile | ❌ |
| GET | `/:id/posts` | Get posts by user | ❌ |
| PUT | `/me` | Update current user | ✅ |

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Browse & search all posts |
| Post Detail | `/post/:slug` | Read a post, like, comment |
| Login | `/login` | Sign in |
| Register | `/register` | Create an account |
| Dashboard | `/dashboard` | Manage your posts |
| Write | `/write` | Create / edit a post |

---

## 🛠️ Tech Stack

**Backend**
- Node.js + Express (ES Modules)
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

**Frontend**
- React 18 + TypeScript
- Next
- React Router v6
- Axios
- react-hot-toast

---

## 🌿 Git Workflow

- **No direct push to `main`**
- Use feature branches: `feature/<name>-<feature>`
- Submit all work via **Pull Requests**
- Minimum **5–10 commits per student**
- Minimum **2 PRs per student**

### Example branch names
```
feat/adongo-post-model
feat/kukoyi-home-page
feat/soyinka-deployment
feat/obarisiagbon-readme
```

---

## ✅ Submission Checklist
- [ ] GitHub repository link
- [ ] Live deployed link
- [ ] README documentation
- [ ] Final group presentation

---

*CSC 202 — Computer Programming II | Group 4 | Second Semester*
