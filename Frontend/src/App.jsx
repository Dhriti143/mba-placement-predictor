
import { useState } from "react";
import "./App.css";

const initialForm = {
  ssc_p: "",
  hsc_p: "",
  ssc_b: "",
  hsc_b: "",
  hsc_s: "",
  degree_p: "",
  degree_t: "",
  workex: "",
  etest_p: "",
  specialisation: "",
  mba_p: "",
};

const fields = [
  ["ssc_p", "Secondary school marks (%)", "number"],
  ["hsc_p", "Higher secondary marks (%)", "number"],
  ["ssc_b", "Secondary board", "select", ["Central", "Others"]],
  ["hsc_b", "Higher secondary board", "select", ["Central", "Others"]],
  ["hsc_s", "Higher secondary stream", "select", ["Commerce", "Science", "Arts"]],
  ["degree_p", "Degree marks (%)", "number"],
  ["degree_t", "Degree type", "select", ["Sci&Tech", "Comm&Mgmt", "Others"]],
  ["workex", "Work experience", "select", ["Yes", "No"]],
  ["etest_p", "Employability test marks (%)", "number"],
  ["specialisation", "MBA specialization", "select", ["Mkt&Fin", "Mkt&HR"]],
  ["mba_p", "MBA marks (%)", "number"],
];

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      ...form,
      ssc_p: Number(form.ssc_p),
      hsc_p: Number(form.hsc_p),
      degree_p: Number(form.degree_p),
      etest_p: Number(form.etest_p),
      mba_p: Number(form.mba_p),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed (${response.status})`);
      }

      setResult(await response.json());
    } catch (err) {
      setError(
        "Could not get a prediction. Check that the FastAPI backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1 style={{ color: "#2457c5" }}>MBA Student Placement Predictor</h1>
      <p>Enter an academic profile to receive an ML-based estimate.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {fields.map(([name, label, type, options]) => (
            <label key={name}>
              {label}
              {type === "select" ? (
                <select
                  name={name}
                  value={form[name]}
                  onChange={updateField}
                  required
                >
                  <option value="" disabled>Select an option</option>

                  {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={name}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={form[name]}
                  onChange={updateField}
                  required
                />
              )}
            </label>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict placement"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}

      {result && (
        <section className="result">
          <h2 style={{ color: "#2457c5" }}>Prediction results</h2>
          <p>
            Placement probability:{" "}
            {(result.placement_probability * 100).toFixed(1)}%
          </p>
          <p>Prediction: {result.placement_prediction}</p>
          {result.estimated_salary !== null ? (
            <p>
              Estimated salary:{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(result.estimated_salary)}
            </p>
          ) : (
            <p>No salary estimate is provided by this workflow.</p>
          )}
          <small>
            Predictions are estimates, not guarantees of placement or salary.
          </small>
        </section>
      )}
    </main>
  );
}
