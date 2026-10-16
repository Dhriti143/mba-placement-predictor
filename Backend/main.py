
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"

placement_model = joblib.load(MODEL_DIR / "placement_model.joblib")
salary_model = joblib.load(MODEL_DIR / "salary_model.joblib")

app = FastAPI(title="Student Placement Prediction API")

# Allows a local React/Vite frontend to call the API.
# Restrict this to your actual frontend domain in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class StudentProfile(BaseModel):
    ssc_p: float = Field(ge=0, le=100)
    hsc_p: float = Field(ge=0, le=100)
    ssc_b: str
    hsc_b: str
    hsc_s: str
    degree_p: float = Field(ge=0, le=100)
    degree_t: str
    workex: str
    etest_p: float = Field(ge=0, le=100)
    specialisation: str
    mba_p: float = Field(ge=0, le=100)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(profile: StudentProfile):
    # Use the exact feature names expected by your pipelines.
    student = pd.DataFrame([profile.model_dump()])

    probability = float(
        placement_model.predict_proba(student)[0, 1]
    )
    prediction = int(placement_model.predict(student)[0])

    estimated_salary = None
    if prediction == 1:
        estimated_salary = float(
            salary_model.predict(student)[0]
        )

    return {
        "placement_probability": probability,
        "placement_prediction": (
            "Placed" if prediction == 1 else "Not Placed"
        ),
        "estimated_salary": estimated_salary,
        "salary_currency": "INR",
        "salary_note": (
            "Model estimate only; actual salary may be higher or lower."
            if estimated_salary is not None
            else None
        ),
    }
