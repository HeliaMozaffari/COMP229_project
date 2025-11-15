require('dotenv').config();
const connectDB = require('./src/config/db').default;
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// connect to DB then start server
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});