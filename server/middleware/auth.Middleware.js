const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const token = req.headers['authtoken'];
    if (!token) {
      return res.status(401).send('No token , autorization denied!');
    }
    const decoded = jwt.verify(token, 'jwtSecret');
    console.log('middleware', decoded);
    req.user = decoded.user
    next()
  } catch (err) {
    console.log(err);
    res.status(401).send('Token invalid!');
  }
};

exports.adminCheck = async(req, res, next) => {
  try {
    const { email } = req.user
    const adminUser = await User.findOne({ email }).exec()
    if(adminUser.role !== 'admin'){
      res.status(403).send(err,'Admin access denied!')
    }else{
      next()
    }
  } catch (err) {
    console.log(err);
    res.status(401).send('Admin access denied!');
  }
};
