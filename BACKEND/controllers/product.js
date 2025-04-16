const Product = require("../models/Product");

//create product
exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

//edit product
exports.editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

//get product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

//get all products
exports.getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
