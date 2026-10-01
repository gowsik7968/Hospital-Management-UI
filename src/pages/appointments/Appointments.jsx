import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AppointmentTable from "../../components/AppoinmentTable";
import AppointmentForm from "../../components/AppoimentForm";

const APPOINTMENT_API = "http://localhost:8080/api/appointments";
const PATIENT_API = "http://localhost:8080/api/patients";
const DOCTOR_API = "http://localhost:8080/api/doctors";

function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      const response = await axios.get(APPOINTMENT_API);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error loading appointments:", error);
      setError("Unable to load appointments.");
    }
  };

  const loadPatients = async () => {
    try {
      const response = await axios.get(PATIENT_API);
      setPatients(response.data);
    } catch (error) {
      console.error("Error loading patients:", error);
      setError("Unable to load patients.");
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await axios.get(DOCTOR_API);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error loading doctors:", error);
      setError("Unable to load doctors.");
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        loadAppointments(),
        loadPatients(),
        loadDoctors()
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredAppointments = appointments.filter(
    (appointment) => {
      const searchText = searchValue
        .toLowerCase()
        .trim();

      const matchesSearch =
        appointment.id
          ?.toLowerCase()
          .includes(searchText) ||
        appointment.patientName
          ?.toLowerCase()
          .includes(searchText) ||
        appointment.doctorName
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const handleAddAppointment = async (
    newAppointment
  ) => {
    try {
      setError("");

      await axios.post(
        APPOINTMENT_API,
        newAppointment
      );

      setShowForm(false);

      await loadAppointments();
    } catch (error) {
      console.error(
        "Error adding appointment:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          "Unable to add appointment."
      );
    }
  };

  const handleDeleteAppointment = async (
    appointment
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete appointment ${appointment.id}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await axios.delete(
        `${APPOINTMENT_API}/${appointment.id}`
      );

      await loadAppointments();
    } catch (error) {
      console.error(
        "Error deleting appointment:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to delete appointment."
      );
    }
  };

  const handleViewAppointment = (
    appointment
  ) => {
    navigate(
      `/appointments/${appointment.id}`
    );
  };

  const handleEditAppointment = (
    appointment
  ) => {
    navigate(
      `/appointments/${appointment.id}/edit`
    );
  };

  return (
    <div className="appointment-page">

      <div className="page-header">

        <div>
          <h1 className="page-title">
            Appointments
          </h1>

          <p className="page-subtitle">
            Manage patient appointments and schedules
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            setShowForm(true)
          }
        >
          + Add Appointment
        </button>

      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {showForm && (
        <AppointmentForm
          patients={patients}
          doctors={doctors}
          onAdd={handleAddAppointment}
          onClose={() =>
            setShowForm(false)
          }
        />
      )}

      <div className="appointment-card">

        <div className="appointment-toolbar">

          <div className="search-box">

            <input
              type="text"
              className="form-control"
              placeholder="Search by ID, patient or doctor..."
              value={searchValue}
              onChange={(event) =>
                setSearchValue(
                  event.target.value
                )
              }
            />

          </div>

          <select
            className="form-select"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

        </div>

        {loading ? (

          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            />

            <p className="mt-3">
              Loading appointments...
            </p>

          </div>

        ) : (

          <AppointmentTable
            appointments={
              filteredAppointments
            }
            onView={
              handleViewAppointment
            }
            onEdit={
              handleEditAppointment
            }
            onDelete={
              handleDeleteAppointment
            }
          />

        )}

      </div>

    </div>
  );
}

export default Appointments;