import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const APPOINTMENT_API =
  "http://localhost:8080/api/appointments";


function AppointmentDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [appointment, setAppointment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadAppointment = async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await axios.get(
            `${APPOINTMENT_API}/${id}`
          );


        setAppointment(response.data);

      } catch (error) {

        console.error(
          "Error loading appointment:",
          error
        );


        setError(
          "Unable to load appointment."
        );

      } finally {

        setLoading(false);

      }

    };


    loadAppointment();

  }, [id]);


  const getStatusClass = (status) => {

    if (status === "Confirmed") {
      return "appointment-status-confirmed";
    }

    if (status === "Completed") {
      return "appointment-status-completed";
    }

    if (status === "Cancelled") {
      return "appointment-status-cancelled";
    }

    return "appointment-status-pending";

  };


  // LOADING

  if (loading) {

    return (

      <div className="appointment-page">

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <p className="mt-3">
            Loading appointment...
          </p>

        </div>

      </div>

    );

  }


  // NOT FOUND / ERROR

  if (!appointment) {

    return (

      <div className="appointment-page">

        <div className="page-header">

          <div>

            <h1 className="page-title">
              Appointment Not Found
            </h1>

            <p className="page-subtitle">
              {error ||
                "The requested appointment could not be found."}
            </p>

          </div>


          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              navigate("/appointments")
            }
          >
            Back to Appointments
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="appointment-page">


      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Appointment Details
          </h1>

          <p className="page-subtitle">
            View complete appointment information
          </p>

        </div>


        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/appointments")
          }
        >
          ← Back
        </button>

      </div>


      {/* DETAILS CARD */}

      <div className="appointment-details-card">


        {/* HEADER */}

        <div className="appointment-details-header">

          <div>

            <h2 className="appointment-details-title">
              {appointment.id}
            </h2>

            <p className="appointment-details-subtitle">
              Scheduled appointment
            </p>

          </div>


          <span
            className={`appointment-status ${getStatusClass(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>

        </div>


        {/* PATIENT INFORMATION */}

        <div className="appointment-details-section">

          <h3 className="appointment-details-section-title">
            Patient Information
          </h3>


          <div className="row g-4">


            <div className="col-md-6">

              <div className="appointment-detail-item">

                <span className="appointment-detail-label">
                  Patient Name
                </span>

                <span className="appointment-detail-value">
                  {appointment.patientName ||
                    "Unknown Patient"}
                </span>

              </div>

            </div>


            <div className="col-md-6">

              <div className="appointment-detail-item">

                <span className="appointment-detail-label">
                  Patient ID
                </span>

                <span className="appointment-detail-value">
                  {appointment.patientId ||
                    "-"}
                </span>

              </div>

            </div>


          </div>

        </div>


        {/* DOCTOR INFORMATION */}

        <div className="appointment-details-section">

          <h3 className="appointment-details-section-title">
            Doctor Information
          </h3>


          <div className="row g-4">


            <div className="col-md-6">

              <div className="appointment-detail-item">

                <span className="appointment-detail-label">
                  Doctor Name
                </span>

                <span className="appointment-detail-value">
                  {appointment.doctorName ||
                    "Unknown Doctor"}
                </span>

              </div>

            </div>


            <div className="col-md-3">

              <div className="appointment-detail-item">

                <span className="appointment-detail-label">
                  Doctor ID
                </span>

                <span className="appointment-detail-value">
                  {appointment.doctorId ||
                    "-"}
                </span>

              </div>

            </div>


            <div className="col-md-3">

              <div className="appointment-detail-item">

                <span className="appointment-detail-label">
                  Department
                </span>

                <span className="appointment-detail-value">
                  {appointment.department ||
                    "-"}
                </span>

              </div>

            </div>


          </div>

        </div>


        {/* APPOINTMENT SCHEDULE */}

        <div className="appointment-details-section">

          <h3 className="appointment-details-section-title">
            Appointment Schedule
          </h3>


          <div className="row g-4">


            <div className="col-md-6">

              <div className="appointment-detail-item">

                <span className="appointment-detail-label">
                  Date
                </span>

                <span className="appointment-detail-value">
                  {appointment.date ||
                    "-"}
                </span>

              </div>

            </div>


            <div className="col-md-6">

              <div className="appointment-detail-item">

                <span className="appointment-detail-label">
                  Time
                </span>

                <span className="appointment-detail-value">
                  {appointment.time ||
                    "-"}
                </span>

              </div>

            </div>


          </div>

        </div>


        {/* REASON */}

        <div className="appointment-details-section">

          <h3 className="appointment-details-section-title">
            Appointment Reason
          </h3>


          <div className="appointment-detail-item">

            <span className="appointment-detail-label">
              Reason
            </span>

            <span className="appointment-detail-value">
              {appointment.reason ||
                "No reason provided"}
            </span>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="appointment-details-actions">


          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              navigate("/appointments")
            }
          >
            Back to Appointments
          </button>


          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(
                `/appointments/${appointment.id}/edit`
              )
            }
          >
            Edit Appointment
          </button>


        </div>


      </div>

    </div>

  );

}


export default AppointmentDetails;