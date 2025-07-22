# Resume Optimizer

AI-powered resume and job description analyzer to help you optimize your resume for specific job postings.

## Features

- Upload your resume (PDF or DOCX)
- Upload or paste a job description
- Get an AI-generated analysis: match score, missing keywords, and improvement suggestions
- Dark mode toggle
- Responsive, modern UI (Tailwind CSS)

## Tech Stack

- **Frontend:** Angular 20 (standalone components, signals, reactive forms), Tailwind CSS, ngx-markdown
- **Backend:** Node.js, Express, Multer, pdf-parse, mammoth, Google Gemini API

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm
- Angular CLI (`npm install -g @angular/cli`)
- Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### Backend Setup

1. `cd backend`
2. `npm install`
3. Create a `.env` file in `backend/` with:

   ```text
   PORT=5000
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. Start the backend:

   ```bash
   npm run dev
   # or
   npm start
   ```

   The backend runs on `http://localhost:5000` by default.

### Frontend Setup

1. In the project root:

   ```bash
   npm install
   ng serve
   ```

2. The app will be available at `http://localhost:4200`

## Usage

1. Open the app in your browser.
2. Upload your resume (PDF or DOCX).
3. Upload a job description file **or** paste the job description text.
4. Click **Analyze Resume**.
5. View the AI-powered analysis, including:
   - Match score (0-100)
   - Missing keywords
   - Suggested improvements

## API

- **Endpoint:** `POST /api/analyze`
- **Form Data:**
  - `resume`: Resume file (PDF/DOCX, required)
  - `jobDesc`: Job description file (optional if `jobDescText` is provided)
  - `jobDescText`: Job description as text (optional if `jobDesc` is provided)
- **Response:** `{ analysis: string }` (Markdown)

## Styling

- 100% Tailwind CSS (no custom CSS)

## License

MIT
