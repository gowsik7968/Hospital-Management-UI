import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorForm from "../../components/DoctorForm";
import DoctorTable from "../../components/DoctorTable";

import api from "../../services/api";

function Doctors() {

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Load doctors from backend
  useEffect(() => {

    fetchDoctors();

  }, []);

  const fetchDoctors = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get("/doctors");

      setDoctors(response.data);

    } catch (error) {

      console.error(
        "Error fetching doctors:",
        error
      );

      setError(
        "Unable to load doctors. Please check the backend server."
      );

    } finally {

      setLoading(false);

    }
  };

  // Search + department filter
  const filteredDoctors = doctors.filter((doctor) => {

    const searchValue = search.toLowerCase();

    const matchSearch =
      doctor.name?.toLowerCase().includes(searchValue) ||
      doctor.id?.toLowerCase().includes(searchValue) ||
      doctor.specialization
        ?.toLowerCase()
        .includes(searchValue);

    const matchesDepartment =
      department === "All" ||
      doctor.department === department;

    return matchSearch && matchesDepartment;
  });

  // Add doctor
  const handleAddDoctor = (newDoctor) => {

    setDoctors((currentDoctors) => [
      ...currentDoctors,
      newDoctor
    ]);

  };

  // View doctor
  const handleViewDoctor = (doctor) => {

    navigate(`/doctors/${doctor.id}`);

  };

  // Edit doctor
  const handleEditDoctor = (doctor) => {

    navigate(`/doctors/${doctor.id}/edit`);

  };

  // Delete doctor
  const handleDeleteDoctor = async (doctor) => {

    const confirmed = window.confirm(
      `Delete ${doctor.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {

      await api.delete(
        `/doctors/${doctor.id}`
      );

      setDoctors((currentDoctors) =>
        currentDoctors.filter(
          (currentDoctor) =>
            currentDoctor.id !== doctor.id
        )
      );

    } catch (error) {

      console.error(
        "Error deleting doctor:",
        error
      );

      alert("Unable to delete doctor.");

    }
  };

  return (
    <div className="doctor-page">

      {/* Page Header */}
      <div className="page-header">

        <div>

          <h1 className="page-title">
            Doctors
          </h1>

          <p className="page-subtitle">
            Manage hospital doctor information
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add New Doctor
        </button>

      </div>

      {/* Add Doctor Form */}
      {showForm && (
        <DoctorForm
          onAdd={handleAddDoctor}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Doctor Card */}
      <div className="doctor-card">

        <div className="doctor-toolbar">

          {/* Search */}
          <input
            type="text"
            className="form-control search-box"
            placeholder="Search by name, ID or specialization..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {/* Department Filter */}
          <select
            className="form-select"
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
          >

            <option value="All">
              All Departments
            </option>

            <option value="Cardiology">
              Cardiology
            </option>

            <option value="Neurology">
              Neurology
            </option>

            <option value="Orthopedics">
              Orthopedics
            </option>

            <option value="General Medicine">
              General Medicine
            </option>

            <option value="Dermatology">
              Dermatology
            </option>

            <option value="Pediatrics">
              Pediatrics
            </option>

            <option value="Gynecology">
              Gynecology
            </option>

            <option value="ENT">
              ENT
            </option>

          </select>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <p className="text-muted mt-3">
              Loading doctors...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="alert alert-danger">

            {error}

            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={fetchDoctors}
            >
              Retry
            </button>

          </div>
        )}

        {/* Doctor Table */}
        {!loading && !error && (
          <DoctorTable
            doctors={filteredDoctors}
            onView={handleViewDoctor}
            onEdit={handleEditDoctor}
            onDelete={handleDeleteDoctor}
          />
        )}

      </div>

    </div>
  );
}

export default Doctors;