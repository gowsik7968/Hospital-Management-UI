import { useState } from "react";
import api from "../services/api";

function PatientForm({ onAdd, onClose }) {

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  // =========================================================
  // SUBMIT FORM
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setError("");


    try {

      const newPatient = {

        id: formData.id.trim(),

        name: formData.name.trim(),

        age: Number(formData.age),

        gender: formData.gender,

        bloodGroup: formData.bloodGroup,

        phone: formData.phone.trim(),

        email: formData.email.trim(),

        address: formData.address.trim(),

        status: formData.status,
      };


      const response =
        await api.post(
          "/patients",
          newPatient
        );


      onAdd(response.data);

      onClose();

    } catch (err) {

      console.error(
        "Error adding patient:",
        err
      );


      if (err.response?.data?.errors) {

        const validationErrors =
          Object.values(
            err.response.data.errors
          );

        setError(
          validationErrors.join(", ")
        );

      } else {

        setError(
          err.response?.data?.message ||
          "Failed to add patient. Please check the entered details."
        );
      }

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="patient-form-card">

      {/* HEADER */}

      <div className="patient-form-header">

        <div>

          <h5>
            Add New Patient
          </h5>

          <p>
            Enter patient information below
          </p>

        </div>

      </div>


      {/* ERROR */}

      {error && (

        <div className="alert alert-danger">

          {error}

        </div>

      )}


      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <div className="row g-4">


          {/* PATIENT ID */}

          <div className="col-md-6">

            <label className="form-label">
              Patient ID
            </label>

            <input
              type="text"
              name="id"
              className="form-control"
              placeholder="Example: P001"
              value={formData.id}
              onChange={handleChange}
              required
            />

          </div>


          {/* NAME */}

          <div className="col-md-6">

            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter patient name"
              value={formData.name}
              onChange={handleChange}
              minLength="3"
              maxLength="100"
              required
            />

          </div>


          {/* AGE */}

          <div className="col-md-4">

            <label className="form-label">
              Age
            </label>

            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="120"
              required
            />

          </div>


          {/* GENDER */}

          <div className="col-md-4">

            <label className="form-label">
              Gender
            </label>

            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* BLOOD GROUP */}

          <div className="col-md-4">

            <label className="form-label">
              Blood Group
            </label>

            <select
              name="bloodGroup"
              className="form-select"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Blood Group
              </option>

              <option value="A+">
                A+
              </option>

              <option value="A-">
                A-
              </option>

              <option value="B+">
                B+
              </option>

              <option value="B-">
                B-
              </option>

              <option value="AB+">
                AB+
              </option>

              <option value="AB-">
                AB-
              </option>

              <option value="O+">
                O+
              </option>

              <option value="O-">
                O-
              </option>

            </select>

          </div>


          {/* PHONE */}

          <div className="col-md-6">

            <label className="form-label">
              Contact Number
            </label>

            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="10 digit phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />

          </div>


          {/* EMAIL */}

          <div className="col-md-6">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* ADDRESS */}

          <div className="col-12">

            <label className="form-label">
              Address
            </label>

            <textarea
              name="address"
              className="form-control"
              placeholder="Enter patient address"
              value={formData.address}
              onChange={handleChange}
              minLength="5"
              maxLength="250"
              rows="3"
              required
            />

          </div>


          {/* STATUS */}

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

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="patient-form-actions">

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
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              "Add Patient"
            )}

          </button>

        </div>

      </form>

    </div>
  );
}

export default PatientForm;