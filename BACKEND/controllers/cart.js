const Cart = require("../models/Cart");

//create cart
exports.addCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json({
      message: "Cart created successfully",
      cart: savedCart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating cart", error });
  }
};

//edit cart
exports.editCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

//delete cart
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart has been deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Cart", error });
  }
};

//get user cart
exports.getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({ cart: cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

//get all carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ carts: carts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching carts", error });
  }
};
