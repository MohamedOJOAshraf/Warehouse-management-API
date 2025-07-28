const express = require('express');
const router = express.Router();

const { postCategory, getCategoryWithProduct, deleteCategory, updateCategory } = require('../controller/category-controller');

router.post('/postCategory',postCategory)

router.delete('/deleteCategory/:categoryId',deleteCategory)

router.get('/getCategoryWithProduct/:categoryId',getCategoryWithProduct)

router.patch('/updateCategory/:categoryId',updateCategory)

module.exports = router