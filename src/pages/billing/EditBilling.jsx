import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../../services/api";

function EditBilling() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [formData, setFormData] = useState({
    id: "",
    patientId: "",
    date: "",

    consultationFee: 0,
    medicineFee: 0,
    labFee: 0,
    roomFee: 0,

    totalAmount: 0,

    paymentStatus: "Pending"
  });


  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  useEffect(() => {
    fetchData();
  }, [id]);


  const fetchData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        billResponse,
        patientsResponse
      ] = await Promise.all([
        api.get(`/billing/${id}`),
        api.get("/patients")
      ]);


      const bill =
        billResponse.data;


      setFormData({
        id: bill.id || "",

        patientId:
          bill.patientId ||
          bill.patient?.id ||
          "",

        date:
          bill.date || "",

        consultationFee:
          bill.consultationFee || 0,

        medicineFee:
          bill.medicineFee || 0,

        labFee:
          bill.labFee || 0,

        roomFee:
          bill.roomFee || 0,

        totalAmount:
          bill.totalAmount || 0,

        paymentStatus:
          bill.paymentStatus ||
          "Pending"
      });


      setPatients(
        patientsResponse.data
      );

    } catch (err) {

      console.error(
        "Error loading invoice:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load invoice."
      );

    } finally {

      setLoading(false);
    }
  };


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

    setSaving(true);
    setError("");


    try {

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


      const updatedBill = {

        id:
          formData.id,

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


      await api.put(
        `/billing/${id}`,
        updatedBill
      );


      navigate("/billing");

    } catch (err) {

      console.error(
        "Error updating invoice:",
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
          "Failed to update invoice."
        );
      }

    } finally {

      setSaving(false);
    }
  };


  if (loading) {

    return (

      <div className="billing-page">

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="text-muted mt-3">
            Loading invoice...
          </p>

        </div>

      </div>
    );
  }


  if (!formData.id) {

    return (

      <div className="billing-page">

        <div className="text-center py-5">

          <h3>
            Invoice Not Found
          </h3>

          <p className="text-muted">
            {error ||
              "The requested invoice does not exist."}
          </p>

          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() =>
              navigate("/billing")
            }
          >
            ← Back to Billing
          </button>

        </div>

      </div>
    );
  }


  return (

    <div className="billing-page">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Edit Invoice
          </h2>

          <p className="text-muted mb-0">
            Update billing and payment information
          </p>

        </div>


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/billing")
          }
          disabled={saving}
        >
          ← Back
        </button>

      </div>


      {error && (

        <div className="alert alert-danger mb-4">
          {error}
        </div>

      )}


      <div className="billing-form-card">

        <div className="billing-form-header">

          <div>

            <h5>
              Edit Invoice
            </h5>

            <p>
              Invoice ID: {formData.id}
            </p>

          </div>

        </div>


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
                  disabled={saving}
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
                    disabled={saving}
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
                    disabled={saving}
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
                    disabled={saving}
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
                    disabled={saving}
                  />

                </div>

              </div>

            </div>


            <div className="row mt-4">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Payment Status
                </label>

                <select
                  name="paymentStatus"
                  className="form-select"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  disabled={saving}
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
                onClick={() =>
                  navigate("/billing")
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
                    ></span>

                    Updating...
                  </>
                ) : (
                  "Update Invoice"
                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditBilling;