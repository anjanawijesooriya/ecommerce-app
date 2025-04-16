const Express = require("express");
const app = Express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(Express.json());
app.use(cors());

app.use("/api/auth", require("./BACKEND/routes/User"));
app.use("/api/products", require("./BACKEND/routes/Product"));
app.use("/api/cart", require("./BACKEND/routes/Cart"));
app.use("/api/order", require("./BACKEND/routes/Order"));
app.use("/api/checkout", require("./BACKEND/routes/Payment"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
