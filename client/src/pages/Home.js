// client/src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

const Home = () => {
  const [books, setBooks] = useState([]);
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

  return (
    <div>
      <section style={styles.hero}>
        <h1 style={styles.heading}>Welcome to BookNest Library</h1>
        <p style={styles.subheading}>
          Discover, view, and manage books through our full-stack web
          application.
        </p>
      </section>

      <h2 style={styles.sectionTitle}>Available Books</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div style={styles.grid}>
          {books.map((book) => (
            <div key={book._id} style={styles.card}>
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
                <strong>Status:</strong>{" "}
                <span style={{ color: book.available ? "green" : "red" }}>
                  {book.available ? "Available" : "Borrowed"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  hero: {
    marginBottom: "2rem",
    padding: "1.5rem",
    backgroundColor: "#f4f4ff",
    borderRadius: "8px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subheading: {
    fontSize: "1rem",
    color: "#555",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    backgroundColor: "#fff",
  },
};

export default Home;
