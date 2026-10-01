import { useState } from "react";
import api from "../services/api";

function DoctorForm({ onAdd, onClose }) {

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    specialization: "",
    department: "",
    phone: "",
    email: "",
    experience: "",
    status: "Available",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);

      setError("");

      const newDoctor = {
        id: formData.id,
        name: formData.name,
        specialization: formData.specialization,
        department: formData.department,
        phone: formData.phone,
        email: formData.email,
        experience: Number(formData.experience),
        status: formData.status,
      };

      const response = await api.post(
        "/doctors",
        newDoctor
      );

      onAdd(response.data);

      onClose();

    } catch (error) {

      console.error(
        "Error adding doctor:",
        error
      );

      if (error.response?.data?.errors) {

        const validationErrors =
          Object.values(error.response.data.errors);

        setError(
          validationErrors.join(", ")
        );

      } else {

        setError(
          "Unable to add doctor. Please check the backend server."
        );
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="doctor-form-card">

      <div className="doctor-form-header">

        <div>

          <h5>Add New Doctor</h5>

          <p>
            Enter doctor information
          </p>

        </div>

        <button
          className="btn-close"
          type="button"
          onClick={onClose}
          disabled={loading}
        />

      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="row g-3">

          {/* Doctor ID */}
          <div className="col-md-4">

            <label className="form-label">
              Doctor ID
            </label>

            <input
              type="text"
              name="id"
              className="form-control"
              placeholder="Example: D001"
              value={formData.id}
              onChange={handleChange}
              required
            />

          </div>

          {/* Name */}
          <div className="col-md-8">

            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter doctor name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Specialization */}
          <div className="col-md-6">

            <label className="form-label">
              Specialization
            </label>

            <input
              type="text"
              name="specialization"
              className="form-control"
              placeholder="e.g. Cardiologist"
              value={formData.specialization}
              onChange={handleChange}
              required
            />

          </div>

          {/* Department */}
          <div className="col-md-6">

            <label className="form-label">
              Department
            </label>

            <select
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Department
              </option>

              <option value="Cardiology">
                Cardiology
              </option>

              <option value="Neurology">
                Neurology
              </option>

              <option value="Orthopedics">
                Orthopedics
              </option>

              <option value="General Medicine">
                General Medicine
              </option>

              <option value="Dermatology">
                Dermatology
              </option>

              <option value="Pediatrics">
                Pediatrics
              </option>

              <option value="Gynecology">
                Gynecology
              </option>

              <option value="ENT">
                ENT
              </option>

            </select>

          </div>

          {/* Experience */}
          <div className="col-md-6">

            <label className="form-label">
              Experience
            </label>

            <input
              type="number"
              name="experience"
              className="form-control"
              placeholder="Years of experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              max="60"
              required
            />

          </div>

          {/* Phone */}
          <div className="col-md-12">

            <label className="form-label">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}
          <div className="col-md-12">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Status */}
          <div className="col-md-6">

            <label className="form-label">
              Status
            </label>

            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
              required
            >

              <option value="Available">
                Available
              </option>

              <option value="On Leave">
                On Leave
              </option>

            </select>

          </div>

        </div>

        <div className="doctor-form-actions">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >

            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                ></span>

                Saving...
              </>
            ) : (
              "Add Doctor"
            )}

          </button>

        </div>

      </form>

    </div>
  );
}

export default DoctorForm;