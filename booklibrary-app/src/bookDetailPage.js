import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from './bookService';

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    bookService.getBookById(id)
      .then(res => setBook(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load book details');
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      bookService.deleteBook(id)
        .then(() => {
          alert('Book deleted successfully');
          navigate('/');
        })
        .catch(err => {
          console.error(err);
          alert('Failed to delete book');
        });
    }
  };

  const headerStyle = {
    padding: '20px',
    backgroundColor: '#008080',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const containerStyle = {
    padding: '30px',
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
  };

  const detailBoxStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    color: '#333',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#555',
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0077cc',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#cc0000',
  };

  if (error) return <div>{error}</div>;
  if (!book) return <div>Loading book details...</div>;

  return (
    <div>
      {/* Header */}
      <header style={headerStyle}>
        <h1>Book Details</h1>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#006666',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Home
        </button>
      </header>

      {/* Book Detail Box */}
      <div style={containerStyle}>
        <div style={detailBoxStyle}>
          <div>
            <span style={labelStyle}>Title:</span> {book.title}
          </div>
          <div>
            <span style={labelStyle}>Author:</span> {book.author}
          </div>
          <div>
            <span style={labelStyle}>Genre:</span> {book.genre} {/* Updated to genre */}
          </div>
          <div>
            <span style={labelStyle}>Publication Year:</span> {book.publication_year}
          </div>
          

          

          {/* Buttons */}
          <div style={buttonGroupStyle}>
            <button
              style={editButtonStyle}
              onClick={() => navigate(`/edit/${book.id}`)}
            >
              Edit
            </button>
            <button
              style={deleteButtonStyle}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
