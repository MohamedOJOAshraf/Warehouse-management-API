const express = require('express');
const router = express.Router()

const {postProduct, getProduct, getAllProducts, deleteProduct, updateProduct} = require('../controller/product-controller')

const allowTo = require('../middleware/allowTo')

const verifyToken = require('../middleware/verifyToken');

const actors = require('../config/config')

router.post('/postProduct',postProduct)

router.get('/getProduct/:productCode',getProduct)

router.get('/getAllProducts',verifyToken ,allowTo(actors.MANAGER,actors.ADMIN) ,getAllProducts)

router.delete('/deleteProduct/:productCode',verifyToken, allowTo(actors.MANAGER,actors.ADMIN), deleteProduct)

router.patch('/updateProduct/:productCode',verifyToken, allowTo(actors.MANAGER,actors.ADMIN), updateProduct)

module.exports = router