import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar bg-dark text-white">

      <div className="sidebar-header">
        <h5 className="mb-1">
          HMS
        </h5>

        <small className="text-secondary">
          Hospital Management
        </small>
      </div>

      <nav className="nav flex-column mt-4">

        <NavLink
          to="/dashboard"
          className="nav-link text-white"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/patients"
          className="nav-link text-white"
        >
          Patients
        </NavLink>

        <NavLink
          to="/doctors"
          className="nav-link text-white"
        >
          Doctors
        </NavLink>

        <NavLink
          to="/appointments"
          className="nav-link text-white"
        >
          Appointments
        </NavLink>

        <NavLink
          to="/medical-records"
          className="nav-link text-white"
        >
          Medical Records
        </NavLink>

        <NavLink
          to="/prescriptions"
          className="nav-link text-white"
        >
          Prescriptions
        </NavLink>

        <NavLink
          to="/billing"
          className="nav-link text-white"
        >
          Billing
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;