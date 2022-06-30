const router = require('express').Router();
// Controller
const {
  createCategory,
  listCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.Controller');
// Middleware
const { auth, adminCheck } = require('../middleware/auth.Middleware');

//@Enpoint  http://localhost:5000/api/category
//@Method   POST
//@Access   Private
router.post('/category', auth, adminCheck, createCategory);

//@Enpoint  http://localhost:5000/api/category
//@Method   GET
//@Access   Private
router.get('/category', listCategory);

//@Enpoint  http://localhost:5000/api/category/:id
//@Method   GET
//@Access   Private
router.get('/category/:id', auth, adminCheck, readCategory);

//@Enpoint  http://localhost:5000/api/category/:id
//@Method   PUT
//@Access   Private
router.put('/category/:id', auth, adminCheck, updateCategory);

//@Enpoint  http://localhost:5000/api/category/:id
//@Method   DELETE
//@Access   Private
router.delete('/category/:id', auth, adminCheck, deleteCategory);

module.exports = router;
