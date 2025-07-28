const mongoose = require('mongoose');

const warehousesSchema = mongoose.Schema({
     mainWarehouse:{
        type:Number,
        required:true
     },
     subWarehouse:{
        type:Number,
        required:true
     }
})

module.exports = mongoose.model('Warehouse',warehousesSchema)