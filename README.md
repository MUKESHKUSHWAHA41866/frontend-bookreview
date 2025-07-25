# Book Review Platform

A full-stack web application built with **React.js** and **Node.js** that allows users to discover, review, and rate books.

for frontend 

 download the file 

 and  do npm i

 npm run dev

 for backend 
 
 download the file 

 do npm i

 npm run dev


## 🚀 Features

### 🔐 Authentication
- User registration and login with JWT
- Protected routes for authenticated users only
- Secure password hashing with bcrypt

### 📚 Book Management
- Add new books to the platform
- View paginated list of all books
- Filter books by genre and author
- Search books by title, author, or genre
- Sort books by date added, rating, title, or author

### ⭐ Review System
- Write reviews and rate books (1-5 stars)
- View all reviews for each book
- Visual star rating display
- Average rating calculation
- One review per user per book

### 🎨 User Interface
- Responsive design with Tailwind CSS
- Clean and modern UI components
- Loading states and error handling
- Pagination for better performance

## 🛠️ Tech Stack

### Frontend
- **React 18** (Create React App)
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- 

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

 
 
 

## 🚀 Setup Instructions
 
### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd book-review-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm i
   \`\`\`

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/bookreview
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   CLIENT_URL=http://localhost:3000
   \`\`\`

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

5. **Run the application**
   \`\`\`bash
   # Run both frontend and backend
   npm run dev
   \`\`\`

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get all books (with filtering and pagination)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add new book (protected)
- `GET /api/books/meta/genres` - Get unique genres
- `GET /api/books/meta/authors` - Get unique authors

### Reviews
- `GET /api/reviews/book/:bookId` - Get reviews for a book
- `POST /api/reviews` - Add review (protected)

## 🎯 Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm run install-deps
   \`\`\`

2. **Set up your environment variables**

3. **Start the development servers:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open http://localhost:3000 and start using the app!**

## 📝 License

This project is licensed under the MIT License.
