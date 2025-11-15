const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { title: 'BookNest  First Release' });
});

module.exports = app;
