const express = require('express');
const router = express.Router();

const { getWarehouseWithProduct, postWarehouse, deleteWarehouse } = require('../controller/warehouse-controller');

router.get('/getWarehouseWithProduct/:warehouseId',getWarehouseWithProduct)

router.post('/postWarehouse',postWarehouse)

router.delete('/deleteWarehouse',deleteWarehouse)

module.exports = router