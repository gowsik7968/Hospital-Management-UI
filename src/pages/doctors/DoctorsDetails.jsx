import { useNavigate, useParams } from "react-router-dom";
import doctorsData from "../../data/doctors";

function DoctorsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctorsData.find(
    (currentDoctor) => currentDoctor.id === id
  );

  // Doctor not found
  if (!doctor) {
    return (
      <div className="doctor-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Doctor Not Found</h1>
            <p className="page-subtitle">
              The requested doctor could not be found
            </p>
          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/doctors")}
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Details</h1>
          <p className="page-subtitle">
            View complete doctor information
          </p>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/doctors")}
        >
          ← Back
        </button>
      </div>

      {/* Doctor Details Card */}
      <div className="doctor-details-card">

        {/* Doctor Header */}
        <div className="doctor-details-header">

          <div className="doctor-profile">

            {/* Blue Circle Avatar */}
            <div className="doctor-details-avatar">
              {doctor.name.charAt(0).toUpperCase()}
            </div>

            {/* Doctor Name */}
            <div>
              <h2 className="doctor-details-name">
                {doctor.name}
              </h2>

              <p className="doctor-details-id">
                Doctor ID: {doctor.id}
              </p>
            </div>

            {/* Status */}
            <span
              className={`doctor-status ${
                doctor.status === "Available"
                  ? "doctor-status-available"
                  : "doctor-status-leave"
              }`}
            >
              {doctor.status}
            </span>

          </div>

        </div>

        {/* Professional Information */}
        <div className="doctor-details-section">

          <h3 className="doctor-details-section-title">
            Professional Information
          </h3>

          <div className="row g-4">

            {/* Specialization */}
            <div className="col-md-6">
              <div className="doctor-detail-item">
                <span className="doctor-detail-label">
                  Specialization
                </span>

                <span className="doctor-detail-value">
                  {doctor.specialization}
                </span>
              </div>
            </div>

            {/* Department */}
            <div className="col-md-6">
              <div className="doctor-detail-item">
                <span className="doctor-detail-label">
                  Department
                </span>

                <span className="doctor-detail-value">
                  {doctor.department}
                </span>
              </div>
            </div>

            {/* Experience */}
            <div className="col-md-6">
              <div className="doctor-detail-item">
                <span className="doctor-detail-label">
                  Experience
                </span>

                <span className="doctor-detail-value">
                  {doctor.experience} years
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <div className="doctor-detail-item">
                <span className="doctor-detail-label">
                  Status
                </span>

                <span className="doctor-detail-value">

                  <span
                    className={`doctor-status ${
                      doctor.status === "Available"
                        ? "doctor-status-available"
                        : "doctor-status-leave"
                    }`}
                  >
                    {doctor.status}
                  </span>

                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Information */}
        <div className="doctor-details-section">

          <h3 className="doctor-details-section-title">
            Contact Information
          </h3>

          <div className="row g-4">

            {/* Phone */}
            <div className="col-md-6">
              <div className="doctor-detail-item">

                <span className="doctor-detail-label">
                  Phone
                </span>

                <span className="doctor-detail-value">
                  {doctor.phone}
                </span>

              </div>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <div className="doctor-detail-item">

                <span className="doctor-detail-label">
                  Email
                </span>

                <span className="doctor-detail-value">
                  {doctor.email || "Not Provided"}
                </span>

              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="doctor-details-actions">

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/doctors")}
          >
            Back to Doctors
          </button>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(`/doctors/${doctor.id}/edit`)
            }
          >
            Edit Doctor
          </button>

        </div>

      </div>
    </div>
  );
}

export default DoctorsDetails;