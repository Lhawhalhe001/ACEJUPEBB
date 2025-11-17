# Ace Jupeb Learning Portal - Next.js Starter

## Setup locally

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Visit http://localhost:3000

## Connect to backend

- Open `src/utils/api.js` and replace `BASE_URL` with your backend URL. Example:
  ```js
  export const BASE_URL = 'https://api.your-backend.com/api';
  ```
- Backend endpoints used in this frontend (example names):
  - `POST /auth/student-login` or `POST /auth/admin-login` for authentication
  - `POST /admin/generate-code` to create student access codes
  - `POST /admin/upload-note` (multipart/form-data) to upload files
  - `GET /notes` to list notes grouped by subject
  - `GET /past-questions` to list past papers
  - `POST /quizzes` to create quizzes and `GET /quizzes/:subject` to retrieve

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/ace-jupeb.git
git push -u origin main
```

## Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Import the `ace-jupeb` repository and deploy
3. On Vercel, set any environment variables (e.g. `NEXT_PUBLIC_API_BASE_URL`) if needed
