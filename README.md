# Placement Prediction Dashboard

A full-stack machine learning project that predicts whether an MBA student is likely to get placed and estimates their potential salary based on academic and profile data.

This project was built as a practical portfolio-ready application to demonstrate end-to-end ML workflow, API development, and frontend integration.

## Project Overview

The Placement Prediction Dashboard helps evaluate a student profile using academic metrics such as SSC marks, HSC marks, degree percentage, MBA marks, work experience, and employability test scores. The system uses trained machine learning models to provide:

- Placement probability
- Placement outcome (Placed / Not Placed)
- Estimated salary for placed candidates

This project is designed to showcase:

- Data-driven decision-making
- Python-based ML model deployment
- REST API development with FastAPI
- Modern frontend experience using React
- End-to-end product thinking for real-world use cases

## Why This Project?

Placement prediction is a meaningful real-world use case in education and career analytics. It combines machine learning with a simple user-facing interface that can be used by students, counselors, or career advisors to understand their likelihood of placement.

From a portfolio perspective, this project demonstrates:

- Ability to build ML-powered applications
- Integration of model inference with web interfaces
- API design and backend services
- Clean frontend implementation and user experience
- Deployment-ready architecture for local and production use cases

## Features

- Student profile form for academic and personal inputs
- Real-time placement prediction using trained ML model
- Probability score display for placement likelihood
- Binary prediction result: Placed or Not Placed
- Estimated salary generation for predicted placed candidates
- Responsive web interface
- FastAPI backend with CORS support for frontend communication

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- Pandas
- Joblib
- scikit-learn

### Machine Learning
- Classification model for placement prediction
- Regression model for salary estimation

## Project Structure

```text
Placement Prediction/
├── Backend/
│   ├── main.py
│   ├── requirements.txt
│   └── models/
│       ├── placement_model.joblib
│       └── salary_model.joblib
├── Dataset/
│   └── placement_dataset.ipynb
├── Frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       └── index.css
├── README.md
└── .gitignore (if present)
```

## How It Works

1. The user enters their academic and profile details in the frontend form.
2. The React app sends the data to the FastAPI backend.
3. The backend validates the input and prepares it for ML inference.
4. The placement model calculates the probability of placement.
5. If the student is predicted as placed, the salary model estimates a likely salary.
6. The frontend displays the result in a clear and user-friendly format.

## Example Inputs

The form includes values such as:

- SSC percentage
- HSC percentage
- Board type
- Stream
- Degree percentage
- Work experience
- Employability test score
- MBA specialization
- MBA percentage

## API Endpoint

### POST /predict

Request body:

```json
{
  "ssc_p": 82,
  "hsc_p": 78,
  "ssc_b": "Central",
  "hsc_b": "Others",
  "hsc_s": "Science",
  "degree_p": 80,
  "degree_t": "Sci&Tech",
  "workex": "Yes",
  "etest_p": 74,
  "specialisation": "Mkt&Fin",
  "mba_p": 85
}
```

Response:

```json
{
  "placement_probability": 0.86,
  "placement_prediction": "Placed",
  "estimated_salary": 850000,
  "salary_currency": "INR",
  "salary_note": "Model estimate only; actual salary may be higher or lower."
}
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Placement Prediction"
```

### 2. Set Up Backend

```bash
cd Backend
python -m venv venv
```

Activate the virtual environment:

- Windows:
```bash
venv\Scripts\activate
```

- macOS/Linux:
```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Set Up Frontend

Open a new terminal and run:

```bash
cd Frontend
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Project Impact

This project demonstrates practical application of machine learning in higher education and career guidance. It provides a simple, interactive platform for evaluating student outcomes based on academic history and other measurable factors.

It is especially useful for:

- Career counseling
- Student decision support
- Education analytics dashboards
- Portfolio presentation of machine learning skills

## Portfolio Summary

This project highlights my ability to:

- work with structured datasets
- train and evaluate machine learning models
- build robust backend APIs
- integrate predictive models into a polished frontend
- create a full-stack application that solves a real-world problem

## Future Enhancements

- Add authentication and user profiles
- Improve model accuracy with advanced feature engineering
- Add visualization charts for placement trends
- Deploy the solution on cloud platforms
- Include multiple departments or colleges in the model
- Develop a dashboard for administrators and career services

## License

This project is for educational and portfolio purposes.

## Author

[Your Name]

## Contact

- Email: your.email@example.com
- LinkedIn: linkedin.com/in/yourprofile
- GitHub: github.com/yourusername

---

This project is a strong example of applied machine learning and full-stack development, making it suitable for showcasing professional technical capability in a portfolio or job application.
