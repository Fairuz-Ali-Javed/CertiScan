# CertiScan — Enterprise Document Verification Portal

CertiScan is a purpose-driven document verification platform for authenticating applicant credentials across university admissions, scholarship applications, government recruitment, corporate employment background checks, and loan processing.

---

## Official Active User View

The **React + Vite** application located in the root directory (`/src`, `/public`, `index.html`) is the **SINGLE OFFICIAL ACTIVE FRONTEND USER VIEW**. 

Any legacy static HTML/CSS prototypes preserved under `legacy/User View/` are historical archives and are **NOT** the active application.

---

## Quick Start for Teammates

### Requirements
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### 1. Clone & Switch Branch
```bash
git clone <repository-url>
cd CertiScan
git checkout frontend/react-user-view-final
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Application
```bash
npm run dev
```
The application will start at `http://localhost:5173`.

### 4. Build Production Application
```bash
npm run build
```

---

## Frontend Architecture & Directory Layout

```
CertiScan/
├── src/
│   ├── assets/        # Visual icons, SVG assets, and hero graphics
│   ├── components/    # Reusable React components (layout, common, upload)
│   ├── constants/     # Purpose-driven document schemas & navigation maps
│   ├── context/       # React Context (AuthContext, ToastContext)
│   ├── data/          # Initial verification data & mock applicant records
│   ├── hooks/         # Custom React hooks (useAuth, useToast)
│   ├── pages/         # Application view pages (Dashboard, Upload, Status, History, etc.)
│   ├── services/      # CENTRAL API & BACKEND INTEGRATION LAYER
│   │   ├── api.js                 # Centralized fetch client & VITE_API_BASE_URL
│   │   ├── authService.js         # Authentication API calls with fallback
│   │   ├── documentService.js     # Upload & OCR endpoint integration (/upload)
│   │   └── verificationService.js # Application submission & audit queue endpoints
│   ├── utils/         # Helper utilities (validators, formatters, cn)
│   ├── App.jsx        # Central router configuration
│   ├── main.jsx       # React application entry point
│   └── index.css      # Design system & Tailwind styling
├── public/            # Static public assets (favicon, site logo)
├── legacy/            # Archived static HTML/CSS files (non-active)
├── Document Verification/ # Teammate FastAPI, OCR, & AI verification backend
├── .env.example       # Example environment variables
├── index.html         # Single Page Application HTML root
├── package.json       # Dependencies and npm scripts
└── vite.config.js     # Vite builder configuration
```

---

## Backend Teammate Integration Guide (FastAPI)

All API requests are centralized under `src/services/`. **You do not need to modify any React pages or UI components to connect your endpoints.**

### Centralized API Base URL Configuration
Create a `.env` file in the root directory (or copy from `.env.example`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Key Endpoint Integration Points

1. **Document Ingestion & AI Detection (`POST /upload`)**
   - File: [`src/services/documentService.js`](file:///f:/CertiScan%28MP%29/src/services/documentService.js)
   - Payload: `FormData` with `file` (UploadFile) and `document_type` (Form field).
   - Compatible with `Document Verification/main.py` and `Document Verification/api.py`.

2. **Authentication (`POST /auth/login`, `POST /auth/register`)**
   - File: [`src/services/authService.js`](file:///f:/CertiScan%28MP%29/src/services/authService.js)

3. **Application Submission & Status (`POST /verification/submit`, `GET /verification/status/:id`)**
   - File: [`src/services/verificationService.js`](file:///f:/CertiScan%28MP%29/src/services/verificationService.js)

When backend endpoints are not running locally, the frontend service layer automatically uses clean fallback mock data so UI development and testing remain seamless.

---

## Verification Purpose Schemas

CertiScan supports configurable purpose-driven document workflows defined in [`src/constants/documentTypes.js`](file:///f:/CertiScan%28MP%29/src/constants/documentTypes.js):
- **College Admission** (Government ID, 10th Marksheet, 12th Marksheet, Income Proof)
- **Scholarship Application** (Government ID, Income Certificate, Highest Qualification, Category Proof)
- **Government Recruitment** (Government ID, Highest Qualification, Category Proof, Experience Proof)
- **Job / Employment Background Check** (Government ID, Highest Qualification, Experience Proof)
- **Loan / Financial Verification** (Government ID, PAN Card, Income Proof, Address Proof)
- **General Purpose** (Custom credential verification)
