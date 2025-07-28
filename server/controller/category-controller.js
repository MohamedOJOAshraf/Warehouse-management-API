const categoryModel = require('../model/category-model')

const productModel = require('../model/product-model');
const statusText = require('../utils/statusText.');

const text = require('../utils/statusText.')

const getCategoryWithProduct = async (req,res) => {
    try{
        const categoryId = req.params.categoryId;

        const category = await categoryModel.findById(categoryId)

        // check category is not found
        if(!category)
           return res.status(404).json('This category is not found')

        const product = await productModel.find({category:category},{__v:false}).populate('category')

        if(!product)
           return res.status(404).json('There is no product in this category')

       return res.status(200).json({statusText:text.SUCCESS,category:category,products:product})

    }catch(err){
       return res.status(500).json({statusText:text.ERROR,data:err}) 
    }
}

const deleteCategory = async (req,res) => {
    try{
        const categoryId = req.params.categoryId;

        const category = await categoryModel.findById(categoryId)

        if(!category)
           return res.status(404).json('This category is not found');

        await categoryModel.deleteOne({_id:categoryId});

        // unlink product
        await productModel.updateMany(
            {_id:categoryId},
            {$set: {category : null} }
        )

       return res.status(200).json('Category deleted successfully')
    }catch(err){
       return res.status(500).json({statusText:text.ERROR,data:err})     
    }
}

const updateCategory = async (req,res) => {
    try{
        const categoryId = req.params.categoryId;

        const category = await categoryModel.findById(categoryId);

        if(!category)
            res.status(404).json('This category is not found');

        const updatedCategory = await categoryModel.findByIdAndUpdate({_id:categoryId},req.body)

        // category update in thier products
        await productModel.updateMany(
            {_id:categoryId},
            {$set: {category: updatedCategory } }
        )

        res.status(204).json({statusText:text.SUCCESS,data:updatedCategory})
    }catch(err){
        return res.status(500).json({statusText:text.ERROR,data:err})  
    }
}


const postCategory = async (req,res) => {
    try{
        const {name} = req.body;

        const category = await categoryModel.findOne({name:name});

        // check if user is found
        if(category)
            return res.status(409).json("This category is found")

        const newCategory = new categoryModel({
            name
        })

        await newCategory.save()

        return res.status(201).json({statusText:text.SUCCESS,data:newCategory})
    }catch(err){
        res.status(500).json({statusText:text.ERROR,data:err})
    }
}

module.exports = {
    postCategory,
    getCategoryWithProduct,
    deleteCategory,
    updateCategory
}