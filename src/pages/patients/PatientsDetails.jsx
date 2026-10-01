import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

function PatientDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================================
  // FETCH PATIENT
  // =========================================================

  useEffect(() => {

    const fetchPatient = async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await api.get(
            `/patients/${id}`
          );


        setPatient(response.data);

      } catch (err) {

        console.error(
          "Error fetching patient:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Failed to load patient details."
        );

      } finally {

        setLoading(false);
      }
    };


    fetchPatient();

  }, [id]);


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="patient-page">

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >
          </div>

          <p className="mt-3 text-muted">
            Loading patient details...
          </p>

        </div>

      </div>
    );
  }


  // =========================================================
  // ERROR / NOT FOUND
  // =========================================================

  if (error || !patient) {

    return (

      <div className="patient-page">

        <div className="page-header">

          <div>

            <h1 className="page-title">
              Patient Not Found
            </h1>

            <p className="page-subtitle">
              The requested patient could not be found.
            </p>

          </div>


          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              navigate("/patients")
            }
          >
            ← Back
          </button>

        </div>


        {error && (

          <div className="alert alert-danger">

            {error}

          </div>

        )}

      </div>
    );
  }


  const patientStatus =
    patient.status || "Active";


  return (

    <div className="patient-page">


      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Patient Details
          </h1>

          <p className="page-subtitle">
            View complete patient information
          </p>

        </div>


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/patients")
          }
        >
          ← Back
        </button>

      </div>


      {/* DETAILS CARD */}

      <div className="patient-details-card">


        {/* HEADER */}

        <div className="patient-details-header">


          <div className="patient-profile">


            <div className="patient-details-avatar">

              {patient.name
                ?.charAt(0)
                .toUpperCase()}

            </div>


            <div>

              <h2 className="patient-details-name">

                {patient.name}

              </h2>


              <p className="patient-details-id">

                Patient ID: {patient.id}

              </p>

            </div>

          </div>


          {/* STATUS */}

          <span
            className={`status-badge ${
              patientStatus === "Inactive"
                ? "status-inactive"
                : "status-active"
            }`}
          >
            {patientStatus}
          </span>

        </div>


        {/* PERSONAL INFORMATION */}

        <div className="patient-details-section">

          <h3 className="patient-details-section-title">
            Personal Information
          </h3>


          <div className="row g-4">


            {/* NAME */}

            <div className="col-md-6">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Full Name
                </span>

                <span className="patient-detail-value">
                  {patient.name}
                </span>

              </div>

            </div>


            {/* AGE */}

            <div className="col-md-6">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Age
                </span>

                <span className="patient-detail-value">
                  {patient.age} years
                </span>

              </div>

            </div>


            {/* GENDER */}

            <div className="col-md-6">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Gender
                </span>

                <span className="patient-detail-value">
                  {patient.gender}
                </span>

              </div>

            </div>


            {/* BLOOD GROUP */}

            <div className="col-md-6">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Blood Group
                </span>

                <span className="patient-detail-value">
                  {patient.bloodGroup || "Not Provided"}
                </span>

              </div>

            </div>


            {/* STATUS */}

            <div className="col-md-6">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Status
                </span>

                <span className="patient-detail-value">

                  <span
                    className={`status-badge ${
                      patientStatus === "Inactive"
                        ? "status-inactive"
                        : "status-active"
                    }`}
                  >
                    {patientStatus}
                  </span>

                </span>

              </div>

            </div>

          </div>

        </div>


        {/* CONTACT INFORMATION */}

        <div className="patient-details-section">

          <h3 className="patient-details-section-title">
            Contact Information
          </h3>


          <div className="row g-4">


            {/* PHONE */}

            <div className="col-md-6">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Contact Number
                </span>

                <span className="patient-detail-value">
                  {patient.phone || "Not Provided"}
                </span>

              </div>

            </div>


            {/* EMAIL */}

            <div className="col-md-6">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Email
                </span>

                <span className="patient-detail-value">
                  {patient.email || "Not Provided"}
                </span>

              </div>

            </div>


            {/* ADDRESS */}

            <div className="col-12">

              <div className="patient-detail-item">

                <span className="patient-detail-label">
                  Address
                </span>

                <span className="patient-detail-value">
                  {patient.address || "Not Provided"}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="patient-details-actions">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              navigate("/patients")
            }
          >
            Back to Patients
          </button>


          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate(
                `/patients/${patient.id}/edit`
              )
            }
          >
            Edit Patient
          </button>

        </div>

      </div>

    </div>
  );
}

export default PatientDetails;