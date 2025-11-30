// client/src/pages/BooksAdmin.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

const BooksAdmin = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    _id: null,
    title: "",
    author: "",
    genre: "",
    available: true,
  });
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        // UPDATE
        await axios.put(`${API_URL}/${form._id}`, form);
      } else {
        // CREATE
        await axios.post(API_URL, form);
      }
      setForm({
        _id: null,
        title: "",
        author: "",
        genre: "",
        available: true,
      });
      loadBooks();
    } catch (err) {
      console.error(err);
      alert("Error saving book");
    }
  };

  const handleEdit = (book) => {
    setForm({
      _id: book._id,
      title: book.title,
      author: book.author,
      genre: book.genre || "",
      available: book.available,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      loadBooks();
    } catch (err) {
      console.error(err);
      alert("Error deleting book");
    }
  };

  return (
    <div>
      <h2>Manage Books (Full CRUD)</h2>

      {/* Create / Update form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <h3>{form._id ? "Edit Book" : "Add New Book"}</h3>
        <div>
          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Genre
            <input
              name="genre"
              value={form.genre}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Available
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <button type="submit">
          {form._id ? "Update Book" : "Create Book"}
        </button>
      </form>

      {/* List of books */}
      <h3>All Books</h3>
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books yet.</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.available ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksAdmin;
