import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalRecordForm from "../../components/MedicalRecordsForm";
import api from "../../services/api";

function MedicalRecords() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [diagnosisFilter, setDiagnosisFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD MEDICAL RECORDS
  // =========================

  useEffect(() => {
    fetchMedicalRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/medical-records");

      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
      setError("Failed to load medical records.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD PATIENTS
  // =========================

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");

      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // =========================
  // LOAD DOCTORS
  // =========================

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");

      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // =========================
  // ADD MEDICAL RECORD
  // =========================

  const handleAddRecord = async (newRecord) => {
    try {
      setError("");

      const response = await api.post(
        "/medical-records",
        newRecord
      );

      setRecords((prevRecords) => [
        ...prevRecords,
        response.data
      ]);

      setShowForm(false);

    } catch (error) {
      console.error("Error adding medical record:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add medical record.");
      }
    }
  };

  // =========================
  // DELETE MEDICAL RECORD
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medical record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/medical-records/${id}`);

      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );

    } catch (error) {
      console.error("Error deleting medical record:", error);
      setError("Failed to delete medical record.");
    }
  };

  // =========================
  // VIEW RECORD
  // =========================

  const handleView = (id) => {
    navigate(`/medical-records/${id}`);
  };

  // =========================
  // EDIT RECORD
  // =========================

  const handleEdit = (id) => {
    navigate(`/medical-records/edit/${id}`);
  };

  // =========================
  // FILTER RECORDS
  // =========================

  const filteredRecords = records.filter((record) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      record.id?.toLowerCase().includes(search) ||
      record.patientId?.toLowerCase().includes(search) ||
      record.doctorId?.toLowerCase().includes(search) ||
      record.diagnosis?.toLowerCase().includes(search);

    const matchesDiagnosis =
      diagnosisFilter === "" ||
      record.diagnosis === diagnosisFilter;

    return matchesSearch && matchesDiagnosis;
  });

  return (
    <div className="medical-records-page">

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1 className="page-title">
            Medical Records
          </h1>

          <p className="page-subtitle">
            Manage patient medical records and treatment information
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Medical Record
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <MedicalRecordForm
          patients={patients}
          doctors={doctors}
          onAdd={handleAddRecord}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* RECORDS CARD */}
      <div className="medical-records-card">

        {/* TOOLBAR */}
        <div className="medical-records-toolbar">

          <div className="search-box">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search medical records..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

          <select
            className="form-select"
            value={diagnosisFilter}
            onChange={(e) =>
              setDiagnosisFilter(e.target.value)
            }
          >
            <option value="">
              All Diagnoses
            </option>

            <option value="Hypertension">
              Hypertension
            </option>

            <option value="Migraine">
              Migraine
            </option>

            <option value="Diabetes">
              Diabetes
            </option>

            <option value="Fever">
              Fever
            </option>
          </select>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <p className="mt-3">
              Loading medical records...
            </p>
          </div>
        ) : (

          <div className="table-responsive">

            <table className="table medical-records-table">

              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Patient</th>
                  <th>Diagnosis</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredRecords.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-5"
                    >
                      No medical records found.
                    </td>
                  </tr>

                ) : (

                  filteredRecords.map((record) => {

                    const patient = patients.find(
                      (p) => p.id === record.patientId
                    );

                    const doctor = doctors.find(
                      (d) => d.id === record.doctorId
                    );

                    const patientName =
                      record.patientName ||
                      patient?.name ||
                      "Unknown Patient";

                    const doctorName =
                      record.doctorName ||
                      doctor?.name ||
                      "Unknown Doctor";

                    return (
                      <tr key={record.id}>

                        <td>
                          <span className="medical-record-id">
                            {record.id}
                          </span>
                        </td>

                        <td>
                          <div className="medical-record-patient">

                            <div className="medical-record-avatar">
                              {patientName.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <div className="medical-record-name">
                                {patientName}
                              </div>

                              <div className="medical-record-subtext">
                                {record.patientId}
                              </div>
                            </div>

                          </div>
                        </td>

                        <td>
                          <span className="medical-record-diagnosis">
                            {record.diagnosis}
                          </span>
                        </td>

                        <td>
                          <div>
                            <div className="medical-record-name">
                              {doctorName}
                            </div>

                            <div className="medical-record-subtext">
                              {record.doctorId}
                            </div>
                          </div>
                        </td>

                        <td>
                          {record.date}
                        </td>

                        <td>

                          <div className="medical-record-action-buttons">
                            <button
                              type="button"
                              className="medical-record-action-btn medical-record-view-btn"
                              onClick={() => handleView(record.id)}
                              title="View medical record"
                            >
                              <i className="bi bi-eye-fill"></i>
                              <span>View</span>
                            </button>

                            <button
                              type="button"
                              className="medical-record-action-btn medical-record-edit-btn"
                              onClick={() => handleEdit(record.id)}
                              title="Edit medical record"
                            >
                              <i className="bi bi-pencil-fill"></i>
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              className="medical-record-action-btn medical-record-delete-btn"
                              onClick={() => handleDelete(record.id)}
                              title="Delete medical record"
                            >
                              <i className="bi bi-trash-fill"></i>
                              <span>Delete</span>
                            </button>
                          </div>

                        </td>

                      </tr>
                    );
                  })
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default MedicalRecords;