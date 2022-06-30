const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'products',
        },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    orderBy: {
      type: ObjectId,
      ref: 'users',
    },
    orderStatus: {
      type: String,
      default: 'Not Process',
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model('order', OrderSchema);
