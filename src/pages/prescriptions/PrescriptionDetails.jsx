import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

function PrescriptionDetails() {

  const navigate = useNavigate();

  const { id } = useParams();


  // =========================================================
  // STATE
  // =========================================================

  const [prescription, setPrescription] = useState(null);

  const [patient, setPatient] = useState(null);

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================================
  // LOAD PRESCRIPTION
  // =========================================================

  useEffect(() => {

    fetchPrescription();

  }, [id]);


  const fetchPrescription = async () => {

    try {

      setLoading(true);

      setError("");


      // -----------------------------------------------------
      // GET PRESCRIPTION
      // -----------------------------------------------------

      const prescriptionResponse =
        await api.get(
          `/prescriptions/${id}`
        );


      const prescriptionData =
        prescriptionResponse.data;


      setPrescription(
        prescriptionData
      );


      // -----------------------------------------------------
      // GET PATIENT
      // -----------------------------------------------------

      if (
        prescriptionData.patientId
      ) {

        try {

          const patientResponse =
            await api.get(
              `/patients/${prescriptionData.patientId}`
            );


          setPatient(
            patientResponse.data
          );

        } catch (patientError) {

          console.error(
            "Error loading patient:",
            patientError
          );

        }
      }


      // -----------------------------------------------------
      // GET DOCTOR
      // -----------------------------------------------------

      if (
        prescriptionData.doctorId
      ) {

        try {

          const doctorResponse =
            await api.get(
              `/doctors/${prescriptionData.doctorId}`
            );


          setDoctor(
            doctorResponse.data
          );

        } catch (doctorError) {

          console.error(
            "Error loading doctor:",
            doctorError
          );

        }
      }


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
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="prescription-details-page">

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>


          <p className="text-muted mt-3">
            Loading prescription...
          </p>

        </div>

      </div>
    );
  }


  // =========================================================
  // NOT FOUND
  // =========================================================

  if (!prescription) {

    return (

      <div className="prescription-details-page">

        <div className="text-center py-5">

          <h3>
            Prescription Not Found
          </h3>


          <p className="text-muted">
            {error ||
              "The requested prescription does not exist."}
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

      </div>
    );
  }


  // =========================================================
  // SAFE VALUES
  // =========================================================

  const patientName =
    prescription.patientName ||
    patient?.name ||
    "Unknown Patient";


  const doctorName =
    prescription.doctorName ||
    doctor?.name ||
    "Unknown Doctor";


  const medicines =
    Array.isArray(
      prescription.medicines
    )
      ? prescription.medicines
      : [];


  const status =
    prescription.status ||
    "Active";


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="prescription-details-page">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Prescription Details
          </h2>


          <p className="text-muted mb-0">
            Prescription ID: {prescription.id}
          </p>

        </div>


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/prescriptions")
          }
        >
          ← Back
        </button>

      </div>


      {/* =====================================================
          ERROR
          ===================================================== */}

      {error && (

        <div className="alert alert-warning mb-4">

          {error}

        </div>
      )}


      {/* =====================================================
          PRESCRIPTION INFORMATION
          ===================================================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-4">


            {/* PATIENT */}

            <div className="col-md-6">

              <small className="text-muted">
                Patient
              </small>


              <h6 className="mt-1 mb-0">
                {patientName}
              </h6>


              <small className="text-muted">
                {prescription.patientId || "-"}
              </small>

            </div>


            {/* DOCTOR */}

            <div className="col-md-6">

              <small className="text-muted">
                Doctor
              </small>


              <h6 className="mt-1 mb-0">
                {doctorName}
              </h6>


              <small className="text-muted">
                {prescription.doctorId || "-"}
              </small>

            </div>


            {/* DIAGNOSIS */}

            <div className="col-md-6">

              <small className="text-muted">
                Diagnosis
              </small>


              <h6 className="mt-1 mb-0">
                {prescription.diagnosis || "-"}
              </h6>

            </div>


            {/* DATE */}

            <div className="col-md-3">

              <small className="text-muted">
                Date
              </small>


              <h6 className="mt-1 mb-0">
                {prescription.date || "-"}
              </h6>

            </div>


            {/* STATUS */}

            <div className="col-md-3">

              <small className="text-muted">
                Status
              </small>


              <div className="mt-1">

                <span
                  className={`badge ${
                    status === "Active"
                      ? "bg-success"
                      : status === "Completed"
                      ? "bg-primary"
                      : status === "Cancelled"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {status}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MEDICINES
          ===================================================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-header bg-white">

          <h5 className="mb-0">
            Medicines
          </h5>

        </div>


        <div className="card-body">


          {medicines.length === 0 ? (

            <div className="text-center py-4 text-muted">

              No medicines available.

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-bordered align-middle mb-0">


                <thead className="table-light">

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Medicine
                    </th>

                    <th>
                      Dosage
                    </th>

                    <th>
                      Frequency
                    </th>

                    <th>
                      Duration
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {medicines.map(
                    (medicine, index) => (

                      <tr
                        key={index}
                      >

                        <td>
                          {index + 1}
                        </td>


                        <td className="fw-semibold">
                          {medicine.name || "-"}
                        </td>


                        <td>
                          {medicine.dosage || "-"}
                        </td>


                        <td>
                          {medicine.frequency || "-"}
                        </td>


                        <td>
                          {medicine.duration || "-"}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* =====================================================
          INSTRUCTIONS
          ===================================================== */}

      <div className="card shadow-sm mb-4">


        <div className="card-header bg-white">

          <h5 className="mb-0">
            Instructions
          </h5>

        </div>


        <div className="card-body">

          <p className="mb-0">

            {prescription.instructions?.trim()
              ? prescription.instructions
              : "No special instructions provided."}

          </p>

        </div>

      </div>


      {/* =====================================================
          ACTIONS
          ===================================================== */}

      <div className="d-flex justify-content-end gap-2">


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/prescriptions")
          }
        >
          Back
        </button>


        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            navigate(
              `/prescriptions/edit/${prescription.id}`
            )
          }
        >
          Edit Prescription
        </button>

      </div>

    </div>
  );
}

export default PrescriptionDetails;