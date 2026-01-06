import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ navigation hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);

      // ✅ optional success message
      alert(res.data.message);

      // ✅ redirect to root route after login
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-white/80 text-center mb-6">
          Login to your account
        </p>

        {/* Username */}
        <input
          name="username"
          onChange={handleChange}
          required
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full px-4 py-3 mb-6 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-white/80 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="underline hover:text-white font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
