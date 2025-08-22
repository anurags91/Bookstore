const router = require("express").Router();
const { authenticationToken } = require("./userAuth");
const book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/place-order", authenticationToken, async (req, res) => {
  try {
    const { id, order } = req.body;

    console.log("Received order:", order);
    console.log("User ID:", id);

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDatafromDb = await newOrder.save();

      // saving order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDatafromDb._id },
      });

      // clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: "success",
      message: "order Placed Successfully",
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get order history of particular user
router.get("/get-order-history", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    console.log("Fetching order history for user:", id);

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    if (!userData) {
      console.error("User not found with ID:", id);
      return res.status(404).json({ message: "User not found" });
    }

    const orderData = userData.orders?.reverse() || [];
    return res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    console.error("Order history error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


//get all order --- admin
router.get("/get-all-orders", authenticationToken, async (req, res) => {
  try {

    // Pagination values from query params
    const page = parseInt(req.query.page) || 1;   // default page = 1
    const limit = parseInt(req.query.limit) || 10; // default limit = 10
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalOrders = await Order.countDocuments();

    const userData = await Order.find().populate({
      path: "book",
    })
      .populate({
        path: "user",
      }).sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      status: "Success",
      data: userData,
      pagination: {
        totalOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        hasNextPage: page * limit < totalOrders,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "An error Occurred" });
  }
})

//update order admin
router.put("/update-status/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status updated successfully",
    })
  } catch (error) {
    return res.status(500).json({ message: "An error Occurred" });
  }
})
module.exports = router;