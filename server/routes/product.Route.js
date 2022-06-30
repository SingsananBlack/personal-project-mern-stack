const router = require('express').Router();
//Controller
const {
  createProduct,
  listProduct,
  deleteProduct,
  readProduct,
  updateProduct,
  productOrderBy,
  searchFilters
} = require('../controllers/product.Controller');
// Middleware
const { auth, adminCheck } = require('../middleware/auth.Middleware');

//@Enpoint  http://localhost:5000/api/product
//@Method   POST
//@Access   Private
router.post('/product', auth, adminCheck, createProduct);

//@Enpoint  http://localhost:5000/api/products/:count
//@Method   GET
//@Access   Private
router.get('/products/:count', listProduct);

//@Enpoint  http://localhost:5000/api/product/:id
//@Method   GET
//@Access   Private
router.get('/product/:id', readProduct);

//@Enpoint  http://localhost:5000/api/product/:id
//@Method   PUT
//@Access   Private
router.put('/product/:id', auth, adminCheck, updateProduct);

//@Enpoint  http://localhost:5000/api/product/:id
//@Method   DELETE
//@Access   Private
router.delete('/product/:id', auth, adminCheck, deleteProduct);

//@Enpoint  http://localhost:5000/api/product-new-arrivals
//@Method   POST
//@Access   Private
router.post('/product-order-by', productOrderBy);

//@Enpoint  http://localhost:5000/api/search/filters
//@Method   POST
//@Access   Private
router.post('/search/filters', searchFilters);

module.exports = router;
