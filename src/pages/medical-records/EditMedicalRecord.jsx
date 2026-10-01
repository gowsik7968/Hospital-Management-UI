import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditMedicalRecord() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    patientId: "",
    doctorId: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    date: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchData();

  }, [id]);

  const fetchData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        recordResponse,
        patientsResponse,
        doctorsResponse
      ] = await Promise.all([
        api.get(`/medical-records/${id}`),
        api.get("/patients"),
        api.get("/doctors")
      ]);

      setFormData(recordResponse.data);

      setPatients(patientsResponse.data);
      setDoctors(doctorsResponse.data);

    } catch (error) {

      console.error(
        "Error loading medical record:",
        error
      );

      setError("Unable to load medical record.");

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================
  // UPDATE RECORD
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
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

    try {

      setSaving(true);

      await api.put(
        `/medical-records/${id}`,
        {
          id: formData.id,
          patientId: formData.patientId,
          doctorId: formData.doctorId,
          diagnosis: formData.diagnosis,
          treatment: formData.treatment,
          notes: formData.notes,
          date: formData.date
        }
      );

      navigate(`/medical-records/${id}`);

    } catch (error) {

      console.error(
        "Error updating medical record:",
        error
      );

      if (error.response?.data?.message) {

        setError(
          error.response.data.message
        );

      } else {

        setError(
          "Failed to update medical record."
        );
      }

    } finally {

      setSaving(false);

    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="text-center py-5">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="mt-3">
          Loading medical record...
        </p>

      </div>
    );
  }

  // =========================
  // ERROR / NOT FOUND
  // =========================

  if (!formData.id) {

    return (
      <div className="medical-record-not-found">

        <div className="medical-record-not-found-icon">
          <i className="bi bi-file-earmark-medical"></i>
        </div>

        <h3>
          Medical Record Not Found
        </h3>

        <p>
          {error || "The requested medical record does not exist."}
        </p>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/medical-records")
          }
        >
          Back to Medical Records
        </button>

      </div>
    );
  }

  return (
    <div className="edit-medical-record-page">

      {/* HEADER */}
      <div className="edit-medical-record-header">

        <div>

          <h1 className="page-title">
            Edit Medical Record
          </h1>

          <p className="page-subtitle">
            Update medical record information
          </p>

        </div>

        <span className="medical-record-edit-id">
          {formData.id}
        </span>

      </div>

      {/* FORM CARD */}
      <div className="medical-record-form-card">

        <div className="medical-record-form-header">

          <div>
            <h4>
              Medical Record Information
            </h4>

            <p>
              Update the details below
            </p>
          </div>

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
                className="form-control"
                value={formData.id}
                disabled
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
                placeholder="Enter medical notes"
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
              onClick={() =>
                navigate(`/medical-records/${id}`)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >

              {saving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                  ></span>

                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-2"></i>
                  Update Record
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditMedicalRecord;