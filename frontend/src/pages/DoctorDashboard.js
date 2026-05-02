import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Edit,
  Bell,
} from "lucide-react";
import { toast } from "react-toastify";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Doe",
      date: "2026-05-15",
      time: "02:00 PM",
      type: "Online",
      status: "Confirmed",
      fee: "₹500",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2026-05-16",
      time: "10:00 AM",
      type: "In-clinic",
      status: "Pending",
      fee: "₹800",
    },
    {
      id: 3,
      patient: "Mike Johnson",
      date: "2026-05-17",
      time: "04:00 PM",
      type: "Home Visit",
      status: "Confirmed",
      fee: "₹1000",
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

  const totalEarnings = appointments.reduce((sum, apt) => {
    const amount = parseInt(apt.fee.replace("₹", ""));
    return sum + amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                👨‍⚕️
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  MediConnect
                </h1>
                <p className="text-sm text-gray-500">Doctor Dashboard</p>
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
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl">
                👨‍⚕️
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Dr. {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 mt-2">Specialization: Cardiology</p>
                <p className="text-gray-600">Experience: 10+ years</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-gray-600">(245 reviews)</span>
                </div>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <p className="text-gray-600 text-sm">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">
                  {appointments.filter((a) => a.status === "Confirmed").length}
                </p>
              </div>
              <Bell className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <p className="text-3xl font-bold text-yellow-600">
                  ₹{totalEarnings}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Patients</p>
                <p className="text-3xl font-bold text-purple-600">47</p>
              </div>
              <Users className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Upcoming Appointments
            </h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus className="w-5 h-5" />
              <span>Add Slot</span>
            </button>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {apt.patient}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Consultation Type: {apt.type}
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

                <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">{apt.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900 flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{apt.time}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fee</p>
                    <p className="font-semibold text-gray-900">{apt.fee}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">30 mins</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                    Accept
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                    Start Consultation
                  </button>
                  <button className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
