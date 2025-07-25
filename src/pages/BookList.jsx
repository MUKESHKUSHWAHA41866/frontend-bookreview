 

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import StarRating from "../components/StarRating"
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import axios from "axios"

const BookList = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    author: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })
  const [genres, setGenres] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    fetchBooks()
    fetchGenres()
    fetchAuthors()
  }, [filters, pagination.currentPage])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...filters,
      })
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/books?${params}`)
      console.log(response);
      
      setBooks(response.data.books)
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      })
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/books/meta/genres`)
      setGenres(response.data)
    } catch (error) {
      console.error("Error fetching genres:", error)
    }
  }

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/books/meta/authors`)
      console.log(response);
      
      setAuthors(response.data)
    } catch (error) {
      console.error("Error fetching authors:", error)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      genre: "",
      author: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    })
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  return (
    <div className="space-y-8 px-4 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📚 Book Library</h1>
          <p className="text-gray-600 mt-1">Explore and review books — {pagination.total} total found.</p>
        </div>
        <Link to="/add-book" className="btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" />
          <span>Add Book</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="card space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Genre */}
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
            className="input-field"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {/* Author */}
          <select
            value={filters.author}
            onChange={(e) => handleFilterChange("author", e.target.value)}
            className="input-field"
          >
            <option value="">All Authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          {/* Sort Options */}
          <div className="flex gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="input-field w-full"
            >
              <option value="createdAt">Date Added</option>
              <option value="averageRating">Rating</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              className="input-field w-20"
            >
              <option value="desc">↓</option>
              <option value="asc">↑</option>
            </select>
          </div>
        </div>

        {/* Clear filters */}
        {(filters.search || filters.genre || filters.author) && (
          <div className="pt-2 border-t mt-4 text-sm">
            <button onClick={clearFilters} className="text-primary-600 hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse h-64 space-y-4">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">No books found</h3>
          <p className="text-gray-500 mb-4">Try a different search or add a new book.</p>
          <Link to="/add-book" className="btn-primary">Add First Book</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link
              key={book._id}
              to={`/books/${book._id}`}
              className="card group hover:shadow-xl transition-shadow"
            >
              {/* <div className="w-full h-40 rounded-md bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-xl font-bold text-primary-700">
                {book.title.charAt(0)}
              </div> */}
              {book.imageUrl ? (
  <img
    src={book.imageUrl}
    alt={book.title}
    className="w-full h-40 object-cover rounded-md"
  />
) : (
  <div className="w-full h-40 rounded-md bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-xl font-bold text-primary-700">
    {book.title.charAt(0)}
  </div>
)}
              <div className="mt-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">{book.genre}</span>
                  {book.averageRating > 0 && (
                    <StarRating rating={book.averageRating} readonly size="w-4 h-4" />
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {book.totalReviews} review{book.totalReviews !== 1 ? "s" : ""}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(pagination.totalPages)].map((_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded text-sm ${
                  page === pagination.currentPage
                    ? "bg-primary-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          })}

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default BookList
