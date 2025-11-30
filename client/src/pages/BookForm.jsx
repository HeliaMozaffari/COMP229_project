// client/src/pages/BookForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBook, updateBook } from '../api/bookApi';

const BookForm = () => {
  const { id } = useParams(); // if id exists -> edit mode
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    available: true,
  });

  const [loading, setLoading] = useState(false);

  // If editing, load existing book
  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getBook(id);
        setForm({
          title: data.title || '',
          author: data.author || '',
          genre: data.genre || '',
          available: data.available ?? true,
        });
      } catch (err) {
        console.error('Error loading book', err);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await updateBook(id, form); // UPDATE
      } else {
        await createBook(form); // CREATE
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving book', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={{ display: 'block', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>
            Author
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              style={{ display: 'block', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>
            Genre
            <input
              type="text"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              style={{ display: 'block', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />{' '}
            Available
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
