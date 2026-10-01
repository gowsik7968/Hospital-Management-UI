import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

function EditPatient() {

  const navigate = useNavigate();

  const { id } = useParams();


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


  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  // =========================================================
  // FETCH PATIENT
  // =========================================================

  useEffect(() => {

    fetchPatient();

  }, [id]);


  const fetchPatient = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await api.get(
          `/patients/${id}`
        );


      const patient =
        response.data;


      setFormData({

        id: patient.id || "",

        name: patient.name || "",

        age: patient.age ?? "",

        gender: patient.gender || "",

        bloodGroup:
          patient.bloodGroup || "",

        phone: patient.phone || "",

        email: patient.email || "",

        address: patient.address || "",

        status:
          patient.status || "Active",

      });

    } catch (err) {

      console.error(
        "Error fetching patient:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Unable to load patient information."
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (event) => {

    const { name, value } =
      event.target;


    setFormData(
      (currentData) => ({

        ...currentData,

        [name]: value,

      })
    );
  };


  // =========================================================
  // UPDATE PATIENT
  // =========================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setSaving(true);

      setError("");


      try {

        const updatedPatient = {

          id: formData.id,

          name: formData.name.trim(),

          age: Number(formData.age),

          gender: formData.gender,

          bloodGroup:
            formData.bloodGroup,

          phone:
            formData.phone.trim(),

          email:
            formData.email.trim(),

          address:
            formData.address.trim(),

          status:
            formData.status,

        };


        await api.put(
          `/patients/${id}`,
          updatedPatient
        );


        navigate("/patients");

      } catch (err) {

        console.error(
          "Error updating patient:",
          err
        );


        if (
          err.response?.data?.errors
        ) {

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
            "Unable to update patient."
          );
        }

      } finally {

        setSaving(false);
      }
    };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="patient-page">

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >
          </div>

          <p className="text-muted mt-3">
            Loading patient...
          </p>

        </div>

      </div>
    );
  }


  // =========================================================
  // FETCH ERROR
  // =========================================================

  if (error && !formData.name) {

    return (

      <div className="patient-page">

        <div className="alert alert-danger">

          {error}

        </div>


        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            navigate("/patients")
          }
        >
          ← Back to Patients
        </button>

      </div>
    );
  }


  return (

    <div className="patient-page">


      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Edit Patient
          </h1>

          <p className="page-subtitle">
            Update patient information
          </p>

        </div>


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/patients")
          }
          disabled={saving}
        >
          ← Back
        </button>

      </div>


      {/* FORM CARD */}

      <div className="patient-form-card">


        <div className="patient-form-header">

          <div>

            <h5>
              Patient Information
            </h5>

            <p>
              Update the details below
            </p>

          </div>

        </div>


        {/* ERROR */}

        {error && (

          <div className="alert alert-danger">

            {error}

          </div>

        )}


        <form onSubmit={handleSubmit}>


          <div className="row g-4">


            {/* PATIENT ID */}

            <div className="col-md-4">

              <label className="form-label">
                Patient ID
              </label>

              <input
                type="text"
                name="id"
                className="form-control"
                value={formData.id}
                readOnly
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
                minLength="3"
                maxLength="100"
                required
              />

            </div>


            {/* AGE */}

            <div className="col-md-3">

              <label className="form-label">
                Age
              </label>

              <input
                type="number"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                required
              />

            </div>


            {/* GENDER */}

            <div className="col-md-3">

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

            <div className="col-md-3">

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


            {/* STATUS */}

            <div className="col-md-3">

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


            {/* PHONE */}

            <div className="col-md-6">

              <label className="form-label">
                Contact Number
              </label>

              <input
                type="tel"
                name="phone"
                className="form-control"
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
                rows="4"
                value={formData.address}
                onChange={handleChange}
                minLength="5"
                maxLength="250"
                required
              />

            </div>

          </div>


          {/* ACTIONS */}

          <div className="patient-form-actions">

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                navigate("/patients")
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

                  Updating...

                </>

              ) : (

                "Update Patient"

              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditPatient;