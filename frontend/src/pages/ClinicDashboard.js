import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Users,
  DollarSign,
  Clock,
  Building2,
  Edit,
  TrendingUp,
} from "lucide-react";
import { toast } from "react-toastify";

function ClinicDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiology",
      patients: 120,
      rating: 4.8,
      available: true,
    },
    {
      id: 2,
      name: "Dr. Priya Singh",
      specialization: "Dermatology",
      patients: 95,
      rating: 4.9,
      available: true,
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialization: "General Medicine",
      patients: 150,
      rating: 4.7,
      available: false,
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      patient: "John Doe",
      time: "02:00 PM",
      date: "2026-05-15",
    },
    {
      id: 2,
      doctor: "Dr. Priya Singh",
      patient: "Jane Smith",
      time: "10:00 AM",
      date: "2026-05-16",
    },
    {
      id: 3,
      doctor: "Dr. Amit Patel",
      patient: "Mike Johnson",
      time: "04:00 PM",
      date: "2026-05-17",
    },
  ]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const totalRevenue = 85000;
  const totalPatients = doctors.reduce((sum, doc) => sum + doc.patients, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                🏥
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  MediConnect
                </h1>
                <p className="text-sm text-gray-500">Clinic Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clinic Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl">
                🏥
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Apollo Clinic
                </h2>
                <p className="text-gray-600 mt-2">
                  📍 123 Medical Street, Mumbai, Maharashtra
                </p>
                <p className="text-gray-600">
                  📞 +91-9999999999 | 📧 clinic@mediconnect.com
                </p>
                <p className="text-gray-600 mt-2">
                  ⏰ Mon-Sat: 9:00 AM - 9:00 PM | Sun: Closed
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Edit className="w-5 h-5" />
              <span>Edit Clinic</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Doctors</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {doctors.length}
                </p>
              </div>
              <Users className="w-12 h-12 text-indigo-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Patients</p>
                <p className="text-3xl font-bold text-green-600">
                  {totalPatients}
                </p>
              </div>
              <Users className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-yellow-600">
                  ₹{totalRevenue}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Appointments</p>
                <p className="text-3xl font-bold text-purple-600">12</p>
              </div>
              <Clock className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctors Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Doctors</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Plus className="w-5 h-5" />
                  <span>Add Doctor</span>
                </button>
              </div>

              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                          👨‍⚕️
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {doctor.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {doctor.specialization}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          doctor.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doctor.available ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Patients</p>
                        <p className="font-semibold text-gray-900">
                          {doctor.patients}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <p className="font-semibold text-yellow-600">
                          ★ {doctor.rating}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <p className="font-semibold text-gray-900">Active</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Recent Appointments
            </h3>

            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="border-l-4 border-indigo-600 pl-4 py-2"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {apt.doctor}
                  </p>
                  <p className="text-xs text-gray-600">{apt.patient}</p>
                  <p className="text-xs text-gray-500">
                    {apt.date} at {apt.time}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
              View All Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicDashboard;
