import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ShieldUser } from "lucide-react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast.success("Login successful!");
      navigate("/admin");
    } else {
      toast.error("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-200">
      <div className="flex flex-col items-center w-full max-w-2xl p-8">
        <ShieldUser className="w-20 h-20 text-yellow-500 animate-bounce mb-4" />
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">Sign in to your admin dashboard</p>

        <form
          onSubmit={handleLogin}
          className="bg-white w-full rounded-3xl shadow-2xl p-10 flex flex-col gap-6 transition-all hover:shadow-3xl"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-500 text-white p-4 rounded-xl font-semibold transition transform hover:scale-105 hover:bg-yellow-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        
        </form>

        <p className="mt-6 text-gray-500">
          &copy; {new Date().getFullYear()} Unnati Admin Portal
        </p>
      </div>
    </div>
  );
};
