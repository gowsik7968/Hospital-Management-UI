function BillingTable({
  bills,
  onView,
  onEdit,
  onDelete
}) {

  return (

    <div className="table-responsive">

      <table className="table table-hover align-middle mb-0">

        <thead className="table-light">

          <tr>
            <th>Invoice ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Consultation</th>
            <th>Medicine</th>
            <th>Lab</th>
            <th>Room</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>


        <tbody>

          {bills.length > 0 ? (

            bills.map((bill) => (

              <tr key={bill.id}>

                <td className="fw-semibold text-primary">
                  {bill.id}
                </td>


                <td>

                  <div className="fw-semibold">
                    {bill.patientName ||
                      bill.patient?.name ||
                      "Unknown Patient"}
                  </div>

                  <small className="text-muted">
                    {bill.patientId || "-"}
                  </small>

                </td>


                <td>
                  {bill.date || "-"}
                </td>


                <td>
                  ₹{Number(
                    bill.consultationFee || 0
                  ).toLocaleString("en-IN")}
                </td>


                <td>
                  ₹{Number(
                    bill.medicineFee || 0
                  ).toLocaleString("en-IN")}
                </td>


                <td>
                  ₹{Number(
                    bill.labFee || 0
                  ).toLocaleString("en-IN")}
                </td>


                <td>
                  ₹{Number(
                    bill.roomFee || 0
                  ).toLocaleString("en-IN")}
                </td>


                <td className="fw-bold">
                  ₹{Number(
                    bill.totalAmount || 0
                  ).toLocaleString("en-IN")}
                </td>


                <td>

                  <span
                    className={`badge ${
                      bill.paymentStatus === "Paid"
                        ? "bg-success"
                        : bill.paymentStatus === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {bill.paymentStatus || "Pending"}
                  </span>

                </td>


                <td>

                  <div className="d-flex gap-2">

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        onView(bill)
                      }
                    >
                      View
                    </button>


                    <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      onClick={() =>
                        onEdit(bill)
                      }
                    >
                      Edit
                    </button>


                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        onDelete(bill.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="10"
                className="text-center text-muted py-5"
              >
                No billing records found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default BillingTable;