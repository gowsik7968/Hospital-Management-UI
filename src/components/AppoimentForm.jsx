import { useState } from "react";

function AppointmentForm({
  patients,
  doctors,
  onAdd,
  onClose
}) {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    department: "",
    date: "",
    time: "",
    status: "Pending",
    reason: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const selectedPatient = patients.find(
    (patient) => patient.id === formData.patientId
  );

  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === formData.doctorId
  );

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;

    const doctor = doctors.find(
      (currentDoctor) => currentDoctor.id === doctorId
    );

    setFormData((currentData) => ({
      ...currentData,
      doctorId,
      department: doctor ? doctor.department : ""
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedPatient || !selectedDoctor) {
      return;
    }

    const newAppointment = {
      id: `A${Date.now()}`,
      patientId: formData.patientId,
      patientName: selectedPatient.name,
      doctorId: formData.doctorId,
      doctorName: selectedDoctor.name,
      department: formData.department,
      date: formData.date,
      time: formData.time,
      status: formData.status,
      reason: formData.reason
    };

    onAdd(newAppointment);
    onClose();
  };

  return (
    <div className="appointment-form-card">

      <div className="appointment-form-header">

        <div>
          <h5>Add New Appointment</h5>
          <p>Schedule a patient appointment</p>
        </div>

        <button
          type="button"
          className="btn-close"
          onClick={onClose}
        />

      </div>

      <form onSubmit={handleSubmit}>

        <div className="row g-3">

          <div className="col-md-6">

            <label className="form-label">
              Patient
            </label>

            <select
              name="patientId"
              className="form-select"
              value={formData.patientId}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Patient
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {patient.name} ({patient.id})
                </option>
              ))}

            </select>

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Doctor
            </label>

            <select
              name="doctorId"
              className="form-select"
              value={formData.doctorId}
              onChange={handleDoctorChange}
              required
            >

              <option value="">
                Select Doctor
              </option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}

            </select>

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Department
            </label>

            <input
              type="text"
              name="department"
              className="form-control"
              value={formData.department}
              readOnly
            />

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Appointment Date
            </label>

            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Appointment Time
            </label>

            <input
              type="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Status
            </label>

            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

          <div className="col-12">

            <label className="form-label">
              Appointment Reason
            </label>

            <textarea
              name="reason"
              className="form-control"
              placeholder="Enter reason for appointment..."
              value={formData.reason}
              onChange={handleChange}
              minLength="3"
              maxLength="250"
              required
            />

          </div>

        </div>

        <div className="appointment-form-actions">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Appointment
          </button>

        </div>

      </form>

    </div>
  );
}

export default AppointmentForm;