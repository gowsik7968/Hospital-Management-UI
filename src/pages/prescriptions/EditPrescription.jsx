import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

function EditPrescription() {

  const navigate = useNavigate();

  const { id } = useParams();


  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    id: "",
    patientId: "",
    doctorId: "",
    diagnosis: "",
    date: "",
    instructions: "",
    status: "Active"
  });


  // =========================================================
  // MEDICINES
  // =========================================================

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: ""
    }
  ]);


  // =========================================================
  // PATIENTS / DOCTORS
  // =========================================================

  const [patients, setPatients] = useState([]);

  const [doctors, setDoctors] = useState([]);


  // =========================================================
  // UI STATES
  // =========================================================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  // =========================================================
  // LOAD PRESCRIPTION + PATIENTS + DOCTORS
  // =========================================================

  useEffect(() => {

    fetchData();

  }, [id]);


  const fetchData = async () => {

    try {

      setLoading(true);

      setError("");


      const [
        prescriptionResponse,
        patientsResponse,
        doctorsResponse
      ] = await Promise.all([

        api.get(`/prescriptions/${id}`),

        api.get("/patients"),

        api.get("/doctors")

      ]);


      const prescription =
        prescriptionResponse.data;


      setFormData({

        id: prescription.id || "",

        patientId:
          prescription.patientId ||
          prescription.patient?.id ||
          "",

        doctorId:
          prescription.doctorId ||
          prescription.doctor?.id ||
          "",

        diagnosis:
          prescription.diagnosis || "",

        date:
          prescription.date || "",

        instructions:
          prescription.instructions || "",

        status:
          prescription.status || "Active"

      });


      setMedicines(

        Array.isArray(
          prescription.medicines
        ) &&
        prescription.medicines.length > 0

          ? prescription.medicines.map(
              (medicine) => ({
                name:
                  medicine.name || "",

                dosage:
                  medicine.dosage || "",

                frequency:
                  medicine.frequency || "",

                duration:
                  medicine.duration || ""
              })
            )

          : [
              {
                name: "",
                dosage: "",
                frequency: "",
                duration: ""
              }
            ]

      );


      setPatients(
        patientsResponse.data
      );


      setDoctors(
        doctorsResponse.data
      );


    } catch (err) {

      console.error(
        "Error loading prescription:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Unable to load prescription."
      );


    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // HANDLE MAIN FORM CHANGE
  // =========================================================

  const handleChange = (event) => {

    const { name, value } =
      event.target;


    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value
      })
    );
  };


  // =========================================================
  // HANDLE MEDICINE CHANGE
  // =========================================================

  const handleMedicineChange = (
    index,
    event
  ) => {

    const { name, value } =
      event.target;


    setMedicines(
      (previousMedicines) =>
        previousMedicines.map(
          (
            medicine,
            medicineIndex
          ) =>
            medicineIndex === index
              ? {
                  ...medicine,
                  [name]: value
                }
              : medicine
        )
    );
  };


  // =========================================================
  // ADD MEDICINE
  // =========================================================

  const addMedicine = () => {

    setMedicines(
      (previousMedicines) => [
        ...previousMedicines,

        {
          name: "",
          dosage: "",
          frequency: "",
          duration: ""
        }
      ]
    );
  };


  // =========================================================
  // REMOVE MEDICINE
  // =========================================================

  const removeMedicine = (index) => {

    if (medicines.length === 1) {
      return;
    }


    setMedicines(
      (previousMedicines) =>
        previousMedicines.filter(
          (_, medicineIndex) =>
            medicineIndex !== index
        )
    );
  };


  // =========================================================
  // UPDATE PRESCRIPTION
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setSaving(true);

    setError("");


    try {

      // -----------------------------------------------------
      // VALIDATE PATIENT
      // -----------------------------------------------------

      const selectedPatient =
        patients.find(
          (patient) =>
            patient.id ===
            formData.patientId
        );


      if (!selectedPatient) {

        setError(
          "Please select a valid patient."
        );

        setSaving(false);

        return;
      }


      // -----------------------------------------------------
      // VALIDATE DOCTOR
      // -----------------------------------------------------

      const selectedDoctor =
        doctors.find(
          (doctor) =>
            doctor.id ===
            formData.doctorId
        );


      if (!selectedDoctor) {

        setError(
          "Please select a valid doctor."
        );

        setSaving(false);

        return;
      }


      // -----------------------------------------------------
      // VALIDATE MEDICINES
      // -----------------------------------------------------

      const invalidMedicine =
        medicines.some(
          (medicine) =>
            !medicine.name.trim() ||
            !medicine.dosage.trim() ||
            !medicine.frequency.trim() ||
            !medicine.duration.trim()
        );


      if (invalidMedicine) {

        setError(
          "Please fill all medicine details."
        );

        setSaving(false);

        return;
      }


      // -----------------------------------------------------
      // REQUEST PAYLOAD
      // -----------------------------------------------------

      const updatedPrescription = {

        id: formData.id,

        patientId:
          formData.patientId,

        doctorId:
          formData.doctorId,

        diagnosis:
          formData.diagnosis.trim(),

        date:
          formData.date,

        instructions:
          formData.instructions.trim(),

        status:
          formData.status,

        medicines:
          medicines.map(
            (medicine) => ({
              name:
                medicine.name.trim(),

              dosage:
                medicine.dosage.trim(),

              frequency:
                medicine.frequency.trim(),

              duration:
                medicine.duration.trim()
            })
          )
      };


      // -----------------------------------------------------
      // PUT REQUEST
      // -----------------------------------------------------

      await api.put(
        `/prescriptions/${id}`,
        updatedPrescription
      );


      // -----------------------------------------------------
      // GO TO DETAILS
      // -----------------------------------------------------

      navigate(
        `/prescriptions/${id}`
      );


    } catch (err) {

      console.error(
        "Error updating prescription:",
        err
      );


      // -----------------------------------------------------
      // VALIDATION ERRORS
      // -----------------------------------------------------

      if (
        err.response?.data?.errors
      ) {

        const validationErrors =
          Object.values(
            err.response.data.errors
          );


        setError(
          validationErrors.join(", ")
        );

      }

      // -----------------------------------------------------
      // BACKEND MESSAGE
      // -----------------------------------------------------

      else if (
        err.response?.data?.message
      ) {

        setError(
          err.response.data.message
        );

      }

      // -----------------------------------------------------
      // GENERAL ERROR
      // -----------------------------------------------------

      else {

        setError(
          "Failed to update prescription."
        );
      }


    } finally {

      setSaving(false);

    }
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="text-center py-5">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>


        <p className="text-muted mt-3">
          Loading prescription...
        </p>

      </div>
    );
  }


  // =========================================================
  // NOT FOUND / ERROR
  // =========================================================

  if (error && !formData.id) {

    return (

      <div className="text-center py-5">

        <h3>
          Prescription Not Found
        </h3>


        <p className="text-muted">
          {error}
        </p>


        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            navigate("/prescriptions")
          }
        >
          ← Back to Prescriptions
        </button>

      </div>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="edit-prescription-page">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Edit Prescription
          </h2>

          <p className="text-muted mb-0">
            Update prescription information
          </p>

        </div>


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate(
              `/prescriptions/${id}`
            )
          }
          disabled={saving}
        >
          ← Back
        </button>

      </div>


      {/* =====================================================
          ERROR
          ===================================================== */}

      {error && (

        <div className="alert alert-danger mb-4">

          {error}

        </div>
      )}


      {/* =====================================================
          FORM CARD
          ===================================================== */}

      <div className="card shadow-sm">

        <div className="card-body">

          <form
            onSubmit={handleSubmit}
          >


            {/* =================================================
                BASIC INFORMATION
                ================================================= */}

            <div className="row g-3 mb-4">


              {/* PATIENT */}

              <div className="col-md-6">

                <label className="form-label">
                  Patient
                </label>


                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="form-select"
                  required
                  disabled={saving}
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
                        {patient.name} (
                        {patient.id}
                        )
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
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="form-select"
                  required
                  disabled={saving}
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
                        {doctor.name} (
                        {doctor.id}
                        )
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* DIAGNOSIS */}

              <div className="col-md-6">

                <label className="form-label">
                  Diagnosis
                </label>


                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={saving}
                />

              </div>


              {/* DATE */}

              <div className="col-md-3">

                <label className="form-label">
                  Date
                </label>


                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={saving}
                />

              </div>


              {/* STATUS */}

              <div className="col-md-3">

                <label className="form-label">
                  Status
                </label>


                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                  disabled={saving}
                >

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


            {/* =================================================
                MEDICINES
                ================================================= */}

            <div className="mb-4">


              <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="mb-0">
                  Medicines
                </h5>


                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={addMedicine}
                  disabled={saving}
                >
                  + Add Medicine
                </button>

              </div>


              {medicines.map(
                (medicine, index) => (

                  <div
                    className="border rounded p-3 mb-3"
                    key={index}
                  >

                    <div className="row g-3">


                      {/* MEDICINE */}

                      <div className="col-md-3">

                        <label className="form-label">
                          Medicine
                        </label>


                        <input
                          type="text"
                          name="name"
                          value={medicine.name}
                          onChange={(event) =>
                            handleMedicineChange(
                              index,
                              event
                            )
                          }
                          className="form-control"
                          required
                          disabled={saving}
                        />

                      </div>


                      {/* DOSAGE */}

                      <div className="col-md-3">

                        <label className="form-label">
                          Dosage
                        </label>


                        <input
                          type="text"
                          name="dosage"
                          value={medicine.dosage}
                          onChange={(event) =>
                            handleMedicineChange(
                              index,
                              event
                            )
                          }
                          className="form-control"
                          required
                          disabled={saving}
                        />

                      </div>


                      {/* FREQUENCY */}

                      <div className="col-md-3">

                        <label className="form-label">
                          Frequency
                        </label>


                        <input
                          type="text"
                          name="frequency"
                          value={medicine.frequency}
                          onChange={(event) =>
                            handleMedicineChange(
                              index,
                              event
                            )
                          }
                          className="form-control"
                          required
                          disabled={saving}
                        />

                      </div>


                      {/* DURATION */}

                      <div className="col-md-3">

                        <label className="form-label">
                          Duration
                        </label>


                        <div className="d-flex gap-2">

                          <input
                            type="text"
                            name="duration"
                            value={medicine.duration}
                            onChange={(event) =>
                              handleMedicineChange(
                                index,
                                event
                              )
                            }
                            className="form-control"
                            required
                            disabled={saving}
                          />


                          {medicines.length > 1 && (

                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() =>
                                removeMedicine(index)
                              }
                              disabled={saving}
                            >
                              ×
                            </button>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>


            {/* =================================================
                INSTRUCTIONS
                ================================================= */}

            <div className="mb-4">

              <label className="form-label">
                Instructions
              </label>


              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="form-control"
                rows="4"
                disabled={saving}
              />

            </div>


            {/* =================================================
                ACTIONS
                ================================================= */}

            <div className="d-flex justify-content-end gap-2">


              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  navigate(
                    `/prescriptions/${id}`
                  )
                }
                disabled={saving}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >

                {saving ? (

                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>

                    Updating...
                  </>

                ) : (

                  "Update Prescription"

                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditPrescription;