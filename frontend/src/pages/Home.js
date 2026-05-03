import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Menu, X, ChevronDown, User, Heart, MessageSquare, MapPin } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Activity className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">MediConnect</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Home
              </button>
              <button 
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Services
              </button>
              <button 
                onClick={() => document.getElementById("why-choose")?.scrollIntoView({ behavior: "smooth" })}
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Contact
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                  <User className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700 font-medium">{isAuth ? "Account" : "User"}</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
                    {isAuth ? (
                      <>
                        <button
                          onClick={() => {
                            navigate("/patient-home");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                        >
                          📍 Dashboard
                        </button>
                        <button
                          onClick={() => {
                            navigate("/bookings");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                        >
                          📅 My Bookings
                        </button>
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                        >
                          👤 Profile
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                        >
                          🚪 Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            navigate("/login");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                        >
                          🔑 Login
                        </button>
                        <button
                          onClick={() => {
                            navigate("/register");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          ✏️ Register
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
                          Register
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
              >
                Home
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded">
                Services
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded">
                About Us
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded">
                Contact
              </button>
              <div className="border-t pt-2">
                {isAuth ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/patient-dashboard");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Your Complete Healthcare Solution
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              Connect with doctors, book appointments, and order medicines—all
              in one place
            </p>

            {!isAuth && (
              <div className="space-x-4 flex justify-center">
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-lg font-semibold"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-5xl mb-4">👨‍⚕️</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Find Doctors
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover thousands of qualified doctors and medical specialists
                near you. Filter by specialization, experience, and ratings to
                find the perfect healthcare provider.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Book Appointments
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Schedule consultations at your convenience with real-time
                availability. Choose your preferred time slot and get instant
                confirmation with appointment reminders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-5xl mb-4">💊</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Order Medicines
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse and order medicines from trusted pharmacies. Get fast
                delivery right to your doorstep with secure payment options and
                medicine tracking.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="bg-white rounded-lg shadow-md p-12 mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose MediConnect?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🏥</div>
                <h4 className="text-lg font-semibold mb-2">50+ Clinics</h4>
                <p className="text-gray-600 text-sm">
                  Partner hospitals and clinics across the city
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">👨‍⚕️</div>
                <h4 className="text-lg font-semibold mb-2">500+ Doctors</h4>
                <p className="text-gray-600 text-sm">
                  Qualified physicians across all specializations
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🚚</div>
                <h4 className="text-lg font-semibold mb-2">Fast Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Medicines delivered in 24-48 hours
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="text-lg font-semibold mb-2">Secure & Safe</h4>
                <p className="text-gray-600 text-sm">
                  Your health data is encrypted and secure
                </p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-indigo-600 text-white rounded-lg shadow-md p-12 mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-3">📋 For Patients</h4>
                <ul className="space-y-2 text-indigo-100">
                  <li>✓ Find and book doctors</li>
                  <li>✓ View appointment history</li>
                  <li>✓ Order medicines online</li>
                  <li>✓ Track prescriptions</li>
                  <li>✓ Get health reminders</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">
                  🏥 For Healthcare Providers
                </h4>
                <ul className="space-y-2 text-indigo-100">
                  <li>✓ Manage appointments</li>
                  <li>✓ View patient queue</li>
                  <li>✓ Send prescriptions</li>
                  <li>✓ Track earnings</li>
                  <li>✓ Get real-time notifications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          {!isAuth && (
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg shadow-md p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Your Health Journey?
              </h3>
              <p className="text-xl mb-6 text-indigo-100">
                Join thousands of users who trust MediConnect for their
                healthcare needs
              </p>
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 text-lg font-semibold"
              >
                Sign Up Now
              </button>
            </div>
          )}

          {isAuth && (
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow-md p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
              <p className="text-xl mb-6 text-green-100">
                Access your dashboard to manage appointments and health records
              </p>
              <button
                onClick={() => navigate("/patient-dashboard")}
                className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 text-lg font-semibold"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-6 h-6 text-indigo-400" />
                  <h4 className="text-lg font-semibold">MediConnect</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Your complete healthcare marketplace solution
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <button className="hover:text-white">Home</button>
                  </li>
                  <li>
                    <button className="hover:text-white">Services</button>
                  </li>
                  <li>
                    <button className="hover:text-white">About Us</button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <button className="hover:text-white">Contact</button>
                  </li>
                  <li>
                    <button className="hover:text-white">FAQ</button>
                  </li>
                  <li>
                    <button className="hover:text-white">Help Center</button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <button className="hover:text-white">Privacy Policy</button>
                  </li>
                  <li>
                    <button className="hover:text-white">
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white">Cookie Policy</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm text-center">
                © 2026 MediConnect. All rights reserved. Your trusted healthcare
                marketplace.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
