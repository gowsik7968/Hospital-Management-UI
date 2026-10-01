function PrescriptionTable({
  prescriptions,
  onView,
  onEdit,
  onDelete
}) {

  return (
    <div className="table-responsive">

      <table className="table table-hover align-middle">

        <thead className="table-light">

          <tr>
            <th>Prescription ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Diagnosis</th>
            <th>Date</th>
            <th>Medicines</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>


        <tbody>

          {prescriptions.length > 0 ? (

            prescriptions.map((prescription) => {

              const medicines =
                Array.isArray(prescription.medicines)
                  ? prescription.medicines
                  : [];

              const patientName =
                prescription.patientName ||
                prescription.patient?.name ||
                "Unknown Patient";

              const doctorName =
                prescription.doctorName ||
                prescription.doctor?.name ||
                "Unknown Doctor";

              const status =
                prescription.status || "Active";


              return (

                <tr key={prescription.id}>

                  {/* Prescription ID */}

                  <td className="fw-semibold">
                    {prescription.id}
                  </td>


                  {/* Patient */}

                  <td>

                    <div className="fw-semibold">
                      {patientName}
                    </div>

                    <small className="text-muted">
                      {prescription.patientId || "-"}
                    </small>

                  </td>


                  {/* Doctor */}

                  <td>

                    <div className="fw-semibold">
                      {doctorName}
                    </div>

                    <small className="text-muted">
                      {prescription.doctorId || "-"}
                    </small>

                  </td>


                  {/* Diagnosis */}

                  <td>
                    {prescription.diagnosis || "-"}
                  </td>


                  {/* Date */}

                  <td>
                    {prescription.date || "-"}
                  </td>


                  {/* Medicines */}

                  <td>

                    <span className="badge bg-primary">

                      {medicines.length} Medicine
                      {medicines.length !== 1 ? "s" : ""}

                    </span>

                  </td>


                  {/* Status */}

                  <td>

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

                  </td>


                  {/* Actions */}

                  <td>

                    <div className="d-flex gap-2">

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          onView(prescription)
                        }
                      >
                        View
                      </button>


                      <button
                        type="button"
                        className="btn btn-sm btn-outline-warning"
                        onClick={() =>
                          onEdit(prescription)
                        }
                      >
                        Edit
                      </button>


                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          onDelete(prescription.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              );
            })

          ) : (

            <tr>

              <td
                colSpan="8"
                className="text-center py-5"
              >

                <div className="text-muted">

                  <h6 className="mb-2">
                    No prescriptions found
                  </h6>

                  <p className="mb-0">
                    There are no prescription records to display.
                  </p>

                </div>

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default PrescriptionTable;