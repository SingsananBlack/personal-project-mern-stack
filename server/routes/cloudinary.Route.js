const router = require('express').Router()
// Controller
const { uploadImage, deleteImage } = require('../controllers/cloudinary.Controller')
// Middleware
const { auth, adminCheck } = require('../middleware/auth.Middleware')

//@Enpoint  http://localhost:5000/api/images
//@Method   POST
//@Access   Private
router.post('/image', auth, adminCheck, uploadImage)

//@Enpoint  http://localhost:5000/api/images
//@Method   POST
//@Access   Private
router.post('/delete_image', auth, adminCheck, deleteImage)


module.exports = router