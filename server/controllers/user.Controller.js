const User = require('../models/user.Model')
const Cart  = require('../models/cart.Model')
const Order = require('../models/order.Model')
const Products = require('../models/product.Model') 

exports.listUsers = async (req,res) =>{
    try {
        const user = await User.find({}).select('-password').exec()
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!')
    }
}

exports.readUsers = async (req,res) =>{
    try {
        const user = await User.findOne({_id:req.params.id}).select('-password').exec()
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!')
    }
}

exports.updateUsers = async (req,res) => {
    try {
        res.send('Hello update users')
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!')
    }
}

exports.removeUsers = async (req,res) => {
    try {
        const user = await User.findOneAndRemove({_id:req.params.id}).exec()
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!')
    }
}

exports.changeRole = async (req,res) => {
    try {
        const user = await User.findOneAndUpdate({_id:req.body.id},{enabled:req.body.enabled})
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!')
    }
}

// Cart
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    // Check user
    let user = await User.findOne({ email: req.user.email }).exec();
    // Create array products
    let products = [];
    // Check cart before
    let cartBefore = await Cart.findOne({ orderBy: user._id }).exec();
    if (cartBefore) {
      cartBefore.remove();
    }

    for(let i = 0; i < cart.length; i++){
        let object = {};
        object.product = cart[i]._id; 
        object.count = cart[i].count;
        object.price = cart[i].price;
        // Add object to array products
        products.push(object);
    }

    let cartTotal = 0;
    for(let i = 0; i < products.length; i++){
        cartTotal = cartTotal + products[i].price * products[i].count
    }

    let newCart = await new Cart({products,cartTotal,orderBy: user._id}).save();

    console.log(newCart);
    res.send('userCart Ok');
  } catch (er) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({orderBy: user._id})
    .populate('products.product','_id title volume price image')
    .exec();
    const { products, cartTotal } = cart;
    res.json({products, cartTotal})
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({email:req.user.email}).exec();
    const empty = await Cart.findOneAndRemove({orderBy:user._id})
    .exec();
    res.send(empty);
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
}

/* Save address */
exports.saveAddress = async (req, res) => {
  try {
      const userAddress = await User.findOneAndUpdate({email:req.user.email},{address:req.body.address})
      .exec();
    res.json({ok:true})
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
};

/* Save order */
exports.saveOrder = async (req, res) => {
  try {
    const user = await User.findOne({email:req.user.email}).exec();
    const userCart = await Cart.findOne({orderBy:user._id}).exec();
    // Save order to database
    const saveOrder = await new Order({
      products:userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal
    }).save();

    // (+ sold) and (- stock) 
    const bulkOption = userCart.products.map((values)=>{
      return {
        updateOne:{
          filter:{ _id:values.product._id },
          update:{ $inc:{countInStock : -values.count, sold: +values.count} }
        }
      }
    })
    const updated = await Products.bulkWrite(bulkOption, {})

    res.send(updated);
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
}
/* Get order user */
exports.getOrderUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const order = await Order.find({orderBy: user._id})
    .populate('products.product')
    .exec();
    res.json(order)
  } catch (err) {
    res.status(500).send('Get order user server error!');
  }
};