const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      text:true
    },
    volume: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      //   required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceSale: {
      type: Number,
      required: true,
    },
    sold:{
      type: Number,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: 'category'
    },
  },
  { timestamps: true }
);

module.exports = Products = mongoose.model('products', ProductSchema);
