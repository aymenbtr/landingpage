"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, User, Home, Phone, Mail, Calendar, Loader, CheckCircle, ShoppingCart, ArrowRight } from "lucide-react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    telephoneNumber: "",
    email: "",
    dateOfBirth: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const allFieldsFilled = Object.values(formData).every((field) => field.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone) => /^[0-9]+$/.test(phone);

    if (!allFieldsFilled) {
      alert("Please fill out all fields.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(formData.telephoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    setShowAnimation(true);

    try {
      const response = await axios.post("http://localhost:5000/api/people", formData);
      console.log("Response:", response.data);
      setTimeout(() => {
        setSubmitted(true);
        setShowAnimation(false);
      }, 1500); // Show animation for 1.5 seconds
    } catch (error) {
      console.error("Failed to submit form", error.response?.data || error.message);
      alert("Failed to save user data. Please try again.");
      setShowAnimation(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    router.push("/cardpayment");
  };

  return (
      
      <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-blue-100 to-teal-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          User Information
        </h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <h2 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Personal Details
          </h2>

          <div className="p-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-semibold text-green-600 mb-6">
                  Information has been sent!
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mx-auto"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Previous form fields remain the same */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                        required
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                        required
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                      required
                    />
                    <Home className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telephone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="telephoneNumber"
                      value={formData.telephoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your telephone number"
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                      required
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                      required
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                      required
                    />
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      {showAnimation ? (
                        <ArrowRight className="w-5 h-5 animate-[moveRight_1.5s_ease-in-out]" />
                      ) : (
                        <Loader className="w-5 h-5 animate-spin" />
                      )}
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Information</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default LoginForm;