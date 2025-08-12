import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UnnatiId, setUnnatiId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const signup = useAuthStore((state) => state.signup);
  const isSigninUp = useAuthStore((state) => state.isSigninUp);
  const navigate = useNavigate();

  // Generate year options from 2023 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => 2023 + i
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await signup({ name, email, password, UnnatiId, year });

    if (success) {
      navigate("/user");
    } else {
      alert("Registration failed. Try a different email.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="p-6 max-w-md mx-auto bg-white rounded-md shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Unnati ID"
        className="w-full mb-3 p-2 border rounded"
        value={UnnatiId}
        onChange={(e) => setUnnatiId(e.target.value)}
        required
      />

      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-full mb-4 p-2 border rounded"
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
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isSigninUp ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
