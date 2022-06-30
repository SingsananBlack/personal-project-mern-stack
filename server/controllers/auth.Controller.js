// Use
const bcrypt = require('bcryptjs');
const User = require('../models/user.Model');
const jwt = require('jsonwebtoken');

/* exports.registerUser = async (req, res) => {
  try {
    // Check user
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User with given email already exist!');
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      email,
      password,
    });
    // Encrypt
    user.password = await bcrypt.hash(password, salt);
    // Save
    await user.save();
    res.send('Register successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error!');
  }
}; */
exports.registerUser = async (req, res) => {
  try {
    // Check user
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('Email already exists!');
    }
    // Encrypt & Save
    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send('Register successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOneAndUpdate({ email }, { new: true });
    if (user && user.enabled) {
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Password invalid!');
      }
      // Payload
      const payload = {
        user: {
          email: user.email,
          role: user.role,
        },
      };
      // Generate token
      jwt.sign(payload, 'jwtSecret', { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send('User not found!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error!');
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .select('-password')
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error!');
  }
};

exports.listUser = async (req, res) => {
  try {
    res.send('list User');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error!');
  }
};

exports.editUser = async (req, res) => {
  try {
    res.send('Edit User');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error!');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.send('Delete User');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error!');
  }
};
