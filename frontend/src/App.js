import React, { useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import PatientHome from "./pages/PatientHome";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function RoleBasedRoute({ roleRequired, children }) {
  const isAuth = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />

          {/* Role-based dashboards */}
          <Route
            path="/patient-home"
            element={
              <RoleBasedRoute roleRequired="patient">
                <PatientHome />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/patient-dashboard"
            element={
              <RoleBasedRoute roleRequired="patient">
                <PatientDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <RoleBasedRoute roleRequired="doctor">
                <DoctorDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/clinic-dashboard"
            element={
              <RoleBasedRoute roleRequired="clinic_owner">
                <ClinicDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/pharmacy-dashboard"
            element={
              <RoleBasedRoute roleRequired="pharmacist">
                <PharmacyDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <RoleBasedRoute roleRequired="admin">
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
