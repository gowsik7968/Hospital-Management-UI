import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PrescriptionForm from "../../components/PrescriptionForm";
import PrescriptionTable from "../../components/PrescriptionTable";

import api from "../../services/api";

function Prescriptions() {

  const navigate = useNavigate();


  // =========================================================
  // DATA
  // =========================================================

  const [prescriptions, setPrescriptions] = useState([]);

  const [patients, setPatients] = useState([]);

  const [doctors, setDoctors] = useState([]);


  // =========================================================
  // UI STATE
  // =========================================================

  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {

    fetchData();

  }, []);


  const fetchData = async () => {

    try {

      setLoading(true);

      setError("");


      const [
        prescriptionsResponse,
        patientsResponse,
        doctorsResponse
      ] = await Promise.all([

        api.get("/prescriptions"),

        api.get("/patients"),

        api.get("/doctors")

      ]);


      setPrescriptions(
        prescriptionsResponse.data
      );


      setPatients(
        patientsResponse.data
      );


      setDoctors(
        doctorsResponse.data
      );


    } catch (err) {

      console.error(
        "Error loading prescriptions:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Unable to load prescriptions. Please check the backend server."
      );


    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // ADD PRESCRIPTION
  // =========================================================

  const handleAddPrescription = (
    newPrescription
  ) => {

    setPrescriptions(
      (previousPrescriptions) => [
        ...previousPrescriptions,
        newPrescription
      ]
    );

    setShowForm(false);
  };


  // =========================================================
  // VIEW PRESCRIPTION
  // =========================================================

  const handleView = (prescription) => {

    navigate(
      `/prescriptions/${prescription.id}`
    );
  };


  // =========================================================
  // EDIT PRESCRIPTION
  // =========================================================

  const handleEdit = (prescription) => {

    navigate(
      `/prescriptions/edit/${prescription.id}`
    );
  };


  // =========================================================
  // DELETE PRESCRIPTION
  // =========================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this prescription?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");


      await api.delete(
        `/prescriptions/${id}`
      );


      setPrescriptions(
        (previousPrescriptions) =>
          previousPrescriptions.filter(
            (prescription) =>
              prescription.id !== id
          )
      );


    } catch (err) {

      console.error(
        "Error deleting prescription:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Unable to delete prescription."
      );
    }
  };


  // =========================================================
  // SEARCH + STATUS FILTER
  // =========================================================

  const filteredPrescriptions =
    prescriptions.filter(
      (prescription) => {

        const searchValue =
          searchTerm
            .toLowerCase()
            .trim();


        const patient = patients.find(
          (item) =>
            item.id ===
            prescription.patientId
        );


        const doctor = doctors.find(
          (item) =>
            item.id ===
            prescription.doctorId
        );


        const patientName =
          prescription.patientName ||
          prescription.patient?.name ||
          patient?.name ||
          "";


        const doctorName =
          prescription.doctorName ||
          prescription.doctor?.name ||
          doctor?.name ||
          "";


        const matchesSearch =

          String(
            prescription.id || ""
          )
            .toLowerCase()
            .includes(searchValue)

          ||

          String(
            patientName
          )
            .toLowerCase()
            .includes(searchValue)

          ||

          String(
            doctorName
          )
            .toLowerCase()
            .includes(searchValue)

          ||

          String(
            prescription.diagnosis || ""
          )
            .toLowerCase()
            .includes(searchValue);


        const matchesStatus =
          statusFilter === "All" ||
          prescription.status ===
            statusFilter;


        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );


  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {

    return (

      <div className="prescriptions-container">

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>


          <p className="text-muted mt-3">
            Loading prescriptions...
          </p>

        </div>

      </div>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="prescriptions-container">


      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="prescriptions-page-header">


        <div>

          <h1 className="prescriptions-title">
            Prescriptions
          </h1>


          <p className="prescriptions-subtitle">
            Manage patient prescriptions and medicines
          </p>

        </div>


        <button
          type="button"
          className="btn btn-primary prescriptions-add-btn"
          onClick={() =>
            setShowForm(true)
          }
        >
          + Add Prescription
        </button>

      </div>


      {/* =====================================================
          ERROR
          ===================================================== */}

      {error && (

        <div className="alert alert-danger">

          {error}


          <button
            type="button"
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={fetchData}
          >
            Retry
          </button>

        </div>
      )}


      {/* =====================================================
          ADD FORM
          ===================================================== */}

      {showForm && (

        <PrescriptionForm
          patients={patients}
          doctors={doctors}
          onAdd={handleAddPrescription}
          onClose={() =>
            setShowForm(false)
          }
        />

      )}


      {/* =====================================================
          SEARCH + FILTER
          ===================================================== */}

      <div className="prescriptions-filter-card">

        <div className="row g-3">


          {/* SEARCH */}

          <div className="col-md-8">

            <label className="form-label">
              Search
            </label>


            <input
              type="text"
              className="form-control"
              placeholder="Search by ID, patient, doctor or diagnosis..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>


          {/* STATUS */}

          <div className="col-md-4">

            <label className="form-label">
              Status
            </label>


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

              <option value="Active">
                Active
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* =====================================================
          TABLE
          ===================================================== */}

      <div className="prescriptions-table-card">

        <PrescriptionTable
          prescriptions={
            filteredPrescriptions
          }

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDelete}
        />

      </div>

    </div>
  );
}

export default Prescriptions;