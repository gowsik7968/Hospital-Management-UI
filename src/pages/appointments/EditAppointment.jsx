import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const APPOINTMENT_API =
  "http://localhost:8080/api/appointments";


const PATIENT_API =
  "http://localhost:8080/api/patients";


const DOCTOR_API =
  "http://localhost:8080/api/doctors";


function EditAppointment() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [appointment, setAppointment] =
    useState(null);

  const [patients, setPatients] =
    useState([]);

  const [doctors, setDoctors] =
    useState([]);


  const [formData, setFormData] =
    useState({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      status: "Pending",
      reason: ""
    });


  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");


  // LOAD APPOINTMENT + PATIENTS + DOCTORS

  useEffect(() => {

    const loadData = async () => {

      try {

        setLoading(true);

        setError("");


        const [
          appointmentResponse,
          patientsResponse,
          doctorsResponse
        ] = await Promise.all([

          axios.get(
            `${APPOINTMENT_API}/${id}`
          ),

          axios.get(
            PATIENT_API
          ),

          axios.get(
            DOCTOR_API
          )

        ]);


        const appointmentData =
          appointmentResponse.data;


        setAppointment(
          appointmentData
        );


        setPatients(
          patientsResponse.data
        );


        setDoctors(
          doctorsResponse.data
        );


        setFormData({

          patientId:
            appointmentData.patientId || "",

          doctorId:
            appointmentData.doctorId || "",

          date:
            appointmentData.date || "",

          time:
            appointmentData.time || "",

          status:
            appointmentData.status ||
            "Pending",

          reason:
            appointmentData.reason || ""

        });


      } catch (error) {

        console.error(
          "Error loading appointment:",
          error
        );

        setError(
          "Unable to load appointment information."
        );

      } finally {

        setLoading(false);

      }

    };


    loadData();

  }, [id]);


  // INPUT CHANGE

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData(
      (currentData) => ({
        ...currentData,
        [name]: value
      })
    );

  };


  // PATIENT CHANGE

  const handlePatientChange =
    (event) => {

      setFormData(
        (currentData) => ({
          ...currentData,
          patientId: event.target.value
        })
      );

    };


  // DOCTOR CHANGE

  const handleDoctorChange =
    (event) => {

      setFormData(
        (currentData) => ({
          ...currentData,
          doctorId: event.target.value
        })
      );

    };


  // SUBMIT

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      try {

        setSaving(true);

        setError("");


        const updatedAppointment = {

          id: id,

          patientId:
            formData.patientId,

          doctorId:
            formData.doctorId,

          date:
            formData.date,

          time:
            formData.time,

          status:
            formData.status,

          reason:
            formData.reason

        };


        await axios.put(

          `${APPOINTMENT_API}/${id}`,

          updatedAppointment

        );


        navigate(
          `/appointments/${id}`
        );


      } catch (error) {

        console.error(
          "Error updating appointment:",
          error
        );

        setError(
          "Unable to update appointment."
        );

      } finally {

        setSaving(false);

      }

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


  // NOT FOUND

  if (!appointment) {

    return (

      <div className="appointment-page">

        <div className="page-header">

          <div>

            <h1 className="page-title">
              Appointment Not Found
            </h1>

            <p className="page-subtitle">
              The requested appointment could not be found.
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
            Edit Appointment
          </h1>

          <p className="page-subtitle">
            Update appointment information
          </p>

        </div>


        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate(
              `/appointments/${id}`
            )
          }
        >
          ← Back
        </button>

      </div>


      {/* ERROR */}

      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}


      {/* FORM CARD */}

      <div className="appointment-form-card">


        <div className="appointment-form-header">

          <div>

            <h5>
              Appointment Information
            </h5>

            <p>
              Update appointment {id}
            </p>

          </div>

        </div>


        <form onSubmit={handleSubmit}>


          <div className="row g-3">


            {/* PATIENT */}

            <div className="col-md-6">

              <label className="form-label">
                Patient
              </label>


              <select
                name="patientId"
                className="form-select"
                value={formData.patientId}
                onChange={handlePatientChange}
                required
              >

                <option value="">
                  Select Patient
                </option>


                {patients.map(
                  (patient) => (

                    <option
                      key={patient.id}
                      value={patient.id}
                    >
                      {patient.name} ({patient.id})
                    </option>

                  )
                )}

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
                onChange={handleDoctorChange}
                required
              >

                <option value="">
                  Select Doctor
                </option>


                {doctors.map(
                  (doctor) => (

                    <option
                      key={doctor.id}
                      value={doctor.id}
                    >
                      {doctor.name} -{" "}
                      {doctor.specialization}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* DEPARTMENT */}

            <div className="col-md-6">

              <label className="form-label">
                Department
              </label>


              <input
                type="text"
                className="form-control"
                value={
                  doctors.find(
                    (doctor) =>
                      doctor.id ===
                      formData.doctorId
                  )?.department || ""
                }
                readOnly
              />

            </div>


            {/* DATE */}

            <div className="col-md-6">

              <label className="form-label">
                Appointment Date
              </label>


              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>


            {/* TIME */}

            <div className="col-md-6">

              <label className="form-label">
                Appointment Time
              </label>


              <input
                type="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
                required
              />

            </div>


            {/* STATUS */}

            <div className="col-md-6">

              <label className="form-label">
                Status
              </label>


              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>


            {/* REASON */}

            <div className="col-12">

              <label className="form-label">
                Appointment Reason
              </label>


              <textarea
                name="reason"
                className="form-control"
                placeholder="Enter reason for appointment..."
                value={formData.reason}
                onChange={handleChange}
                minLength="3"
                maxLength="250"
                required
              />

            </div>


          </div>


          {/* ACTIONS */}

          <div className="appointment-form-actions">


            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                navigate(
                  `/appointments/${id}`
                )
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>


          </div>


        </form>

      </div>

    </div>

  );

}


export default EditAppointment;