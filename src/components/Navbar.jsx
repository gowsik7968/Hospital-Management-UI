function Navbar() {
  return (
    <nav className="navbar bg-white border-bottom px-4">
      <div className="container-fluid">

        <div>
          <h5 className="mb-0 fw-bold">
            Hospital Management
          </h5>

          <small className="text-muted">
            Hospital Administration
          </small>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">
            Admin
          </span>

          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
               style={{ width: "40px", height: "40px" }}>
            A
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;