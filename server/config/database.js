const mongoose = require('mongoose');

const connectionDB = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DATABASE, connectionParams);
    console.log('Connected to database successfully');
  } catch (err) {
    console.log(err);
    console.log('Could not connect to database!');
  }
};

module.exports = connectionDB;
