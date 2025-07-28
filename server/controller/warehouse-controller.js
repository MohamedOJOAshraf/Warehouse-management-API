const warehouseModel = require('../model/warehouses-model');
const statusText = require('../utils/statusText.');

const text = require('../utils/statusText.');

const warehouseValidation = require('../validation/warehouse-validation')

const getWarehouseWithProduct = async (req,res) =>{
    try{
        const warehouseId = req.params.warehouseId;

        const warehouse = await warehouseModel.findById(warehouseId);

        // check if warehouser is not found
        if(!warehouse)
            res.status(404).json('This warehouse is not found')

        res.status(200).json({statusText:text.SUCCESS,warehouse})
    }catch(err){
        res.status(500).json({statusText:text.ERROR,err})
    }
}

const postWarehouse = async (req,res) => {
    try{
        // validation for req.body
        await warehouseValidation.validate(req.body)

        const {mainWarehouse,subWarehouse} = req.body;

        const oldMainWarehouse = await warehouseModel.findOne({mainWarehouse:mainWarehouse});

        if(oldMainWarehouse)
            res.status(409).json('This main warhouse is found arleady');

        const newWarehouse = warehouseModel({
            mainWarehouse,
            subWarehouse
        })

        await newWarehouse.save()

        res.status(201).json({statusText:text.SUCCESS,data:newWarehouse})   

    }catch(err){
        res.status(500).json({statusText:text.ERROR,err})
    }
}

const deleteWarehouse = async (req,res) => {
    try{
        const warehouseId = req.params.Id;

        const warehouse = await warehouseModel.findById(warehouseId);

        if(!warehouse)
            res.status(404).json('This warehouse is not found')

        await warehouseModel.deleteOne({_id:warehouseId});

        res.status(200).json('Warehouse deleted successfully')
    }catch(err){
        res.status(500).json({statusText:text.ERROR,err})
    }
}



module.exports = {
    getWarehouseWithProduct,
    postWarehouse,
    deleteWarehouse
}