# Online Feedback Collector

A simple full-stack web application that allows users to submit feedback and ratings through a user-friendly interface.

## Features

- Submit feedback with name, email, rating, and comments
- Validate required fields
- Display a success message after submission
- Store feedback in an SQLite database
- Retrieve submitted feedback through a REST API
- View feedback statistics through the API

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **API:** REST API

## Project Structure

```text
FeedbackCollector/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Shubham80213/online-feedback-collector.git
cd online-feedback-collector
```

### 2. Install dependencies

```bash
cd backend
npm install
```

### 3. Start the backend

```bash
node server.js
```

The API should run at:

`http://localhost:3000`

### 4. Open the frontend

Open `index.html` using VS Code Live Server.

Keep the backend running while testing the frontend.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check API status |
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/feedback` | Retrieve feedback |
| GET | `/api/stats` | View feedback statistics |

Base URL: `http://localhost:3000`

## Privacy

The local SQLite database and environment files are excluded from Git using `.gitignore`. Do not upload real user emails, private feedback, passwords, or secret keys.

## Future Improvements

- Display feedback entries on the frontend
- Add improved form validation
- Add deployment support
- Improve accessibility and responsive design

## Author

**Shubham Yadav**

GitHub: https://github.com/Shubham80213
