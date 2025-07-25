 
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"
import { MessageSquare, User } from "lucide-react";

const BookDetail = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
   const { user } = useAuth()

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        // `http://localhost:5000/api/books/${id}/reviews`,
        {
          book: id,
          rating,
          review_text: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviewText("");
      setRating(0);
      fetchBook();
      fetchReviews()
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/book/${id}`)
      setReviews(response.data.reviews)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setReviewsLoading(false)
    }
  }

  useEffect(() => {
fetchReviews();
  },[])

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={18}
          color={index < rating ? "#fbbf24" : "#d1d5db"}
        />
      ))}
    </div>
  );

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  
  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
        <Link to="/books" className="btn-primary">
          Back to Books
        </Link>
      </div>
    )
  }
console.log(reviews);
console.log(user);


  const userHasReviewed = reviews.some((review) => review?.reviewer?._id === user?.user?.id)
console.log(userHasReviewed);


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="card">
        {/* Book Cover */}
        <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-inner border border-indigo-300">
          {book.imageUrl ? (
            <img src={book?.imageUrl} alt={book?.title} className="h-full object-contain rounded-lg" />
          ) : (
            <span className="text-gray-400 text-xl">No Cover Image</span>
          )}
        </div>

        {/* Book Info */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-gray-800">{book?.title}</h2>
          <p className="text-gray-600 text-lg mt-1">by {book?.author}</p>
        </div>

        {/* Description */}
        {book.description && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b pb-1">Description</h3>
            <p className="text-gray-700 leading-relaxed">{book?.description}</p>
          </div>
        )}

        {/* Submit Review */}
        

        {/* Reviews */}
        {/* {book.reviews?.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
            <div className="space-y-4">
              {book.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border-b border-gray-200 pb-6 last:border-b-0 hover:bg-gray-50 rounded-lg px-4 py-3 transition duration-200"
                >
                  {review.rating && (
                    <div className="mb-2">
                      <StarRating rating={review.rating} />
                    </div>
                  )}
                  <p className="text-gray-800">{review.review_text || review.text}</p>
                  <span className="block text-sm text-gray-500 mt-2">
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )} */}

              {userHasReviewed ? (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2 text-blue-800">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">You have already reviewed this book</span>
          </div>
        </div>
      ):(
<div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmitReview}>
            {/* Star Rating Input */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, index) => {
                const value = index + 1;
                return (
                  <label key={value}>
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      onClick={() => setRating(value)}
                      className="hidden"
                    />
                    <FaStar
                      size={28}
                      className="cursor-pointer transition"
                      color={value <= (hover || rating) ? "#fbbf24" : "#d1d5db"}
                      onMouseEnter={() => setHover(value)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>

            <textarea
              className="input-field resize-none min-h-[120px] bg-gray-50"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              <Link to="/books" className="btn-secondary w-full sm:w-auto text-center">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}

      {/* Reviews Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews ({reviews.length})</h2>

        {reviewsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600">Be the first to share your thoughts about this book!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews?.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{review?.reviewer?.username}</span>
                    </div>
                    <StarRating rating={review.rating} readonly size="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(review?.createdAt)}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review?.review_text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default BookDetail;
