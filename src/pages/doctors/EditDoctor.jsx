import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditDoctor() {

  const navigate = useNavigate();

  const { id } = useParams();


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


  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  // =====================================================
  // LOAD DOCTOR
  // =====================================================

  useEffect(() => {

    fetchDoctor();

  }, [id]);


  const fetchDoctor = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await api.get(`/doctors/${id}`);


      setFormData({

        id: response.data.id || "",

        name: response.data.name || "",

        specialization:
          response.data.specialization || "",

        department:
          response.data.department || "",

        phone:
          response.data.phone || "",

        email:
          response.data.email || "",

        experience:
          response.data.experience ?? "",

        status:
          response.data.status || "Available",

      });

    } catch (error) {

      console.error(
        "Error fetching doctor:",
        error
      );

      setError(
        "Unable to load doctor information."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData((currentData) => ({

      ...currentData,

      [name]: value,

    }));
  };


  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    try {

      setSaving(true);

      setError("");


      const updatedDoctor = {

        id: formData.id,

        name: formData.name,

        specialization:
          formData.specialization,

        department:
          formData.department,

        phone:
          formData.phone,

        email:
          formData.email,

        experience:
          Number(formData.experience),

        status:
          formData.status,

      };


      await api.put(
        `/doctors/${id}`,
        updatedDoctor
      );


      navigate("/doctors");


    } catch (error) {

      console.error(
        "Error updating doctor:",
        error
      );


      if (error.response?.data?.errors) {

        const validationErrors =
          Object.values(
            error.response.data.errors
          );

        setError(
          validationErrors.join(", ")
        );

      } else {

        setError(
          "Unable to update doctor."
        );
      }


    } finally {

      setSaving(false);

    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="doctor-page">

        <div className="text-center py-5">

          <div className="spinner-border"></div>

          <p className="mt-3">
            Loading doctor information...
          </p>

        </div>

      </div>
    );
  }


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="doctor-page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Edit Doctor
          </h1>

          <p className="page-subtitle">
            Update doctor information
          </p>

        </div>


        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/doctors")
          }
        >
          ← Back to Doctors
        </button>

      </div>


      {/* FORM CARD */}

      <div className="doctor-form-card">

        {/* FORM HEADER */}

        <div className="doctor-form-header">

          <div>

            <h5>
              Edit Doctor Information
            </h5>

            <p>
              Update the details of{" "}
              {formData.name}
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

          <div className="row g-3">


            {/* DOCTOR ID */}

            <div className="col-md-4">

              <label className="form-label">
                Doctor ID
              </label>

              <input
                type="text"
                name="id"
                className="form-control"
                value={formData.id}
                disabled
              />

            </div>


            {/* NAME */}

            <div className="col-md-8">

              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* SPECIALIZATION */}

            <div className="col-md-6">

              <label className="form-label">
                Specialization
              </label>

              <input
                type="text"
                name="specialization"
                className="form-control"
                value={formData.specialization}
                onChange={handleChange}
                required
              />

            </div>


            {/* DEPARTMENT */}

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


            {/* EXPERIENCE */}

            <div className="col-md-6">

              <label className="form-label">
                Experience
              </label>

              <input
                type="number"
                name="experience"
                className="form-control"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                max="60"
                required
              />

            </div>


            {/* PHONE */}

            <div className="col-md-6">

              <label className="form-label">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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

                <option value="Available">
                  Available
                </option>

                <option value="On Leave">
                  On Leave
                </option>

              </select>

            </div>

          </div>


          {/* ACTION BUTTONS */}

          <div className="doctor-form-actions">

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                navigate("/doctors")
              }
              disabled={saving}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >

              {saving ? (

                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>

              ) : (

                "Save Changes"

              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditDoctor;