import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from './bookService';

function GenrePage() {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch books based on genre
    bookService.getBooksByGenre(genre)
      .then(response => {
        console.log('Books fetched:', response.data);
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching books by genre.');
        setLoading(false);
        console.error('Error:', error);
      });
  }, [genre]);

  // Styles
  const bookBoxStyle = {
    width: '20%',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '15px 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#008080',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s',
    textAlign: 'center',
  };

  const bookContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'space-around',
    padding: '30px',
    backgroundColor: '#f9f9f9',
  };

  const viewButtonStyle = {
    padding: '6px 14px',
    backgroundColor: '#008080',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  };

  const headerStyle = {
    position: 'relative',
    height: '80px',
    backgroundColor: '#008080',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    justifyContent: 'flex-end',
    padding: '0 20px',
  };

  const titleStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '40px',
    fontWeight: 'bold',
    margin: 0,
  };

 const homeButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#008080',
  color: '#fff',
  border: 'none',            // No visible border
  outline: 'none',           // Removes focus outline (especially for accessibility testing)
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};



  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>{capitalize(genre)} Books</h1>
        <button
          onClick={() => navigate('/')}
          style={homeButtonStyle}
        >
          Home
        </button>
      </header>

      {/* Book Grid */}
      <main style={bookContainerStyle}>
        {books.length > 0 ? books.map((book) => (
          <div
            key={book.id}
            style={bookBoxStyle}
            onClick={() => navigate(`/books/${book.id}`)}
          >
            <h3 style={{ marginBottom: '10px' }}>{book.title}</h3>
            <button
              style={viewButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/books/${book.id}`);
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#006666'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#008080'}
            >
              View
            </button>
          </div>
        )) : <p>No books found in this genre.</p>}
      </main>
    </div>
  );
}

export default GenrePage;
