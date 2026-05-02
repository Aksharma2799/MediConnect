import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Calendar,
  MapPin,
  Star,
  Phone,
  Mail,
  Edit,
} from "lucide-react";
import { toast } from "react-toastify";

function PatientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      specialization: "Cardiology",
      date: "2026-05-15",
      time: "02:00 PM",
      status: "Confirmed",
      type: "In-clinic",
    },
    {
      id: 2,
      doctor: "Dr. Priya Singh",
      specialization: "Dermatology",
      date: "2026-05-20",
      time: "10:00 AM",
      status: "Pending",
      type: "Online",
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

  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user?.firstName?.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  MediConnect
                </h1>
                <p className="text-sm text-gray-500">Patient Dashboard</p>
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
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 flex items-center space-x-2 mt-2">
                  <Mail className="w-5 h-5" />
                  <span>{user?.email}</span>
                </p>
                <p className="text-gray-600 flex items-center space-x-2 mt-1">
                  <Phone className="w-5 h-5" />
                  <span>{user?.phone}</span>
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Appointments</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {appointments.length}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-indigo-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming</p>
                <p className="text-3xl font-bold text-green-600">2</p>
              </div>
              <Calendar className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Favorite Doctors</p>
                <p className="text-3xl font-bold text-yellow-600">3</p>
              </div>
              <Star className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={handleBookAppointment}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg"
          >
            <Plus className="w-6 h-6" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Your Appointments
          </h3>

          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No appointments yet</p>
              <button
                onClick={handleBookAppointment}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {apt.doctor}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {apt.specialization}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">{apt.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">{apt.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-semibold text-gray-900">{apt.type}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                      Reschedule
                    </button>
                    <button className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
