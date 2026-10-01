function AppointmentTable({
  appointments,
  onView,
  onEdit,
  onDelete
}) {
  const getStatusClass = (status) => {
    if (status === "Confirmed") {
      return "appointment-status-confirmed";
    }

    if (status === "Completed") {
      return "appointment-status-completed";
    }

    if (status === "Cancelled") {
      return "appointment-status-cancelled";
    }

    return "appointment-status-pending";
  };

  return (
    <div className="table-responsive">
      <table className="table appointment-table">
        <thead>
          <tr>
            <th>Appointment</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="text-center py-5"
              >
                No appointments found
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => {
              const patientName =
                appointment.patientName ||
                "Unknown Patient";

              const doctorName =
                appointment.doctorName ||
                "Unknown Doctor";

              const patientId =
                appointment.patientId || "-";

              const doctorId =
                appointment.doctorId || "-";

              const department =
                appointment.department || "-";

              return (
                <tr key={appointment.id}>
                  <td>
                    <div className="appointment-id">
                      {appointment.id}
                    </div>
                  </td>

                  <td>
                    <div className="appointment-person">
                      <div className="appointment-avatar">
                        {patientName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <div className="appointment-name">
                          {patientName}
                        </div>

                        <div className="appointment-subtext">
                          {patientId}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="appointment-name">
                      {doctorName}
                    </div>

                    <div className="appointment-subtext">
                      {doctorId}
                    </div>
                  </td>

                  <td>
                    {department}
                  </td>

                  <td>
                    {appointment.date}
                  </td>

                  <td>
                    {appointment.time}
                  </td>

                  <td>
                    <span
                      className={`appointment-status ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex gap-2">

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          onView(appointment)
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          onEdit(appointment)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          onDelete(appointment)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;