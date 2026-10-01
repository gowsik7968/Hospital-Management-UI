import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BillingTable from "../../components/BillingTable";
import BillingForm from "../../components/BillingForm";

import api from "../../services/api";

function Billing() {

  const navigate = useNavigate();

  const [bills, setBills] = useState([]);

  const [patients, setPatients] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [paymentStatus, setPaymentStatus] =
    useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // LOAD DATA

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        billsResponse,
        patientsResponse
      ] = await Promise.all([
        api.get("/billing"),
        api.get("/patients")
      ]);

      setBills(billsResponse.data);

      setPatients(patientsResponse.data);

    } catch (err) {

      console.error(
        "Error loading billing:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load billing records."
      );

    } finally {

      setLoading(false);

    }
  };


  // ADD

  const handleAddInvoice = (
    newInvoice
  ) => {

    setBills(
      (previousBills) => [
        ...previousBills,
        newInvoice
      ]
    );

    setShowForm(false);
  };


  // VIEW

  const handleView = (bill) => {

    navigate(
      `/billing/${bill.id}`
    );
  };


  // EDIT

  const handleEdit = (bill) => {

    navigate(
      `/billing/${bill.id}/edit`
    );
  };


  // DELETE

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this invoice?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await api.delete(
        `/billing/${id}`
      );

      setBills(
        (previousBills) =>
          previousBills.filter(
            (bill) =>
              bill.id !== id
          )
      );

    } catch (err) {

      console.error(
        "Error deleting invoice:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to delete invoice."
      );
    }
  };


  // FILTER

  const filteredBills =
    bills.filter((bill) => {

      const searchValue =
        searchTerm
          .toLowerCase()
          .trim();


      const patient =
        patients.find(
          (item) =>
            item.id === bill.patientId
        );


      const patientName =
        bill.patientName ||
        bill.patient?.name ||
        patient?.name ||
        "";


      const matchesSearch =

        String(bill.id || "")
          .toLowerCase()
          .includes(searchValue)

        ||

        String(patientName)
          .toLowerCase()
          .includes(searchValue)

        ||

        String(bill.patientId || "")
          .toLowerCase()
          .includes(searchValue);


      const matchesStatus =
        paymentStatus === "All" ||
        bill.paymentStatus ===
          paymentStatus;


      return (
        matchesSearch &&
        matchesStatus
      );
    });


  if (loading) {

    return (
      <div className="billing-page">

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="text-muted mt-3">
            Loading billing records...
          </p>

        </div>

      </div>
    );
  }


  return (

    <div className="billing-page">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Billing
          </h2>

          <p className="text-muted mb-0">
            Manage patient invoices and payments
          </p>

        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setShowForm(true)
          }
        >
          + Add Invoice
        </button>

      </div>


      {error && (

        <div className="alert alert-danger mb-4">

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


      {showForm && (

        <BillingForm
          patients={patients}
          onSave={handleAddInvoice}
          onCancel={() =>
            setShowForm(false)
          }
        />

      )}


      {!showForm && (

        <div className="billing-toolbar">

          <div className="row g-3">

            <div className="col-md-8">

              <input
                type="text"
                className="form-control"
                placeholder="Search by invoice ID, patient name or patient ID..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="col-md-4">

              <select
                className="form-select"
                value={paymentStatus}
                onChange={(event) =>
                  setPaymentStatus(
                    event.target.value
                  )
                }
              >

                <option value="All">
                  All Payment Status
                </option>

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

        </div>
      )}


      {!showForm && (

        <div className="billing-card">

          <div className="billing-card-header">

            <div>

              <h5 className="mb-1">
                Invoices
              </h5>

              <small className="text-muted">

                {filteredBills.length} record
                {filteredBills.length !== 1
                  ? "s"
                  : ""}

              </small>

            </div>

          </div>


          <BillingTable
            bills={filteredBills}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>
      )}

    </div>
  );
}

export default Billing;