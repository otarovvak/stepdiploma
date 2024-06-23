const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://otarovvak:NietNiet@cluster0.quqfvpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/", (req, res) => {
  res.send("Express App is running");
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      color: {
        hex_value: String,
        colour_name: String,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  price_sign: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  image_link: String,
  product_link: String,
  website_link: String,
  description: {
    type: String,
    required: true,
  },
  rating: Number,
  category: {
    type: String,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  tag_list: [String],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  product_api_url: {
    type: String,
    required: true,
  },
  api_featured_image: {
    type: String,
    required: true,
  },
  product_colors: Array,
});

const Product = mongoose.model("Product", productSchema);

app.post("/addproduct", async (req, res) => {
  const productData = req.body;
  const product = new Product(productData);
  try {
    await product.save();
    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: error.message,
    });
  }
});
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cartData: [
    {
      productId: String,
      quantity: Number,
      color: {
        hex_value: String,
        colour_name: String,
      },
    },
  ],
});

app.post("/signup", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found with the same email address",
      });
    }

    const user = new User({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: [],
    });

    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passMatch = req.body.password === user.password;
    if (passMatch) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email address" });
  }
});

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("Newcollection Fetched");
  res.send(newcollection);
});

app.get("/popularproducts", async (req, res) => {
  const desiredRating = 10;

  let products = await Product.find({
    rating: desiredRating,
  });

  let popularproducts = products.slice(0, 8);

  console.log("popular products Fetched");
  res.send(popularproducts);
});
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid login" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please autheticate using a valid token" });
    }
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  const { productId, selectedColor } = req.body;

  try {
    const userData = await User.findById(req.user.id);

    if (!userData) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure userData.cartData is initialized if needed

    const existingItemIndex = userData.cartData.findIndex(
      (item) =>
        item.productId &&
        item.productId.toString() === productId &&
        item.color &&
        item.color.hex_value === selectedColor.hex_value
    );

    if (existingItemIndex !== -1) {
      userData.cartData[existingItemIndex].quantity += 1;
      console.log(
        "Item exists, incrementing quantity:",
        userData.cartData[existingItemIndex]
      );
    } else {
      userData.cartData.push({
        userId: req.user.id,
        productId: new mongoose.Types.ObjectId(productId),
        quantity: 1,
        color: {
          hex_value: selectedColor.hex_value,
          colour_name: selectedColor.colour_name,
        },
      });
      console.log("Item does not exist, adding new item:", {
        productId,
        quantity: 1,
        color: selectedColor,
      });
    }

    userData.markModified("cartData");
    await userData.save();

    console.log("Updated cart data:", userData.cartData);
    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).send("Error adding item to cart");
  }
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { productId, color } = req.body;

    if (!productId || !color || !color.hex_value) {
      return res
        .status(400)
        .json({ message: "Product ID and color are required" });
    }

    console.log("Removing item:", productId, color);

    let userData = await User.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = userData.cartData.findIndex(
      (item) =>
        item.productId &&
        item.productId.toString() === productId &&
        item.color &&
        item.color.hex_value === color.hex_value
    );

    if (itemIndex === -1) {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    const item = userData.cartData[itemIndex];
    if (item.quantity > 1) {
      userData.cartData[itemIndex].quantity -= 1;
    } else {
      userData.cartData.splice(itemIndex, 1);
    }

    userData.markModified("cartData");
    await userData.save();

    return res.json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getcart", fetchUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    if (userData) {
      res.json(userData.cartData);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving cart");
  }
});
app.post("/placeorder", fetchUser, async (req, res) => {
  const { items, totalAmount, address } = req.body;

  try {
    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      address,
    });
    await order.save();

    await User.updateOne({ _id: req.user.id }, { $set: { cartData: [] } });

    res.json({
      success: true,
      message: "Order placed and cart cleared successfully",
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send("Error placing order");
  }
});
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});
app.post("/orders/:id/approve", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = "Approved";
    await order.save();
    res.json({ success: true, message: "Order approved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error approving order" });
  }
});

app.delete("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
});
app.get("/allproducts/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
});
app.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});
