import DashboardStatCard from "../components/DashboardStatCard";
import appointments from "../Data/appointments";



function Dashboard() {

  const today = "2026-09-05";

  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === today
  );

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  );

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Hospital overview and today's activities
        </p>
      </div>

      <div className="row g-4 mb-4">

        <DashboardStatCard
          title="Total Patients"
          value="120"
          description="Registered patients"
          icon="👥"
          variant="primary"
        />

        <DashboardStatCard
          title="Total Doctors"
          value="25"
          description="Active doctors"
          icon="👨‍⚕️"
          variant="success"
        />

        <DashboardStatCard
          title="Today's Appointments"
          value={todayAppointments.length}
          description="Scheduled for today"
          icon="📅"
          variant="warning"
        />

        <DashboardStatCard
          title="Pending Appointments"
          value={pendingAppointments.length}
          description="Need confirmation"
          icon="⏳"
          variant="info"
        />

      </div>

      <div className="dashboard-section">

        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            Today's Appointments
          </h2>
        </div>

        <div className="table-responsive">

          <table className="table dashboard-table">

            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {todayAppointments.map((appointment) => (

                <tr key={appointment.id}>

                  <td>
                    <div className="appointment-patient">
                      {appointment.patientName}
                    </div>

                    <div className="appointment-id">
                      {appointment.patientId}
                    </div>
                  </td>

                  <td>
                    {appointment.doctorName}
                  </td>

                  <td>
                    {appointment.department}
                  </td>

                  <td>
                    {appointment.time}
                  </td>

                  <td>
                    <span
                      className={`appointment-status ${
                        appointment.status === "Confirmed"
                          ? "status-confirmed"
                          : "status-pending"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;