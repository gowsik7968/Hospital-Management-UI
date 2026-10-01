import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";

import Patients from "./pages/patients/Patients";
import PatientsDetails from "./pages/patients/PatientsDetails";
import EditPatient from "./pages/patients/EditPatient";

import Doctors from "./pages/doctors/Doctors";
import DoctorsDetails from "./pages/doctors/DoctorsDetails";
import EditDoctor from "./pages/doctors/EditDoctor";

import Appointments from "./pages/appointments/Appointments";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import EditAppointment  from "./pages/appointments/EditAppointment"

import MedicalRecords from "./pages/medical-records/MedicalRecords";
import MedicalRecordDetails from "./pages/medical-records/MedicalRecordDetails";
import EditMedicalRecord  from "./pages/medical-records/EditMedicalRecord"

import Prescriptions from "./pages/prescriptions/Prescriptions";
import PrescriptionDetails from "./pages/prescriptions/PrescriptionDetails";
import EditPrescription  from "./pages/prescriptions/EditPrescription"

import Billing from "./pages/billing/Billing";
import BillingDetails from "./pages/billing/BillingDetails";
import EditBilling  from "./pages/billing/EditBilling"
import "./index.css"



function App() {
  return (
    <BrowserRouter>

      <div className="min-vh-100">

        <Navbar />

        <div className="d-flex">

          <Sidebar />

          { <main className="main-content">

            <Routes>

              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
            
               <Route
                path="/patients"
                element={<Patients />}
              /> 

              <Route
                path="/patients/:id"
                element={<PatientsDetails />}
              />
 
              <Route
                path="/patients/:id/edit"
                element={<EditPatient />}
              />

              <Route
                path="/doctors"
                element={<Doctors />}
              />

              <Route
                path="/doctors/:id"
                element={<DoctorsDetails />}
              />

              <Route
                path="/doctors/:id/edit"
                element={<EditDoctor />}
              />

              <Route
                path="/appointments"
                element={<Appointments />}
              />

              <Route
                path="/appointments/:id"
                element={<AppointmentDetails />}
              />

              <Route
                path="/appointments/:id/edit"
                element={<EditAppointment />}
              />

              <Route
                path="/medical-records"
                element={<MedicalRecords />}
              />

               <Route
                path="/medical-records/:id"
                element={<MedicalRecordDetails />}
              />

              <Route
                path="/medical-records/:id/edit"
                element={<EditMedicalRecord />}
              />

              <Route
                path="/prescriptions"
                element={<Prescriptions />}
              />

              <Route
                path="/prescriptions/:id"
                element={<PrescriptionDetails />}
              />

              <Route
                path="/prescriptions/:id/edit"
                element={<EditPrescription/>}
              />

              <Route
                path="/billing"
                element={<Billing />}
              />

               <Route
                path="/billing/:id"
                element={<BillingDetails />}
              />

               <Route
                path="/billing/:id/edit"
                element={<EditBilling />}
              /> 

            </Routes>

          </main> }

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;