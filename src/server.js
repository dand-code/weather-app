require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Routes
app.use(require('./routes/index'));


app.listen(3000);
console.log('Server listening');