const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String
    },
    productCode:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number       
    },
    category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true
    },
    warehouse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse', 
    required: true
  }
})

module.exports = mongoose.model('products',productSchema)