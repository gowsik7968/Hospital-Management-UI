import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientTable from "../../components/PatientTable";
import PatientForm from "../../components/PatientForm";
import api from "../../services/api";

function Patients() {

  const navigate = useNavigate();


  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [gender, setGender] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================================
  // FETCH PATIENTS
  // =========================================================

  useEffect(() => {

    fetchPatients();

  }, []);


  const fetchPatients = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await api.get("/patients");


      setPatients(response.data);

    } catch (err) {

      console.error(
        "Error fetching patients:",
        err
      );


      setError(
        "Unable to load patients. Please check the backend server."
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================================================
  // SEARCH + GENDER FILTER
  // =========================================================

  const filteredPatients =
    patients.filter((patient) => {

      const searchText =
        search.trim().toLowerCase();


      const patientId =
        String(patient.id || "").toLowerCase();


      const patientName =
        String(patient.name || "").toLowerCase();


      const patientPhone =
        String(patient.phone || "");


      const matchesSearch =
        patientName.includes(searchText) ||
        patientId.includes(searchText) ||
        patientPhone.includes(search.trim());


      const matchesGender =
        gender === "All" ||
        patient.gender === gender;


      return (
        matchesSearch &&
        matchesGender
      );
    });


  // =========================================================
  // ADD PATIENT
  // =========================================================

  const handleAddPatient = (newPatient) => {

    setPatients((currentPatients) => [

      ...currentPatients,

      newPatient,

    ]);
  };


  // =========================================================
  // VIEW PATIENT
  // =========================================================

  const handleViewPatient = (patient) => {

    navigate(
      `/patients/${patient.id}`
    );
  };


  // =========================================================
  // EDIT PATIENT
  // =========================================================

  const handleEditPatient = (patient) => {

    navigate(
      `/patients/${patient.id}/edit`
    );
  };


  // =========================================================
  // DELETE PATIENT
  // =========================================================

  const handleDeletePatient =
    async (patient) => {

      const confirmed =
        window.confirm(
          `Are you sure you want to delete ${patient.name}?`
        );


      if (!confirmed) {
        return;
      }


      try {

        await api.delete(
          `/patients/${patient.id}`
        );


        setPatients(
          (currentPatients) =>
            currentPatients.filter(
              (currentPatient) =>
                currentPatient.id !== patient.id
            )
        );


      } catch (err) {

        console.error(
          "Error deleting patient:",
          err
        );


        alert(
          err.response?.data?.message ||
          "Unable to delete patient."
        );
      }
    };


  return (

    <div className="patient-page">


      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Patients
          </h1>

          <p className="page-subtitle">
            Manage hospital patient information
          </p>

        </div>


        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setShowForm(true)
          }
        >
          + Add New Patient
        </button>

      </div>


      {/* ADD PATIENT FORM */}

      {showForm && (

        <PatientForm

          onAdd={handleAddPatient}

          onClose={() =>
            setShowForm(false)
          }

        />

      )}


      {/* PATIENT CARD */}

      <div className="patient-card">


        {/* TOOLBAR */}

        <div className="patient-toolbar">


          {/* SEARCH */}

          <div className="patient-search-wrapper">

            <input
              type="text"
              className="form-control"
              placeholder="Search by name, ID or phone..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>


          {/* GENDER */}

          <select
            className="form-select patient-gender-filter"
            value={gender}
            onChange={(event) =>
              setGender(event.target.value)
            }
          >

            <option value="All">
              All Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            >
            </div>

            <p className="text-muted mt-3">
              Loading patients...
            </p>

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="alert alert-danger">

            {error}

            <button
              type="button"
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={fetchPatients}
            >
              Retry
            </button>

          </div>

        )}


        {/* TABLE */}

        {!loading && !error && (

          <PatientTable

            patients={filteredPatients}

            onView={handleViewPatient}

            onEdit={handleEditPatient}

            onDelete={handleDeletePatient}

          />

        )}

      </div>

    </div>
  );
}

export default Patients;