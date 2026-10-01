import { useState } from "react";
import api from "../services/api";

function BillingForm({
  patients,
  onSave,
  onCancel
}) {

  const [formData, setFormData] = useState({
    patientId: "",
    date: new Date().toISOString().split("T")[0],
    consultationFee: 0,
    medicineFee: 0,
    labFee: 0,
    roomFee: 0,
    paymentStatus: "Pending"
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const consultationFee =
    Number(formData.consultationFee) || 0;

  const medicineFee =
    Number(formData.medicineFee) || 0;

  const labFee =
    Number(formData.labFee) || 0;

  const roomFee =
    Number(formData.roomFee) || 0;

  const totalAmount =
    consultationFee +
    medicineFee +
    labFee +
    roomFee;


  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value
      })
    );
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      if (!formData.patientId) {

        setError(
          "Please select a patient."
        );

        setLoading(false);
        return;
      }


      const selectedPatient =
        patients.find(
          (patient) =>
            patient.id ===
            formData.patientId
        );


      if (!selectedPatient) {

        setError(
          "Selected patient was not found."
        );

        setLoading(false);
        return;
      }


      const newBill = {

        id:
          `BILL${Date.now()}`,

        patientId:
          formData.patientId,

        consultationFee,

        medicineFee,

        labFee,

        roomFee,

        totalAmount,

        paymentStatus:
          formData.paymentStatus,

        date:
          formData.date
      };


      const response =
        await api.post(
          "/billing",
          newBill
        );


      onSave(response.data);

      onCancel();

    } catch (err) {

      console.error(
        "Error creating bill:",
        err
      );

      if (
        err.response?.data?.errors
      ) {

        setError(
          Object.values(
            err.response.data.errors
          ).join(", ")
        );

      } else if (
        err.response?.data?.message
      ) {

        setError(
          err.response.data.message
        );

      } else {

        setError(
          "Failed to save billing information."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="billing-form-card">

      <div className="billing-form-header">

        <div>

          <h5>
            Add Invoice
          </h5>

          <p>
            Create patient bill
          </p>

        </div>

      </div>


      {error && (

        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}


      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Patient
              </label>

              <select
                name="patientId"
                className="form-select"
                value={formData.patientId}
                onChange={handleChange}
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


            <div className="col-md-6 mb-3">

              <label className="form-label">
                Invoice Date
              </label>

              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={loading}
              />

            </div>

          </div>


          <div className="billing-items-section">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h5>
                Billing Details
              </h5>

            </div>


            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Consultation Fee
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="consultationFee"
                  className="form-control"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>


              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Medicine Fee
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="medicineFee"
                  className="form-control"
                  value={formData.medicineFee}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>


              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Lab Fee
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="labFee"
                  className="form-control"
                  value={formData.labFee}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>


              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Room Fee
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="roomFee"
                  className="form-control"
                  value={formData.roomFee}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>

            </div>

          </div>


          <div className="row mt-3">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Payment Status
              </label>

              <select
                name="paymentStatus"
                className="form-select"
                value={formData.paymentStatus}
                onChange={handleChange}
                disabled={loading}
              >

                <option value="Paid">
                  Paid
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>

          </div>


          <div className="billing-summary">

            <h5>
              Invoice Summary
            </h5>


            <div className="billing-summary-row">

              <span>
                Consultation
              </span>

              <strong>
                ₹{consultationFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-summary-row">

              <span>
                Medicine
              </span>

              <strong>
                ₹{medicineFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-summary-row">

              <span>
                Lab
              </span>

              <strong>
                ₹{labFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-summary-row">

              <span>
                Room
              </span>

              <strong>
                ₹{roomFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-total-row">

              <span>
                Total
              </span>

              <strong>
                ₹{totalAmount.toLocaleString("en-IN")}
              </strong>

            </div>

          </div>


          <div className="billing-form-actions">

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
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
                  ></span>
                  Saving...
                </>
              ) : (
                "Save Invoice"
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BillingForm;