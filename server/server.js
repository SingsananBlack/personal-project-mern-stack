const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const { readdirSync } = require('fs');
const connectionDB = require('./config/database');

const app = express();

// Database connection
connectionDB();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(cors());

// Route
readdirSync('./routes')
.map((el) => app.use('/api', require('./routes/' + el)));

// Create Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
