// routes/bookRoutes.js
const express = require("express");
const router = express.Router();

// SIMPLE IN-MEMORY "DATABASE"
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", genre: "Programming", available: true },
  { id: 2, title: "You Don’t Know JS", author: "Kyle Simpson", genre: "JavaScript", available: false },
  { id: 3, title: "Design Patterns", author: "GoF", genre: "Software Engineering", available: true },
];

let nextId = 4;

// READ ALL BOOKS (GET /api/books)
router.get("/", (req, res) => {
  res.json(books);
});

// READ ONE BOOK (GET /api/books/:id)
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// CREATE BOOK (POST /api/books)
router.post("/", (req, res) => {
  const { title, author, genre, available } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    genre: genre || "",
    available: available !== undefined ? available : true,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// UPDATE BOOK (PUT /api/books/:id)
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, genre, available } = req.body;
  const existing = books[bookIndex];

  books[bookIndex] = {
    ...existing,
    title: title ?? existing.title,
    author: author ?? existing.author,
    genre: genre ?? existing.genre,
    available: available ?? existing.available,
  };

  res.json(books[bookIndex]);
});

// DELETE BOOK (DELETE /api/books/:id)
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deleted = books[bookIndex];
  books = books.filter((b) => b.id !== id);

  res.json({ message: "Book deleted", book: deleted });
});

module.exports = router;
