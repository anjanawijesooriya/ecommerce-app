const Order = require("../models/Order");

//create order
exports.addOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

//edit order
exports.editOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

//delete order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order has been deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Order", error });
  }
};

//get user orders
exports.getUserOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json({ orders: order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

//get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

//get monthly income
exports.getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({ data: income });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching monthly income stats", error });
  }
};
