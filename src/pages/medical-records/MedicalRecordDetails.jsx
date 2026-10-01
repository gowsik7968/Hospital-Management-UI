import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function MedicalRecordDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD RECORD
  // =========================

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const fetchRecord = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        `/medical-records/${id}`
      );

      const medicalRecord = response.data;

      setRecord(medicalRecord);

      // Load patient
      try {

        const patientResponse = await api.get(
          `/patients/${medicalRecord.patientId}`
        );

        setPatient(patientResponse.data);

      } catch (error) {
        console.error(
          "Unable to load patient:",
          error
        );
      }

      // Load doctor
      try {

        const doctorResponse = await api.get(
          `/doctors/${medicalRecord.doctorId}`
        );

        setDoctor(doctorResponse.data);

      } catch (error) {
        console.error(
          "Unable to load doctor:",
          error
        );
      }

    } catch (error) {

      console.error(
        "Error loading medical record:",
        error
      );

      setError("Medical record not found.");

    } finally {

      setLoading(false);

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
  // NOT FOUND
  // =========================

  if (!record) {

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
          onClick={() => navigate("/medical-records")}
        >
          Back to Medical Records
        </button>

      </div>
    );
  }

  // =========================
  // DATA
  // =========================

  const patientName =
    patient?.name || record.patientName || "Unknown Patient";

  const doctorName =
    doctor?.name || record.doctorName || "Unknown Doctor";

  return (
    <div className="medical-record-details-page">

      {/* HEADER */}
      <div className="medical-record-details-header">

        <div>

          <h1 className="medical-record-details-title">
            Medical Record Details
          </h1>

          <p className="medical-record-details-subtitle">
            View complete medical record information
          </p>

        </div>

        <span className="medical-record-edit-id">
          {record.id}
        </span>

      </div>

      {/* MAIN CARD */}
      <div className="medical-record-details-card">

        {/* PATIENT SECTION */}
        <div className="medical-record-details-section">

          <h4 className="medical-record-details-section-title">
            <i className="bi bi-person me-2"></i>
            Patient Information
          </h4>

          <div className="row">

            <div className="col-md-6">
              <div className="medical-record-detail-item">

                <span className="medical-record-detail-label">
                  Patient Name
                </span>

                <span className="medical-record-detail-value">
                  {patientName}
                </span>

              </div>
            </div>

            <div className="col-md-6">
              <div className="medical-record-detail-item">

                <span className="medical-record-detail-label">
                  Patient ID
                </span>

                <span className="medical-record-detail-value">
                  {record.patientId}
                </span>

              </div>
            </div>

          </div>

        </div>

        {/* DOCTOR SECTION */}
        <div className="medical-record-details-section">

          <h4 className="medical-record-details-section-title">
            <i className="bi bi-person-badge me-2"></i>
            Doctor Information
          </h4>

          <div className="row">

            <div className="col-md-6">
              <div className="medical-record-detail-item">

                <span className="medical-record-detail-label">
                  Doctor Name
                </span>

                <span className="medical-record-detail-value">
                  {doctorName}
                </span>

              </div>
            </div>

            <div className="col-md-6">
              <div className="medical-record-detail-item">

                <span className="medical-record-detail-label">
                  Doctor ID
                </span>

                <span className="medical-record-detail-value">
                  {record.doctorId}
                </span>

              </div>
            </div>

          </div>

        </div>

        {/* MEDICAL INFORMATION */}
        <div className="medical-record-details-section">

          <h4 className="medical-record-details-section-title">
            <i className="bi bi-clipboard2-pulse me-2"></i>
            Medical Information
          </h4>

          <div className="row">

            <div className="col-md-6">

              <div className="medical-record-detail-item">

                <span className="medical-record-detail-label">
                  Diagnosis
                </span>

                <span className="medical-record-detail-value">
                  {record.diagnosis}
                </span>

              </div>

            </div>

            <div className="col-md-6">

              <div className="medical-record-detail-item">

                <span className="medical-record-detail-label">
                  Date
                </span>

                <span className="medical-record-detail-value">
                  {record.date}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* TREATMENT */}
        <div className="medical-record-details-section">

          <h4 className="medical-record-details-section-title">
            <i className="bi bi-capsule me-2"></i>
            Treatment
          </h4>

          <div className="medical-record-detail-notes">
            {record.treatment}
          </div>

        </div>

        {/* NOTES */}
        <div className="medical-record-details-section">

          <h4 className="medical-record-details-section-title">
            <i className="bi bi-journal-text me-2"></i>
            Medical Notes
          </h4>

          <div className="medical-record-detail-notes">
            {record.notes}
          </div>

        </div>

        {/* ACTIONS */}
        <div className="medical-record-details-actions">

          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate("/medical-records")
            }
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(`/medical-records/edit/${record.id}`)
            }
          >
            <i className="bi bi-pencil me-2"></i>
            Edit Record
          </button>

        </div>

      </div>

    </div>
  );
}

export default MedicalRecordDetails;