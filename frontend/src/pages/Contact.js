import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Menu,
  X,
  ChevronDown,
  Send,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../services/api";

function Contact() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactType: "general", // general, complaint, suggestion, appointment
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/contacts", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        contactType: formData.contactType,
      });

      if (response.data.success) {
        toast.success(
          "✅ Message sent successfully! We'll get back to you soon.",
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          contactType: "general",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message || "Failed to send message",
      );
    } finally {
      setLoading(false);
    }
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
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Home
              </button>
              <button className="text-gray-700 hover:text-indigo-600 font-medium">
                Services
              </button>
              <button className="text-gray-700 hover:text-indigo-600 font-medium">
                About Us
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-indigo-600 font-medium border-b-2 border-indigo-600"
              >
                Contact
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium"
                >
                  <span>{isAuth ? "Account" : "User"}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    {isAuth ? (
                      <>
                        <button
                          onClick={() => {
                            navigate("/patient-dashboard");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            handleLogout();
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            navigate("/login");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => {
                            navigate("/register");
                            setUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50"
                        >
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
              <button
                onClick={() => {
                  navigate("/contact");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded"
              >
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Have questions or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* Email */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Mail className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-600">support@mediconnect.com</p>
                <p className="text-gray-600">info@mediconnect.com</p>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Phone className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
                </div>
                <p className="text-gray-600">+91-1234567890</p>
                <p className="text-gray-600">Mon - Fri, 9 AM - 6 PM</p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Address
                  </h3>
                </div>
                <p className="text-gray-600">
                  123 Health Street
                  <br />
                  Medical City, MC 12345
                  <br />
                  India
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="+91-1234567890"
                  />
                </div>

                {/* Contact Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Contact Type *
                  </label>
                  <select
                    name="contactType"
                    value={formData.contactType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="appointment">Appointment Issue</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Subject of your message"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Your message..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center space-x-2 font-semibold"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  How long does it take to respond?
                </h4>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during
                  business days.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  What is your support availability?
                </h4>
                <p className="text-gray-600">
                  Our support team is available Monday to Friday, 9 AM to 6 PM.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I track my complaint status?
                </h4>
                <p className="text-gray-600">
                  Yes, after submitting a complaint, you'll receive a reference
                  ID to track the status.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Is my information secure?
                </h4>
                <p className="text-gray-600">
                  Absolutely! All your information is encrypted and stored
                  securely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400">
                © 2026 MediConnect. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Contact;
