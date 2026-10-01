import { useState } from "react";
import api from "../services/api";

function PrescriptionForm({
  patients,
  doctors,
  onAdd,
  onClose
}) {

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    diagnosis: "",
    date: "",
    instructions: "",
    status: "Active"
  });

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: ""
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // =========================================================
  // HANDLE FORM INPUT
  // =========================================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };


  // =========================================================
  // HANDLE MEDICINE INPUT
  // =========================================================

  const handleMedicineChange = (index, event) => {

    const { name, value } = event.target;

    setMedicines((previousMedicines) =>
      previousMedicines.map(
        (medicine, medicineIndex) =>
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

    setMedicines((previousMedicines) => [
      ...previousMedicines,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: ""
      }
    ]);
  };


  // =========================================================
  // REMOVE MEDICINE
  // =========================================================

  const removeMedicine = (index) => {

    if (medicines.length === 1) {
      return;
    }

    setMedicines((previousMedicines) =>
      previousMedicines.filter(
        (_, medicineIndex) =>
          medicineIndex !== index
      )
    );
  };


  // =========================================================
  // SUBMIT PRESCRIPTION
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setError("");


    try {

      // -----------------------------------------------------
      // VALIDATE PATIENT
      // -----------------------------------------------------

      const selectedPatient = patients.find(
        (patient) =>
          patient.id === formData.patientId
      );

      if (!selectedPatient) {

        setError(
          "Please select a valid patient."
        );

        setLoading(false);

        return;
      }


      // -----------------------------------------------------
      // VALIDATE DOCTOR
      // -----------------------------------------------------

      const selectedDoctor = doctors.find(
        (doctor) =>
          doctor.id === formData.doctorId
      );

      if (!selectedDoctor) {

        setError(
          "Please select a valid doctor."
        );

        setLoading(false);

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

        setLoading(false);

        return;
      }


      // -----------------------------------------------------
      // CREATE PAYLOAD
      // -----------------------------------------------------

      const newPrescription = {

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
          medicines.map((medicine) => ({
            name: medicine.name.trim(),
            dosage: medicine.dosage.trim(),
            frequency: medicine.frequency.trim(),
            duration: medicine.duration.trim()
          }))
      };


      // -----------------------------------------------------
      // SEND TO SPRING BOOT
      // -----------------------------------------------------

      const response =
        await api.post(
          "/prescriptions",
          newPrescription
        );


      // -----------------------------------------------------
      // SEND RESPONSE TO PARENT
      // -----------------------------------------------------

      onAdd(response.data);


      // -----------------------------------------------------
      // CLOSE FORM
      // -----------------------------------------------------

      onClose();


    } catch (err) {

      console.error(
        "Error creating prescription:",
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
          "Failed to save prescription. Please check the backend server."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="card shadow-sm mb-4">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="card-header bg-white">

        <h5 className="mb-1">
          Add Prescription
        </h5>

        <p className="text-muted mb-0">
          Create a new patient prescription
        </p>

      </div>


      {/* =====================================================
          BODY
          ===================================================== */}

      <div className="card-body">


        {/* ERROR */}

        {error && (

          <div className="alert alert-danger mb-4">

            {error}

          </div>

        )}


        <form onSubmit={handleSubmit}>


          {/* =================================================
              PATIENT / DOCTOR / DIAGNOSIS / DATE
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
                disabled={loading}
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
                disabled={loading}
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
                placeholder="Enter diagnosis"
                required
                disabled={loading}
              />

            </div>


            {/* DATE */}

            <div className="col-md-6">

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
                disabled={loading}
              />

            </div>


            {/* STATUS */}

            <div className="col-md-6">

              <label className="form-label">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
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

              <h6 className="mb-0">
                Medicines
              </h6>


              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={addMedicine}
                disabled={loading}
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
                        placeholder="Medicine name"
                        required
                        disabled={loading}
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
                        placeholder="e.g. 500 mg"
                        required
                        disabled={loading}
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
                        placeholder="e.g. Twice daily"
                        required
                        disabled={loading}
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
                          placeholder="e.g. 7 days"
                          required
                          disabled={loading}
                        />


                        {medicines.length > 1 && (

                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() =>
                              removeMedicine(index)
                            }
                            disabled={loading}
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
              rows="3"
              placeholder="Enter instructions for the patient"
              disabled={loading}
            />

          </div>


          {/* =================================================
              ACTION BUTTONS
              ================================================= */}

          <div className="d-flex justify-content-end gap-2">


            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >

              {loading ? (

                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>

                  Saving...
                </>

              ) : (

                "Save Prescription"

              )}

            </button>

          </div>


        </form>

      </div>

    </div>
  );
}

export default PrescriptionForm;