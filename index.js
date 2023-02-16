const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Product = require("./models/product");
const methodOverride = require("method-override");

//Mongoose Setup
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/partySupplies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!");
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/balloons", async (req, res) => {
  const products = await Product.find({ category: 'Balloons' });
  res.render("pages/products/balloons", { products });
});

app.get("/balloons/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("pages/products/balloonsShowPage", { product });
});

app.get("/decorations", async (req, res) => {
  const products = await Product.find({ category: 'Decorations' });
  res.render("pages/products/decorations", { products });
});

app.get("/decorations/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("pages/products/decorationsShowPage", { product });
});

app.get("/themes", async (req, res) => {
  const products = await Product.find({ category: 'Themes' });
  res.render("pages/products/themes", { products });
});

app.get("/themes/:name", async (req, res) => {
  const {name} =  req.params
  const product = await Product.find({ name: name });
  res.render("pages/products/themesShowPage", { product });
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

//Setting up the applications listener
app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
