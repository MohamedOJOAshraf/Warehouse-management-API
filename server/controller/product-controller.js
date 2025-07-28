const productModel = require("../model/product-model");

const text = require("../utils/statusText.");

const postProduct = async (req, res) => {
  try {
    const { name, productCode, price, quantity, category, warehouse } =
      req.body;

    const product = await productModel.findOne({ productCode: productCode });

    const newProduct = new productModel({
      name,
      productCode,
      price,
      quantity,
      category,
      warehouse,
    });

    await newProduct.save();

    return res.status(201).json({ statusText: text.SUCCESS, data: newProduct });
  } catch (err) {
    res.status(500).json({ statusText: text.ERROR, data: err });
  }
};

const getProduct = async (req, res) => {
  try {
    const productCode = req.params.productCode;

    const product = await productModel
      .findOne({ productCode: productCode })
      .populate("category")
      .populate("warehouse");

    if (!product) return res.status(404).json("This Product Is not found");

    res.status(200).json({ statusText: text.SUCCESS, data: product });
  } catch (err) {
    res.status(500).json({ statusText: text.ERROR, err });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // pagination
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const product = await productModel.find().limit(limit).skip(skip);

    const numberOfProducts = await productModel.countDocuments();
    console.log(numberOfProducts);

    res.status(200).json({ statusText: text.SUCCESS, data: product });
  } catch (err) {
    res.status(500).json({ statusText: text.ERROR, err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productCode = req.params.productCode;

    const product = await productModel.findOne(productCode);

    if (!product) res.status(404).json("This product is not found");

    await productModel.deleteOne(product);

    res.status(200).json("Product deleted successfully");
  } catch (err) {
    res.status(500).json({ statusText: text.ERROR, err });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productCode = req.params.productCode;

    const product = await productModel.findOne(productCode);

    if (!product) res.status(404).json("This product is not found");

    await productModel.updateOne(product, req.body);

    // validation

    res.status(204).json("product deleted successfully");
  } catch (err) {
    res.status(500).json({ statusText: text.ERROR, err });
  }
};

module.exports = {
  postProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
