import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from './bookService';

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling on unmount
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    bookService.getBookById(id)
      .then(res => setBook(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load book for editing');
      });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await bookService.updateBook(
        id,
        book.title,
        book.author,
        book.genre,
        book.publication_year
      );
      alert('Book updated successfully');
      navigate(`/books/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update book');
    }
  };

  // Styles
  const wrapperStyle = {
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '5px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#008080',
  };

  const formGroupStyle = {
    marginBottom: '7px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
  };

  const inputStyle = {
    width: '97%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#008080',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 40px',
    background: '#008080',
    color: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
    height: '30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const navStyle = {
    position: 'absolute',
    right: '40px',
  };

  const buttonStyle1 = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: '#008080',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
  };

  const h1Style = {
    textAlign: 'center',
    fontSize: '28px',
    color: '#fff',
    marginBottom: '30px',
  };

  if (error) return <div>{error}</div>;

  return (
    <div style={wrapperStyle}>
      <header style={headerStyle}>
        <h1 style={h1Style}>Update Book</h1>
        <nav style={navStyle}>
          <button style={buttonStyle1} onClick={() => navigate('/')}>
            Home
          </button>
        </nav>
      </header>

      <div style={containerStyle}>
        <h2 style={headingStyle}>Edit Book</h2>
        <form onSubmit={handleUpdate}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Genre</label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Publication Year</label>
            <input
              type="number"
              name="publication_year"
              value={book.publication_year}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditBookPage;
