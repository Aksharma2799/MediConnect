import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Star,
  Clock,
  DollarSign,
  Heart,
  Phone,
  Video,
  AlertCircle,
  Filter,
  ChevronDown,
  MessageCircle,
  Calendar,
  User,
  Home,
  Zap,
  Pill,
  Activity,
  Menu,
  X,
} from "lucide-react";
import api from "../services/api";
import { toast } from "react-toastify";

function PatientHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("nearest");
  const [doctors, setDoctors] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    specialization: "",
    distance: 25,
    maxFee: 2000,
    gender: "any",
    minRating: "any",
    availableToday: false,
    onlineConsult: false,
    languages: [],
  });

  const specializations = [
    { id: "cardiology", name: "Cardiology", icon: "❤️" },
    { id: "neurology", name: "Neurology", icon: "🧠" },
    { id: "orthopedics", name: "Orthopedics", icon: "🦴" },
    { id: "pediatrics", name: "Pediatrics", icon: "👶" },
    { id: "gynecology", name: "Gynecology", icon: "👩‍⚕️" },
    { id: "dermatology", name: "Dermatology", icon: "🧴" },
    { id: "dentistry", name: "Dentistry", icon: "😁" },
    { id: "psychiatry", name: "Psychiatry", icon: "🧘" },
  ];

  const languages = ["English", "Tamil", "Hindi", "Telugu"];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Fetch appointments
      try {
        const apptRes = await api.get("/appointments/my-appointments");
        if (apptRes.data.success) {
          setAppointments(apptRes.data.data.slice(0, 2));
        }
      } catch (err) {
        // Use mock data if API fails
        setAppointments([
          {
            _id: "1",
            doctorName: "Dr. Rajesh Kumar",
            specialization: "Cardiology",
            date: "2026-05-05",
            time: "3:00 PM",
            status: "confirmed",
          },
        ]);
      }

      // Fetch nearby doctors
      fetchNearbyDoctors();

      // Fetch pharmacies
      try {
        const pharmRes = await api.get("/pharmacies/nearby");
        if (pharmRes.data.success) {
          setPharmacies(pharmRes.data.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching pharmacies:", err);
      }

      // Fetch health data
      try {
        const healthRes = await api.get("/health/snapshot");
        if (healthRes.data.success) {
          setHealthData(healthRes.data.data);
        }
      } catch (err) {
        // Use default health data
        setHealthData({
          bloodPressure: "120/80",
          bloodSugar: 95,
          weight: 70,
          height: 175,
          lastCheckup: 15,
          activeMedicines: 1,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyDoctors = async () => {
    try {
      const queryParams = new URLSearchParams({
        distance: filters.distance,
        maxFee: filters.maxFee,
        minRating: filters.minRating,
        gender: filters.gender,
        availableToday: filters.availableToday,
        onlineConsult: filters.onlineConsult,
        sort: sortBy,
      });

      if (filters.specialization) {
        queryParams.append("specialization", filters.specialization);
      }
      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }
      if (filters.languages.length > 0) {
        queryParams.append("languages", filters.languages.join(","));
      }

      const res = await api.get(`/doctors/nearby?${queryParams}`);
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleLanguage = (lang) => {
    setFilters((prev) => {
      const languages = prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang];
      return { ...prev, languages };
    });
  };

  const handleSpecializationClick = (spec) => {
    handleFilterChange("specialization", spec);
  };

  const applyFilters = () => {
    fetchNearbyDoctors();
  };

  const bookDoctor = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ① HERO BANNER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white sticky top-0 z-40 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Hello, {user.name}! 👋
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors or specializations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={applyFilters}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100"
            >
              Search
            </button>
          </div>

          {/* GPS Location Badge */}
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>📍 Your Location · 12.9° N, 77.5° E</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDEBAR - FILTERS */}
          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } lg:block lg:col-span-1 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24`}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5" />
              <h3 className="text-lg font-bold">Filters</h3>
            </div>

            {/* Specialization */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold mb-3">
                Specialization
              </label>
              <select
                value={filters.specialization}
                onChange={(e) =>
                  handleFilterChange("specialization", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-600"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Distance */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold mb-3">
                Distance: {filters.distance} km
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={filters.distance}
                onChange={(e) =>
                  handleFilterChange("distance", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>

            {/* Max Fee */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold mb-3">
                Max Fee: ₹{filters.maxFee}
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={filters.maxFee}
                onChange={(e) =>
                  handleFilterChange("maxFee", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>

            {/* Gender */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold mb-3">Gender</label>
              <div className="space-y-2">
                {["any", "male", "female"].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => handleFilterChange("gender", gender)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition ${
                      filters.gender === gender
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Rating */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold mb-3">
                Min Rating
              </label>
              <div className="space-y-2">
                {["any", "3+", "4+", "4.5+"].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange("minRating", rating)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition ${
                      filters.minRating === rating
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {rating === "any" ? "Any Rating" : `${rating} Stars`}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold mb-3">
                Availability
              </label>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    handleFilterChange(
                      "availableToday",
                      !filters.availableToday,
                    )
                  }
                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition ${
                    filters.availableToday
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Available Today
                </button>
                <button
                  onClick={() =>
                    handleFilterChange("onlineConsult", !filters.onlineConsult)
                  }
                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition ${
                    filters.onlineConsult
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Online Consult
                </button>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">
                Languages
              </label>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition text-left ${
                      filters.languages.includes(lang)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ✓ {lang}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              Apply Filters
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-8">
            {/* ② SPECIALIZATION PICKER */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">
                Browse by Specialization
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {specializations.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => handleSpecializationClick(spec.id)}
                    className={`p-4 rounded-lg text-center transition ${
                      filters.specialization === spec.id
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 hover:bg-indigo-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{spec.icon}</div>
                    <p className="text-sm font-semibold">{spec.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ③ AI BANNER */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  🤖 AI Health Assistant
                </h3>
                <p className="text-sm">
                  Get instant health advice, symptom checking, and personalized
                  recommendations
                </p>
              </div>
              <button
                onClick={() => navigate("/ai-chat")}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 whitespace-nowrap"
              >
                Chat Now
              </button>
            </div>

            {/* ④ UPCOMING APPOINTMENTS */}
            {appointments.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">
                  Your Upcoming Appointments
                </h2>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt._id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          Dr. {apt.doctorName}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {apt.date} at {apt.time}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              apt.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {apt.status.charAt(0).toUpperCase() +
                              apt.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                          <Phone className="w-5 h-5 text-indigo-600" />
                        </button>
                        <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                          <Video className="w-5 h-5 text-indigo-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TOP BAR - SEARCH & SORT */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-600">
                Found {doctors.length} doctors
              </div>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  applyFilters();
                }}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-600"
              >
                <option value="nearest">Nearest First</option>
                <option value="toprated">Top Rated</option>
                <option value="fee_low">Fee: Low to High</option>
                <option value="fee_high">Fee: High to Low</option>
              </select>
            </div>

            {/* ⑤ NEARBY DOCTORS */}
            <div>
              <h2 className="text-xl font-bold mb-4">Nearby Doctors</h2>
              {doctors.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No doctors found matching your filters
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl">
                          👨‍⚕️
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              Dr. {doctor.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {doctor.specialization}
                            </p>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Heart className="w-5 h-5 text-red-500" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3 text-sm">
                          <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold">
                              {doctor.rating}/5 ({doctor.reviews} reviews)
                            </span>
                          </span>
                          <span className="flex items-center space-x-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{doctor.distance} km away</span>
                          </span>
                          <span className="flex items-center space-x-1 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span>₹{doctor.fee}</span>
                          </span>
                        </div>

                        {doctor.onlineConsult && (
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                            📹 Video Consult Available
                          </span>
                        )}

                        <p className="text-sm text-gray-700 mb-3">
                          Next available:{" "}
                          <span className="font-semibold">
                            {doctor.nextSlot}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => bookDoctor(doctor._id)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 whitespace-nowrap"
                        >
                          Book Now
                        </button>
                        <button className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ⑥ HEALTH SNAPSHOT */}
            {healthData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Your Health Snapshot</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Blood Pressure</p>
                    <p className="text-2xl font-bold text-red-600">
                      {healthData.bloodPressure}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Normal</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Blood Sugar</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {healthData.bloodSugar}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">mg/dL</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Last Checkup</p>
                    <p className="text-xl font-bold text-blue-600">
                      {healthData.lastCheckup}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">days ago</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">
                      Active Medicines
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {healthData.activeMedicines}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">ongoing</p>
                  </div>
                </div>
              </div>
            )}

            {/* ⑦ NEARBY PHARMACIES */}
            {pharmacies.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Nearby Pharmacies</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pharmacies.map((pharmacy) => (
                    <div
                      key={pharmacy._id}
                      className="p-4 border rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {pharmacy.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            📍 {pharmacy.distance} km away
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            pharmacy.open
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {pharmacy.open ? "Open" : "Closed"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        📞 {pharmacy.phone}
                      </p>
                      <button
                        onClick={() => navigate("/medicines")}
                        className="w-full py-2 px-3 bg-indigo-100 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-200 text-sm"
                      >
                        View Medicines
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ⑧ DAILY HEALTH TIPS */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Daily Health Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">
                    💧 Stay Hydrated
                  </p>
                  <p className="text-sm text-gray-700">
                    Drink 8-10 glasses of water daily to maintain good health
                    and energy levels.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">
                    🏃 Exercise Daily
                  </p>
                  <p className="text-sm text-gray-700">
                    Try to get 30 minutes of physical activity daily to
                    strengthen your heart and muscles.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">
                    😴 Quality Sleep
                  </p>
                  <p className="text-sm text-gray-700">
                    Your last checkup was 15 days ago. Maintain 7-9 hours of
                    sleep daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex justify-around items-center px-4 py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition ${
              activeTab === "home"
                ? "text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("search")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition ${
              activeTab === "search"
                ? "text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs mt-1">Search</span>
          </button>

          <button
            onClick={() => navigate("/bookings")}
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-gray-900 transition"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Bookings</span>
          </button>

          <button
            onClick={() => navigate("/ai-chat")}
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-gray-900 transition"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">AI Chat</span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-gray-900 transition"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>

      {/* Add padding for bottom nav on mobile */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}

export default PatientHome;
