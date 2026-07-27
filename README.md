# 🚀 Smart Resume Analyzer

**AI-powered resume analysis platform** — upload a resume, get an instant ATS score, skill insights, and personalized improvement suggestions, powered by Google's Gemini AI.

---

## 📑 Table of Contents

- [Features](#-features)
- [System Architecture](#️-system-architecture)
- [Tech Stack](#️-tech-stack)
- [Resume Parsing Engine](#-resume-parsing-engine)
- [Supported File Types](#️-supported-file-types)
- [Privacy-Focused Design](#-privacy-focused-design)
- [Real-Time Job Processing](#-real-time-job-processing)
- [Results Dashboard](#-results-dashboard)
- [Issue Reporting System](#-issue-reporting-system)
- [REST API Endpoints](#-rest-api-endpoints)
- [Installation Guide](#-installation-guide)
- [Linux Setup](#-linux-setup)
- [Windows Setup](#-windows-setup)
- [Production Deployment](#-production-deployment-nginx)
- [HTTPS Setup](#-https-setup-certbot)
- [Rate Limiting](#-rate-limiting-nginx)
- [Backend Process Management](#️-backend-process-management-pm2)
- [Error Logging](#-error-logging)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## ✨ Features

- 📄 Multi-layer resume parsing pipeline
- 🔍 OCR support for scanned resumes
- 🤖 AI-powered resume analysis using **Google Gemini**
- ⚡ Real-time job processing & progress tracking
- 📊 ATS score & skill insights dashboard
- 🌐 React frontend + Node.js backend
- 🔐 HTTPS & rate limiting via NGINX
- 🐧 Cross-platform support (Windows + Linux)
- 📧 Integrated issue reporting system
- 🧠 Automatic Tesseract model download
- 📦 Production deployment ready (PM2 + EC2)

---

## 🏗️ System Architecture

```
Frontend (React)
        ↓
NGINX Reverse Proxy
        ↓
Backend (Node.js + Express)
        ↓
Resume Parsing Engine
        ↓
Gemini AI Analysis Service
```

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express

### Parsing & OCR
- pdfjs-dist
- pdf-text-extract (Poppler `pdftotext`)
- mammoth
- Tesseract OCR
- pdf-poppler (Windows)
- poppler-utils (Linux)

### AI Integration
- **Google Gemini API** (`@google/generative-ai`)

### DevOps & Deployment
- NGINX
- PM2
- AWS EC2
- Certbot (SSL)

---

## 📄 Resume Parsing Engine

The backend implements a multi-layer parsing strategy to maximize reliability across different resume formats.

### Parsing Flow

```
PDF Upload
   ↓
pdfjs (fast extraction)
   ↓ fallback
pdf-text-extract (pdftotext)
   ↓ fallback
OCR (Tesseract)
   ↓
Text Cleaning
   ↓
Gemini AI Analysis
```

---

## ⚙️ Supported File Types

| Format         | Parsing Method   |
| -------------- | ---------------- |
| PDF (standard) | pdfjs            |
| PDF (complex)  | pdf-text-extract |
| PDF (scanned)  | OCR              |
| DOCX           | mammoth          |

---

## 🔐 Privacy-Focused Design

- Files are processed entirely in memory
- No permanent resume storage
- Temporary files deleted automatically
- Uploads handled using multer memory storage

---

## ⚡ Real-Time Job Processing

The application uses an asynchronous job-based architecture.

**Workflow:**
```
uploading → parsing → analyzing → completed / failed
```

### Progress Tracking

| Stage       | Progress |
| ----------- | -------- |
| Upload      | 10%      |
| Parsing     | 40%      |
| AI Analysis | 70%      |
| Completed   | 100%     |

---

## 📊 Results Dashboard

The frontend dynamically renders:

- ATS Score
- Skills
- Missing Keywords
- Strengths
- Suggestions
- Key Highlights

---

## 📧 Issue Reporting System

Integrated feedback/reporting system using Nodemailer.

**Endpoint:**
```
POST /api/report
```

Users can submit:
- Optional email
- Subject
- Issue description

---

## 🧾 REST API Endpoints

| Method | Endpoint                     | Description             |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/api/resumes`                | Upload & analyze resume |
| GET    | `/api/resumes/:jobId/status`  | Check job status        |
| POST   | `/api/report`                 | Submit issue report     |

---

## 🚀 Installation Guide

### 📌 Prerequisites

- Node.js v18+
- npm
- Git

---

## 🐧 Linux Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Gowtham071205/Smart-Resume-Analyzer.git
cd Smart-Resume-Analyzer
```

### 2️⃣ Install Linux Dependencies

```bash
sudo apt update
sudo apt install -y poppler-utils
sudo apt install -y tesseract-ocr
sudo apt install -y tesseract-ocr-eng
```

### 3️⃣ Install Node Dependencies

**Frontend**
```bash
npm install
```

**Backend**
```bash
cd backend
npm install
```

### 4️⃣ Create Environment Variables

Create a `.env` file inside `backend`:

```env
PORT=5000

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash

EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### 5️⃣ Start Development Servers

**Backend**
```bash
cd backend
npm run dev
```

**Frontend**
```bash
npm run dev
```

---

## 🪟 Windows Setup

### Install Poppler (required for `pdftotext`)

Download prebuilt Windows binaries from:
👉 https://github.com/oschwartz10612/poppler-windows/releases

Extract, then add the `bin` folder (the one containing `pdftotext.exe`) to your system `PATH`.

Verify installation:
```bash
pdftotext -v
```

### Install Backend Packages

```bash
npm install pdf-poppler
npm install pdfjs-dist mammoth pdf-text-extract uuid tesseract.js @google/generative-ai
```

---

## 🌐 Production Deployment (NGINX)

### Install NGINX

```bash
sudo apt install nginx
```

### Example NGINX Config

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /home/ubuntu/smart-resume-analyzer/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 🔐 HTTPS Setup (Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
sudo certbot renew --dry-run
```

---

## 🚧 Rate Limiting (NGINX)

Inside `/etc/nginx/nginx.conf`:

```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/s;
limit_req_status 429;
```

Apply to API routes:

```nginx
location /api/ {
    limit_req zone=api_limit burst=10 nodelay;
    proxy_pass http://127.0.0.1:5000;
}
```

Restart NGINX:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## ⚙️ Backend Process Management (PM2)

```bash
npm install -g pm2
pm2 start server.js --name smart-resume-analyzer

pm2 list
pm2 restart smart-resume-analyzer
pm2 stop smart-resume-analyzer
pm2 delete smart-resume-analyzer
pm2 logs smart-resume-analyzer

pm2 startup
pm2 save
```

---

## 📁 Error Logging

Structured logging implemented using **Winston**.

```
logs/
 ├── error.log
 └── files/
```

Failed resumes are logged with metadata for debugging purposes.

---

## 🧠 Key Learnings

- Not all PDFs contain extractable text
- OCR is essential for scanned documents
- Multiple parsers improve reliability
- Post-processing significantly improves OCR accuracy
- Free-tier AI API quotas can silently throttle production use — always check your plan/rate limits

---

## 🚀 Future Improvements

- Authentication system
- User profiles
- Database-backed job persistence
- Advanced AI scoring models
- Parallel OCR processing

---


## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
