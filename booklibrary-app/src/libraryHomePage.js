import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 40px',
    background: '#008080',
    color: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
    height: '80px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  const navStyle = {
    position: 'absolute',
    right: '40px',
  };

  const buttonStyle = {
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

  const mainStyle = {
    padding: '20px 40px',
    backgroundColor: '#fdfcfb',
    height: 'calc(100vh - 80px)',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const h1Style = {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '30px',
    color: '#333',
  };

  const boxContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  };

  const topicBoxStyle = {
    width: '20%',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#008080',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s',
  };

  const imageStyle = {
    width: '250px',
    height: '250px',
    marginBottom: '10px',
    borderRadius: '8px',
    objectFit: 'cover',
  };

  const topics = [
    {
      name: 'Fiction',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    },
    {
      name: 'Science',
      image: 'https://img.lovepik.com/photo/50035/7427.jpg_wh300.jpg',
    },
    {
      name: 'History',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    },
    {
      name: 'Philosophy',
      image: 'https://media.istockphoto.com/id/1203765060/photo/philosophy-words-from-wooden-blocks-with-letters.jpg?s=612x612&w=0&k=20&c=zUqMk7Nf2_KU3YDT4b7-zfE1SHHyKySErDhe4H2zCAE=',
    },
  ];

  return (
    <div>
      <header style={headerStyle}>
        <div style={logoStyle}>📚 Book Library</div>
        <nav style={navStyle}>
          <button style={buttonStyle} onClick={() => navigate('/addbook')}>
            + Add Book
          </button>
        </nav>
      </header>

      <main style={mainStyle}>
        <h1 style={h1Style}>Browse Book Genres</h1>
        <section style={boxContainerStyle}>
          {topics.map((topic, index) => (
            <div
              key={index}
              style={topicBoxStyle}
              onClick={() => navigate(`/genre/${topic.name.toLowerCase()}`)} // ✅ Updated line to navigate by genre
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <img src={topic.image} alt={topic.name} style={imageStyle} />
              <span>{topic.name}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
