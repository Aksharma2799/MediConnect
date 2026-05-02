import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Building2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { toast } from "react-toastify";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalDoctors: 180,
    totalClinics: 45,
    totalPharmacies: 60,
    totalAppointments: 5420,
    totalRevenue: 2850000,
    pendingVerifications: 12,
    activeUsers: 890,
  });

  const [recentVerifications, setRecentVerifications] = useState([
    {
      id: 1,
      name: "Dr. Vikram Sharma",
      type: "Doctor",
      date: "2026-05-15",
      status: "Pending",
    },
    {
      id: 2,
      name: "Healing Clinic",
      type: "Clinic",
      date: "2026-05-14",
      status: "Pending",
    },
    {
      id: 3,
      name: "MediCare Plus",
      type: "Pharmacy",
      date: "2026-05-13",
      status: "Approved",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                🛡️
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  MediConnect
                </h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {stats.totalUsers}
                </p>
              </div>
              <Users className="w-12 h-12 text-indigo-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Doctors</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.totalDoctors}
                </p>
              </div>
              <Users className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Clinics</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.totalClinics}
                </p>
              </div>
              <Building2 className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pharmacies</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.totalPharmacies}
                </p>
              </div>
              <Building2 className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Appointments</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.totalAppointments}
                </p>
              </div>
              <BarChart3 className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-yellow-600">
                  ₹{(stats.totalRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Verifications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Pending Verifications
                </h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {stats.pendingVerifications}
                </span>
              </div>

              <div className="space-y-4">
                {recentVerifications.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Type: {item.type}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-600">{item.date}</p>
                      {item.status === "Pending" && (
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Platform Statistics
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.activeUsers}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-gray-600 text-sm">Appointments Today</p>
                  <p className="text-2xl font-bold text-green-600">145</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-gray-600 text-sm">New Signups</p>
                  <p className="text-2xl font-bold text-yellow-600">28</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-gray-600 text-sm">Support Tickets</p>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <Users className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Manage Users</p>
          </button>

          <button className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Verify Doctors</p>
          </button>

          <button className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">View Reports</p>
          </button>

          <button className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <BarChart3 className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
