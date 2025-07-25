

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, User, Tag, FileText, Image } from "lucide-react";
import axios from "axios";

const AddBook = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/books", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate(`/books/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Back Button */}
        <Link to="/books" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Books</span>
        </Link>

        {/* Header */}
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          <p className="text-gray-500 mt-1">Share a great book with the community</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field
            id="title"
            label="Book Title *"
            icon={<BookOpen className="h-5 w-5 text-gray-400" />}
            placeholder="Enter the book title"
            value={formData.title}
            onChange={handleChange}
          />
          <Field
            id="author"
            label="Author *"
            icon={<User className="h-5 w-5 text-gray-400" />}
            placeholder="Enter the author's name"
            value={formData.author}
            onChange={handleChange}
          />
          <Field
            id="genre"
            label="Genre *"
            icon={<Tag className="h-5 w-5 text-gray-400" />}
            placeholder="e.g., Fiction, Sci-Fi, Romance"
            value={formData.genre}
            onChange={handleChange}
          />
          <Field
            id="description"
            label="Description (Optional)"
            isTextArea
            icon={<FileText className="h-5 w-5 text-gray-400" />}
            placeholder="Brief description of the book"
            value={formData.description}
            onChange={handleChange}
          />

          <Field
  id="imageUrl"
  label="Cover Image URL (Optional)"
  icon={<Image className="h-5 w-5 text-gray-400" />}
  placeholder="https://example.com/cover.jpg"
  value={formData.imageUrl}
  onChange={handleChange}
/>

{formData.imageUrl && (
  <div className="mt-2">
    <img
      src={formData.imageUrl}
      alt="Book Cover Preview"
      className="w-32 h-auto rounded shadow-md border"
    />
  </div>
)}


          {/* Buttons */}
          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
            <Link to="/books" className="flex-1 btn-secondary text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

const Field = ({ id, label, icon, value, onChange, placeholder, isTextArea = false }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </span>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="textarea-field pl-12"
        />
      ) : (
        <input
          id={id}
          name={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="input-field pl-12"
        />
      )}
    </div>
  </div>
);
