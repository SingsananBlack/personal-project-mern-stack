const router = require('express').Router();

// Use controllers
const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  changeRole,
  userCart,
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
  getOrderUser,
} = require('../controllers/user.Controller');

// Use middleware
const { auth, adminCheck } = require('../middleware/auth.Middleware');

//@Enpoint  http://localhost:5000/api/users
//@Method   GET
//@Access   Private
router.get('/users', auth, adminCheck, listUsers);

//@Enpoint  http://localhost:5000/api/users/:id
//@Method   GET
//@Access   Private
router.get('/users/:id', readUsers);

//@Enpoint  http://localhost:5000/api/users:id
//@Method   PUT
//@Access   Private
router.put('/users/:id', updateUsers);

//@Enpoint  http://localhost:5000/api/users/:id
//@Method   DELETE
//@Access   Private
router.delete('/users/:id', removeUsers);

//@Enpoint  http://localhost:5000/api/change_status
//@Method   POST
//@Access   Private
router.post('/change_status', auth, adminCheck, changeRole);

//@Enpoint  http://localhost:5000/api/user/cart
//@Method   POST/GET/DELETE
//@Access   Private
router.post('/user/cart', auth, userCart);
router.get('/user/cart', auth, getUserCart);
router.delete('/user/cart', auth, emptyCart);

//@Enpoint  http://localhost:5000/api/user/address
//@Method   POST
//@Access   Private
router.post('/user/address', auth, saveAddress);

//@Enpoint  http://localhost:5000/api/user/order
//@Method   POST
//@Access   Private
router.post('/user/order', auth, saveOrder);

//@Enpoint  http://localhost:5000/api/user/orders
//@Method   GET
//@Access   Private
router.get('/user/orders', auth, getOrderUser);

module.exports = router;
