# Job Application App

A full-stack job application tracker for managing applications, tracking their status, and logging in as a user.

This project contains:

- `application-app/` — a React + TypeScript frontend for the user interface
- `backend/` — an Express + MongoDB API for authentication and application data

## Live Demo

<img width="1709" height="895" alt="image" src="https://github.com/user-attachments/assets/9c201d6d-8aeb-4dfe-a6f3-ee6f07945737" />

[Demo](https://job-application-app-b5dt.onrender.com)

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, and delete job applications
- Track application status such as saved, applied, interview, offered, and rejected
- Filter applications by status from the frontend
- Local persistence of the authenticated user in the browser

## Tech Stack

Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Axios

Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment variables

## Project Structure

```text
job-application-app/
├── application-app/         # Frontend React app
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── backend/                 # Express API
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   └── .env.example (if added locally)
├── README.md                # This file
└── .gitignore
```

## Frontend Tests

The frontend uses Vitest, React Testing Library, and jsdom for component tests. From the `application-app/` directory, install dependencies and run the test suite:

```bash
npm install
npm test
```

Run tests in watch mode during development with:

```bash
npm run test:watch
```

Tests live alongside the components they cover under `src/Components/`. The current suite covers application cards, application forms, status columns, and the login page.
