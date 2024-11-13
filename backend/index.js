const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo connection error", err));

app.listen(process.env.PORT, () =>
  console.log("Server running at the port 5000")
);
