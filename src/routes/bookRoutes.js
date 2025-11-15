const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// public
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// admin-only
router.post('/', requireAuth, requireAdmin, bookController.createBook);
router.put('/:id', requireAuth, requireAdmin, bookController.updateBook);
router.delete('/:id', requireAuth, requireAdmin, bookController.deleteBook);

module.exports = router;
