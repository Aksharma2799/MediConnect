import React from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">MediConnect</h1>
            </div>
            <div className="space-x-4">
              {isAuth ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MediConnect
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your healthcare marketplace for finding doctors, booking
            appointments, and ordering medicines.
          </p>

          {!isAuth && (
            <div className="space-x-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg"
              >
                Get Started
              </button>
            </div>
          )}

          {isAuth && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-2">👨‍⚕️</div>
                <h3 className="text-xl font-semibold mb-2">Find Doctors</h3>
                <p className="text-gray-600">
                  Discover nearby doctors and specialists
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-2">📅</div>
                <h3 className="text-xl font-semibold mb-2">
                  Book Appointments
                </h3>
                <p className="text-gray-600">
                  Schedule consultations at your convenience
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-2">💊</div>
                <h3 className="text-xl font-semibold mb-2">Order Medicines</h3>
                <p className="text-gray-600">
                  Get medicines delivered to your home
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
