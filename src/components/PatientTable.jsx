function PatientTable({
  patients,
  onView,
  onEdit,
  onDelete,
}) {

  return (

    <div className="table-responsive">

      <table className="table table-hover">

        <thead>

          <tr>

            <th>Patient</th>

            <th>Age</th>

            <th>Gender</th>

            <th>Blood Group</th>

            <th>Phone</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>


        <tbody>

          {patients.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="text-center py-5"
              >

                <div className="text-muted">

                  <h6 className="mb-2">
                    No patients found
                  </h6>

                  <p className="mb-0">
                    Try changing your search or filter.
                  </p>

                </div>

              </td>

            </tr>

          ) : (

            patients.map((patient) => (

              <tr key={patient.id}>


                {/* PATIENT */}

                <td>

                  <div className="patient-profile">

                    <div className="patient-avatar">

                      {patient.name
                        ?.charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <div className="fw-semibold">

                        {patient.name}

                      </div>

                      <small className="text-muted">

                        {patient.id}

                      </small>

                    </div>

                  </div>

                </td>


                {/* AGE */}

                <td>
                  {patient.age}
                </td>


                {/* GENDER */}

                <td>
                  {patient.gender}
                </td>


                {/* BLOOD GROUP */}

                <td>

                  <span className="fw-semibold">

                    {patient.bloodGroup || "-"}

                  </span>

                </td>


                {/* PHONE */}

                <td>
                  {patient.phone}
                </td>


                {/* STATUS */}

                <td>

                  <span
                    className={`status-badge ${
                      patient.status === "Inactive"
                        ? "status-inactive"
                        : "status-active"
                    }`}
                  >

                    {patient.status || "Active"}

                  </span>

                </td>


                {/* ACTIONS */}

                <td>

                  <div className="d-flex gap-2">

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        onView(patient)
                      }
                    >
                      View
                    </button>


                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        onEdit(patient)
                      }
                    >
                      Edit
                    </button>


                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        onDelete(patient)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default PatientTable;