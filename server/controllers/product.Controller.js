const { query } = require('express');
const Products = require('../models/product.Model');

exports.createProduct = async (req, res) => {
  try {
    const product = await new Products(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
};

exports.listProduct = async (req, res) => {
  try {
    const count = parseInt(req.params.count)
    const products = await Products.find()
    .limit(count).populate('category')
    .sort([['createdAt','desc']]);
    res.send(products);
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
};

exports.readProduct = async (req, res) => {
  try {
    const product = await Products.findOne({_id:req.params.id})
    .populate('category')
    .exec()
    res.send(product)
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await Products.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
    res.send(product)
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Products.findOneAndRemove({_id:req.params.id}).exec()
    res.send(deleted)
  } catch (err) {
    
  }
}

exports.productOrderBy = async (req, res) => {
  try {
    const { limit, sort, orderBy } = req.body
    const product = await Products.find()
    .limit(limit)
    .populate('category')
    .sort([[sort, orderBy]])
    res.send(product)
  } catch (err) {
    res.status(500).send('Internal server error!')
  }
}


const handleQuery = async(req, res , query) => {
  let searchProduct = await Products.find({$text:{$search:query}})
  .populate('category',"_id categoryName")
  res.send(searchProduct)
}
const handelCategory = async (req, res, category) => {
  let filterCategory = await Products.find({category})
  .populate('category','_id categoryName')
  res.send(filterCategory)
}
exports.searchFilters = async (req, res) => {
  const { query, category } = req.body
  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query)
  }
  if (category) {
    console.log('category', category);
    await handelCategory(req, res, category)
  }
}