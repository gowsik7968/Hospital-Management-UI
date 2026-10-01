import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../../services/api";

function BillingDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [bill, setBill] = useState(null);

  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {
    fetchBill();
  }, [id]);


  const fetchBill = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await api.get(`/billing/${id}`);

      const billingData =
        response.data;

      setBill(billingData);


      if (billingData.patientId) {

        try {

          const patientResponse =
            await api.get(
              `/patients/${billingData.patientId}`
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


  if (!bill) {

    return (
      <div className="billing-page">

        <div className="text-center py-5">

          <h3>
            Invoice Not Found
          </h3>

          <p className="text-muted">
            {error ||
              "The invoice does not exist."}
          </p>

          <button
            type="button"
            className="btn btn-primary"
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


  const patientName =
    bill.patientName ||
    patient?.name ||
    "Unknown Patient";


  const consultationFee =
    Number(
      bill.consultationFee || 0
    );

  const medicineFee =
    Number(
      bill.medicineFee || 0
    );

  const labFee =
    Number(
      bill.labFee || 0
    );

  const roomFee =
    Number(
      bill.roomFee || 0
    );

  const totalAmount =
    Number(
      bill.totalAmount || 0
    );


  return (

    <div className="billing-page">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Invoice Details
          </h2>

          <p className="text-muted mb-0">
            View billing and payment information
          </p>

        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/billing")
          }
        >
          ← Back
        </button>

      </div>


      {error && (
        <div className="alert alert-warning mb-4">
          {error}
        </div>
      )}


      <div className="billing-details-card">

        <div className="billing-details-header">

          <div>

            <h4 className="billing-details-title">
              {bill.id}
            </h4>

            <p className="billing-details-subtitle">
              Invoice Date: {bill.date}
            </p>

          </div>


          <span
            className={`badge ${
              bill.paymentStatus === "Paid"
                ? "bg-success"
                : bill.paymentStatus === "Pending"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}
          >
            {bill.paymentStatus}
          </span>

        </div>


        <div className="billing-details-section">

          <h5 className="billing-details-section-title">
            Patient Information
          </h5>


          <div className="row">

            <div className="col-md-6">

              <div className="billing-detail-item">

                <span className="billing-detail-label">
                  Patient Name
                </span>

                <span className="billing-detail-value">
                  {patientName}
                </span>

              </div>

            </div>


            <div className="col-md-6">

              <div className="billing-detail-item">

                <span className="billing-detail-label">
                  Patient ID
                </span>

                <span className="billing-detail-value">
                  {bill.patientId || "-"}
                </span>

              </div>

            </div>

          </div>

        </div>


        <div className="billing-details-section">

          <h5 className="billing-details-section-title">
            Billing Breakdown
          </h5>


          <div className="billing-summary-details">

            <div className="billing-summary-row">

              <span>
                Consultation Fee
              </span>

              <strong>
                ₹{consultationFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-summary-row">

              <span>
                Medicine Fee
              </span>

              <strong>
                ₹{medicineFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-summary-row">

              <span>
                Lab Fee
              </span>

              <strong>
                ₹{labFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-summary-row">

              <span>
                Room Fee
              </span>

              <strong>
                ₹{roomFee.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="billing-summary-row billing-total-row">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{totalAmount.toLocaleString("en-IN")}
              </strong>

            </div>

          </div>

        </div>


        <div className="billing-details-section">

          <h5 className="billing-details-section-title">
            Payment Information
          </h5>


          <div className="row">

            <div className="col-md-6">

              <div className="billing-detail-item">

                <span className="billing-detail-label">
                  Payment Status
                </span>

                <span className="billing-detail-value">

                  {bill.paymentStatus}

                </span>

              </div>

            </div>


            <div className="col-md-6">

              <div className="billing-detail-item">

                <span className="billing-detail-label">
                  Billing Date
                </span>

                <span className="billing-detail-value">
                  {bill.date || "-"}
                </span>

              </div>

            </div>

          </div>

        </div>


        <div className="billing-details-actions">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              navigate("/billing")
            }
          >
            Back
          </button>


          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate(
                `/billing/${bill.id}/edit`
              )
            }
          >
            Edit Invoice
          </button>

        </div>

      </div>

    </div>
  );
}

export default BillingDetails;