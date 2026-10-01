import { useState } from "react";

function MedicalRecordForm({
  patients,
  doctors,
  onAdd,
  onClose
}) {

  const [formData, setFormData] = useState({
    id: "",
    patientId: "",
    doctorId: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    date: ""
  });

  const [error, setError] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    if (
      !formData.id ||
      !formData.patientId ||
      !formData.doctorId ||
      !formData.diagnosis ||
      !formData.treatment ||
      !formData.notes ||
      !formData.date
    ) {
      setError("Please fill all fields.");
      return;
    }

    onAdd(formData);
  };

  return (
    <div className="medical-record-form-card">

      <div className="medical-record-form-header">

        <div>
          <h4>
            Add Medical Record
          </h4>

          <p>
            Enter patient diagnosis and treatment information
          </p>
        </div>

        <button
          type="button"
          className="btn-close"
          onClick={onClose}
        ></button>

      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="row g-3">

          {/* RECORD ID */}
          <div className="col-md-6">

            <label className="form-label">
              Record ID
            </label>

            <input
              type="text"
              name="id"
              className="form-control"
              placeholder="Example: MR001"
              value={formData.id}
              onChange={handleChange}
            />

          </div>

          {/* DATE */}
          <div className="col-md-6">

            <label className="form-label">
              Date
            </label>

            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
            />

          </div>

          {/* PATIENT */}
          <div className="col-md-6">

            <label className="form-label">
              Patient
            </label>

            <select
              name="patientId"
              className="form-select"
              value={formData.patientId}
              onChange={handleChange}
            >

              <option value="">
                Select Patient
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {patient.name} ({patient.id})
                </option>
              ))}

            </select>

          </div>

          {/* DOCTOR */}
          <div className="col-md-6">

            <label className="form-label">
              Doctor
            </label>

            <select
              name="doctorId"
              className="form-select"
              value={formData.doctorId}
              onChange={handleChange}
            >

              <option value="">
                Select Doctor
              </option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {doctor.name} ({doctor.id})
                </option>
              ))}

            </select>

          </div>

          {/* DIAGNOSIS */}
          <div className="col-12">

            <label className="form-label">
              Diagnosis
            </label>

            <input
              type="text"
              name="diagnosis"
              className="form-control"
              placeholder="Enter diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
            />

          </div>

          {/* TREATMENT */}
          <div className="col-12">

            <label className="form-label">
              Treatment
            </label>

            <textarea
              name="treatment"
              className="form-control"
              rows="3"
              placeholder="Enter treatment details"
              value={formData.treatment}
              onChange={handleChange}
            ></textarea>

          </div>

          {/* NOTES */}
          <div className="col-12">

            <label className="form-label">
              Medical Notes
            </label>

            <textarea
              name="notes"
              className="form-control"
              rows="4"
              placeholder="Enter additional medical notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="medical-record-form-actions">

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Record
          </button>

        </div>

      </form>

    </div>
  );
}

export default MedicalRecordForm;