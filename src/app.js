// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Static files (for CSS, logo, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Dummy data for now – later you can load from DB
const sampleBooks = [
  { title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming', available: true },
  { title: 'You Don’t Know JS', author: 'Kyle Simpson', genre: 'JavaScript', available: false },
  { title: 'Design Patterns', author: 'GoF', genre: 'Software Engineering', available: true }
];

// Home / Landing Page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'BookNest – First Release',
    siteName: 'BookNest Library',
    books: sampleBooks
  });
});

// Sign In page
app.get('/signin', (req, res) => {
  res.render('signin', {
    title: 'Sign In – BookNest',
    siteName: 'BookNest Library'
  });
});

// Sign Up page
app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up – BookNest',
    siteName: 'BookNest Library'
  });
});

module.exports = app;
