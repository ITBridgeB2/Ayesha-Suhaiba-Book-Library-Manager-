import cors from 'cors';
import express from 'express';
import mysql from 'mysql2/promise';

const bookapp = express();

bookapp.use(express.json());
bookapp.use(express.urlencoded({ extended: true }));
bookapp.use(cors());

// Create DB connection
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'itbridge',
});

// Connect to the database
console.log('Connecting to MySQL database...');
try {
  await db.connect();
  console.log('Connected to MySQL database.');
} catch (err) {
  console.error('Database connection failed:', err);
  process.exit(1); // Exit the process if the database connection fails
}

// Create a new book
bookapp.post('/books', async (req, res) => {
  const { title, author, genre, publication_year } = req.body;
  const sql = 'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.execute(sql, [title, author, genre, publication_year]);
    res.status(201).json({ id: result.insertId, message: 'Book added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Insert failed' });
  }
});

// Get all books
bookapp.get('/books', async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM books');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get books by genre (e.g., when clicking on a genre on the HomePage)
bookapp.get('/books/genre/:genre', async (req, res) => {
  const { genre } = req.params;

  try {
    const [results] = await db.execute('SELECT * FROM books WHERE genre = ?', [genre]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching books by genre:', err); // helpful for debugging
    res.status(500).json({ error: 'Failed to fetch books by genre' });
  }
});


// Get a book by ID
bookapp.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
    if (results.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Update a book by ID
bookapp.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_year } = req.body;
  const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?';
  try {
    await db.execute(sql, [title, author, genre, publication_year, id]);
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete a book by ID
bookapp.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM books WHERE id = ?', [id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Start server
bookapp.listen('8989')
  console.log(`Server running on 8989`);

