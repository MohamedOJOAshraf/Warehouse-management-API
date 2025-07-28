const {object,string,number} = require('yup');

const warehouseValidation = object({
    mainWarehouse:number().required(),
    subWarehouse:number().required()
})

module.exports = warehouseValidation