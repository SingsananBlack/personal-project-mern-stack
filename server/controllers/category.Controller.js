const Category = require('../models/category.Model');

exports.createCategory = async (req, res) => {
  try {
    const category = await new Category({categoryName:req.body.categoryName}).save()
    console.log(category);
    res.send('Create successfully')
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
};

exports.listCategory = async (req, res) => {
  try {
    const category = await Category.find({}).exec()
    res.send(category)
  } catch (err) {
    res.status(500).send('Internal server error!')
  }
};

exports.readCategory = async (req, res) => {
  try {
    const category = await Category.findOne({_id:req.params.id})
    res.send(category);
  } catch (err) {
    res.status(500).send('Internal server error!')
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      {_id:req.params.id},
      {categoryName:req.body.categoryName}
      )
    res.send(category)
  } catch (err) {
    res.status(500).send('Internal server error!')
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndRemove({_id:req.params.id})
    res.send(category)
  } catch (err) {
    res.status(500).send('Internal server error!')
  }
};
