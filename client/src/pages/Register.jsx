import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserPlus } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UnnatiId, setUnnatiId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const signup = useAuthStore((state) => state.signup);
  const isSigninUp = useAuthStore((state) => state.isSigninUp);
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2023 + 1 }, (_, i) => 2023 + i);

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await signup({ name, email, password, UnnatiId, year });

    if (success) {
      toast.success("Registration successful!");
      navigate("/user");
    } else {
      toast.error("Registration failed. Try a different email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-200 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center gap-4">
        <UserPlus className="w-14 h-14 text-yellow-500 mb-1" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 text-center">
          Create Account
        </h1>
        <p className="text-gray-600 mb-4 text-center text-sm sm:text-base">
          Fill in your details to get started
        </p>

        <form className="w-full flex flex-col gap-3" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Unnati ID"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-gray-700"
            value={UnnatiId}
            onChange={(e) => setUnnatiId(e.target.value)}
            required
          />

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-gray-700"
            required
          >
            <option value="">Select Year</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isSigninUp}
            className={`w-full bg-yellow-500 text-white py-2 sm:py-3 rounded-lg font-semibold transition transform hover:scale-105 hover:bg-yellow-600 ${
              isSigninUp ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSigninUp ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-3 text-gray-500 text-center text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Unnati Portal
        </p>
      </div>
    </div>
  );
};

export default Register;
