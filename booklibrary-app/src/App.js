import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './libraryHomePage';
import AddBook from './addBook';
import GenrePage from './bookCategoryPage'; 
import BookDetailPage from './bookDetailPage';
import EditBookPage from './bookEditPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
       <Route path="/genre/:genre" element={<GenrePage />} />
       <Route path="/edit/:id" element={<EditBookPage />} />
       </Routes>
    </Router>
  );
}

export default App;
