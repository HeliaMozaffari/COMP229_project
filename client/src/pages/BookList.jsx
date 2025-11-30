// client/src/pages/BookList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../api/bookApi';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error('Error loading books', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await deleteBook(id);
      loadBooks();
    } catch (err) {
      console.error('Error deleting book', err);
    }
  };

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      <h2>Books</h2>
      <Link to="/books/new">+ Add New Book</Link>
      <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              {book.genre && (
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
              )}
              <p>
                <strong>Status:</strong>{' '}
                <span style={{ color: book.available ? 'green' : 'red' }}>
                  {book.available ? 'Available' : 'Borrowed'}
                </span>
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Link to={`/books/${book._id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
