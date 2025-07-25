 

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await signup(
      formData.username,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/books");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white shadow-2xl rounded-xl p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 transition"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Field
              id="username"
              type="text"
              icon={<User className="h-5 w-5 text-gray-400" />}
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              label="Username"
            />
            <Field
              id="email"
              type="email"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              label="Email"
            />
            <Field
              id="password"
              type="password"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              label="Password"
            />
            <Field
              id="confirmPassword"
              type="password"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              label="Confirm Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// ⬇️ Reusable input field component
const Field = ({ id, type, icon, value, onChange, placeholder, label }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="input-field pl-10"
        placeholder={placeholder}
      />
    </div>
  </div>
);
