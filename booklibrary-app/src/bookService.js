import axios from 'axios';

const API_URL = 'http://localhost:8989'; // Backend API URL

const bookService = {
  // ✅ Get all books
  getAllBooks: () => {
    return axios.get(`${API_URL}/books`);
  },

  // ✅ Add a new book
  addBook: (title, author, genre, publication_year, category) => {
    return axios.post(`${API_URL}/books`, { title, author, genre, publication_year, category });
  },

  // ✅ Update an existing book by ID
  updateBook: (id, title, author, genre, publication_year, category) => {
    return axios.put(`${API_URL}/books/${id}`, { title, author, genre, publication_year, category });
  },

  // ✅ Delete a book by ID
  deleteBook: (id) => {
    return axios.delete(`${API_URL}/books/${id}`);
  },

  // ✅ Get books by genre
  getBooksByGenre: (genre) => {
  return axios.get(`${API_URL}/books/genre/${genre}`);
},


  // ✅ Get a book by ID
  getBookById: (id) => {
    return axios.get(`${API_URL}/books/${id}`);
  },
};

export default bookService;
