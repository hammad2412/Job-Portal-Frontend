# Talentium README HTML Template

````html
<div align="center">
  <h1>🚀 Talentium - AI Powered MERN Job Portal</h1>
  <p>
    A full-stack job portal that connects candidates and recruiters with
    <strong>AI Resume Parsing</strong>, role-based dashboards, secure
    authentication, and scalable backend architecture.
  </p>

  <p>
    <img
      src="https://img.shields.io/badge/MERN-Stack-3fa037?style=for-the-badge"
    />
    <img
      src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge"
    />
    <img src="https://img.shields.io/badge/AWS-S3-orange?style=for-the-badge" />
    <img
      src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge"
    />
    <img
      src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge"
    />
  </p>
</div>

--- ## 📌 Overview Talentium is a production-grade MERN stack job portal with
dedicated candidate and recruiter workflows. Candidates can create profiles,
upload resumes, and auto-fill profile data using AI. Recruiters can manage
companies, create jobs, and review applications. --- --- ## ✨ Features ### 👤
Candidate Features - Candidate registration and login - Profile creation and
update - Skills, education, experience, projects, and preferences - AI-powered
resume upload and auto-fill - Job browsing and search - Apply to jobs - Track
application status - Profile completion percentage ### 🏢 Recruiter Features -
Recruiter registration and login - Company profile management - Create, update,
and delete jobs - Change job status (open, closed, draft) - Review applicants -
Update application status ### 🤖 AI Features - Resume upload in PDF and DOCX
format - AWS S3 storage - Text extraction using PDF Parse and Mammoth -
Structured data extraction using Google Gemini - Automatic profile headline and
skills population ### 🔒 Security Features - JWT access and refresh tokens -
HttpOnly cookies - Role-based access control - Helmet - Rate limiting - HPP
protection - Joi validation --- ## 🧠 AI Resume Parsing Workflow ```text Upload
Resume ↓ Store in AWS S3 ↓ Extract Text from PDF/DOCX ↓ Google Gemini API ↓
Extract Headline + Skills ↓ Save to MongoDB ↓ Auto-Fill Candidate Profile
````

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Context API
- CSS Modules / Custom CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- JWT
- Multer

### AI & File Processing

- Google Gemini API
- AWS S3
- PDF Parse
- Mammoth

### Security

- Helmet
- Express Rate Limit
- HPP
- CORS
- Cookie Parser

---

## 🏗️ Architecture

```text
Frontend (React + Vite)
        ↓
REST API (Express.js)
        ↓
Authentication (JWT + Refresh Tokens)
        ↓
Validation (Joi)
        ↓
Controllers
        ↓
Services (Gemini + AWS S3)
        ↓
MongoDB (Mongoose)
```

---

## 📁 Project Structure

```text
Talentium/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── validations/
    │   ├── services/
    │   ├── utils/
    │   └── config/
    └── package.json
```

---

## 🔌 Key API Endpoints

| Method | Endpoint                                  | Description            |
| ------ | ----------------------------------------- | ---------------------- |
| POST   | `/api/v1/auth/login`                      | User login             |
| POST   | `/api/v1/auth/register/candidate`         | Candidate registration |
| POST   | `/api/v1/auth/register/recruiter`         | Recruiter registration |
| POST   | `/api/v1/candidate-profile/upload-resume` | AI resume parsing      |
| GET    | `/api/v1/candidate-profile/full-profile`  | Full candidate profile |
| POST   | `/api/v1/jobs`                            | Create job             |
| GET    | `/api/v1/jobs`                            | Browse jobs            |
| POST   | `/api/v1/applications/apply/:jobId`       | Apply to job           |

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/hammad2412/talentium.git
cd talentium
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment

### Backend

- Render

### Database

- MongoDB Atlas

### File Storage

- AWS S3

---

## 💼 Resume Highlights

- Built a full-stack MERN Job Portal with role-based candidate and recruiter dashboards.
- Integrated Google Gemini API and AWS S3 to implement AI-powered resume parsing.
- Designed secure JWT authentication with rotating refresh tokens and HttpOnly cookies.
- Developed scalable REST APIs with Joi validation, modular architecture, and MongoDB.

---

## 🔮 Future Enhancements

- AI Job Match Scoring
- Resume Improvement Suggestions
- Email Notifications
- Redis Caching
- Advanced Candidate Search

---

## SCREENSHOTS

## HERO SECTION

<p align="center">
  <img src="../../frontend/job-portal-frontend/src/assets/SS/HeroSection.png" alt="Hero Section" width="48%" />
</p>

## WHY TALENTIUM

<p align="center">
  <img src="../../frontend/job-portal-frontend/src/assets/SS/Path.png" alt="Hero Section" width="48%" />
  <img src="../../frontend/job-portal-frontend/src/assets/SS/Companies.png" alt="Hero Section" width="48%" />
  <img src="../../frontend/job-portal-frontend/src/assets/SS/Path.png" alt="Hero Section" width="48%" />
  <img src="../../frontend/job-portal-frontend/src/assets/SS/How.png" alt="Hero Section" width="48%" />
</p>

### LOGIN AND REGISTER

<p align="center">
  <img src="../../frontend/job-portal-frontend/src/assets/SS/RecruiterLogin.png" alt="Hero Section" width="48%" />
  <img src="../../frontend/job-portal-frontend/src/assets/SS/CandidateLogin.png" alt="Hero Section" width="48%" />
</p>

### 👤 Candidate Dashboard

<p align="center">
  <img
    src="../../frontend/job-portal-frontend/src/assets/SS/CandidateDashboard.png"
    alt="Candidate Dashboard"
    width="100%"
  />
  <img
    src="../../frontend/job-portal-frontend/src/assets/SS/CandidateProfile.png"
    alt="Candidate Dashboard"
    width="100%"
  />
  <img
    src="../../frontend/job-portal-frontend/src/assets/SS/JobsList.png"
    alt="Candidate Dashboard"
    width="100%"
  />
</p>

### RECRUITER Dashboard

<p align="center"> 
 <img
    src="../../frontend/job-portal-frontend/src/assets/SS/RecruiterDashboard.png"
    alt="Candidate Dashboard"
    width="100%"
  />
 <img
    src="../../frontend/job-portal-frontend/src/assets/SS/PostJob.png"
    alt="Candidate Dashboard"
    width="100%"
  />
 <img
    src="../../frontend/job-portal-frontend/src/assets/SS/JobManagement.png"
    alt="Candidate Dashboard"
    width="100%"
  />
 <img
    src="../../frontend/job-portal-frontend/src/assets/SS/CompanyProfile.png"
    alt="Candidate Dashboard"
    width="100%"
  />
</p>

## 👨‍💻 Author

<div align="center">
  <h3>Mohd Hammad Khan</h3>
  <p>Full-Stack Developer</p>

<a href="https://github.com/hammad2412">GitHub</a> • <a href="https://www.linkedin.com/in/hammadkhan1224/">LinkedIn</a>

</div>

---

<div align="center">
  <strong>⭐ If you like this project, consider giving it a star on GitHub! ⭐</strong>
</div>
```
