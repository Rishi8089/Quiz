import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ add this

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);

      // optional message
      alert(res.data.message);

      // ✅ redirect to root route after successful registration
      navigate("/quizlist");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account 🚀
        </h2>
        <p className="text-sm text-white/80 text-center mb-6">
          Sign up to get started
        </p>

        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-3 mb-6 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
        >
          Register
        </button>

        <p className="text-center text-white/80 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="underline hover:text-white font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
