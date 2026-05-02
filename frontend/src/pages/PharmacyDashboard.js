import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Edit,
  Pill,
} from "lucide-react";
import { toast } from "react-toastify";

function PharmacyDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Aspirin",
      manufacturer: "Abbott",
      stock: 150,
      price: "₹50",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Amoxicillin",
      manufacturer: "Cipla",
      stock: 5,
      price: "₹120",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Metformin",
      manufacturer: "Sun Pharma",
      stock: 0,
      price: "₹80",
      status: "Out of Stock",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      patient: "John Doe",
      medicines: ["Aspirin", "Cough Syrup"],
      total: "₹250",
      status: "Pending",
      date: "2026-05-15",
    },
    {
      id: 2,
      patient: "Jane Smith",
      medicines: ["Vitamins", "Iron Supplements"],
      total: "₹450",
      status: "Delivered",
      date: "2026-05-14",
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

  const totalRevenue = 15000;
  const totalOrders = orders.length;
  const lowStockCount = medicines.filter((m) => m.status !== "In Stock").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                💊
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  MediConnect
                </h1>
                <p className="text-sm text-gray-500">Pharmacy Dashboard</p>
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
        {/* Pharmacy Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl">
                💊
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  MediCare Pharmacy
                </h2>
                <p className="text-gray-600 mt-2">
                  📍 456 Health Street, Mumbai, Maharashtra
                </p>
                <p className="text-gray-600">
                  📞 +91-9888888888 | 📧 pharmacy@mediconnect.com
                </p>
                <p className="text-gray-600 mt-2">
                  ⏰ Mon-Sun: 8:00 AM - 10:00 PM | Delivery: Yes
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Edit className="w-5 h-5" />
              <span>Edit Info</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {totalOrders}
                </p>
              </div>
              <Package className="w-12 h-12 text-indigo-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalRevenue}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Medicines</p>
                <p className="text-3xl font-bold text-purple-600">
                  {medicines.length}
                </p>
              </div>
              <Pill className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Low Stock</p>
                <p className="text-3xl font-bold text-red-600">
                  {lowStockCount}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Medicines Inventory */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Medicines Inventory
                </h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Plus className="w-5 h-5" />
                  <span>Add Medicine</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                        Medicine Name
                      </th>
                      <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                        Manufacturer
                      </th>
                      <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((medicine) => (
                      <tr
                        key={medicine.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {medicine.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {medicine.manufacturer}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {medicine.stock}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {medicine.price}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              medicine.status === "In Stock"
                                ? "bg-green-100 text-green-800"
                                : medicine.status === "Low Stock"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {medicine.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-indigo-600 hover:text-indigo-700 font-semibold">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Recent Orders
            </h3>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-gray-900">
                      {order.patient}
                    </p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {order.medicines.join(", ")}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{order.date}</p>
                    <p className="font-semibold text-gray-900">{order.total}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDashboard;
