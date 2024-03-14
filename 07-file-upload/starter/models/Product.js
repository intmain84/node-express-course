const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
       required: [true, 'Please provide product name'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  });
  
  module.exports = mongoose.model('Product', ProductSchema);