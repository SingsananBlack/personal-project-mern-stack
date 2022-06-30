// Use
const router = require('express').Router();

// Use controllers
const {
  registerUser,
  login,
  listUser,
  editUser,
  deleteUser,
  currentUser,
} = require('../controllers/auth.Controller');

// Use middleware
const { auth, adminCheck } = require('../middleware/auth.Middleware');

//@Enpoint  http://localhost:5000/api/register
//@Method   POST
//@Access   Publish
router.post('/register', registerUser);

//@Enpoint  http://localhost:5000/api/login
//@Method   POST
//@Access   Publish
router.post('/login', login);

//@Enpoint  http://localhost:5000/api/current-user
//@Method   POST
//@Access   Private
router.post('/current-user', auth, currentUser);

//@Enpoint  http://localhost:5000/api/current-admin
//@Method   POST
//@Access   Private
router.post('/current-admin', auth, adminCheck, currentUser);

/* //@Enpoint  http://localhost:5000/api/auth
//@Method   GET
//@Access   Publish
router.get('/auth', listUser);

//@Enpoint  http://localhost:5000/api/auth
//@Method   PUT
//@Access   Publish
router.put('/auth', editUser);

//@Enpoint  http://localhost:5000/api/auth
//@Method   DELETE
//@Access   Publish
router.delete('/auth', deleteUser); */

module.exports = router;
