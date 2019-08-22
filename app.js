const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const product = require('./routes/product.route');
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://anya:anya12@ds233737.mlab.com:33737/hotdogs';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', product);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});
