const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Product = require("./models/product");
const Basket = require("./models/basket");
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
  res.render("pages/products/balloons/balloons", { products });
});

app.get("/balloons/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("pages/products/balloons/balloonsShowPage", { product });
});

app.get("/decorations", async (req, res) => {
  const products = await Product.find({ category: 'Decorations' });
  res.render("pages/products/decorations/decorations", { products });
});

app.get("/decorations/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("pages/products/decorations/decorationsShowPage", { product });
});

app.get("/themes", async (req, res) => {
  const products = await Product.find({ category: 'Themes' });
  res.render("pages/products/themes/themesSplash", { products });
});

app.get("/themes/easter", async (req, res) => {
  const easter = await Product.find({ category: 'Easter' });
  res.render("pages/products/themes/themes/easter", { easter });
});

app.get("/themes/easter/:id", async (req, res) => {
  const { id } = req.params;
  const easter = await Product.findById(id);
  res.render("pages/products/themes/themes/easterShowPage", { easter });
});

app.get("/themes/christmas", async (req, res) => {
  const christmas = await Product.find({ category: 'Christmas' });
  res.render("pages/products/themes/themes/christmas", { christmas });
});

app.get("/themes/christmas/:id", async (req, res) => {
  const { id } = req.params;
  const christmas = await Product.findById(id);
  res.render("pages/products/themes/themes/christmasShowPage", { christmas });
});

app.get("/themes/halloween", async (req, res) => {
  const halloween = await Product.find({ category: 'Halloween' });
  res.render("pages/products/themes/themes/halloween", { halloween });
});

app.get("/themes/halloween/:id", async (req, res) => {
  const { id } = req.params;
  const halloween = await Product.findById(id);
  res.render("pages/products/themes/themes/halloweenShowPage", { halloween });
});

app.get("/themes/valentines", async (req, res) => {
  const valentines = await Product.find({ category: 'Valentines' });
  res.render("pages/products/themes/themes/valentines", { valentines });
});

app.get("/themes/valentines/:id", async (req, res) => {
  const { id } = req.params;
  const valentines = await Product.findById(id);
  res.render("pages/products/themes/themes/valentinesShowPage", { valentines });
});

app.get("/themes/stpatricksday", async (req, res) => {
  const stpatricksday = await Product.find({ category: 'St Patricks Day' });
  res.render("pages/products/themes/themes/paddysDay", { stpatricksday });
});

app.get("/themes/stpatricksday/:id", async (req, res) => {
  const { id } = req.params;
  const stpatricksday = await Product.findById(id);
  res.render("pages/products/themes/themes/paddysDayShowPage", { stpatricksday });
});

app.get("/themes/birthdays", async (req, res) => {
  const birthdays = await Product.find({ category: 'Birthdays' });
  res.render("pages/products/themes/themes/birthdays", { birthdays });
});

app.get("/themes/birthdays/:id", async (req, res) => {
  const { id } = req.params;
  const birthday = await Product.findById(id);
  res.render("pages/products/themes/themes/birthdaysShowPage", { birthday });
});

app.get("/fancyDress", async (req, res) => {
  const fancyDress = await Product.find({ category: 'Fancy Dress' });
  res.render("pages/products/fancyDress/fancyDressSplash", { fancyDress });
});

app.get("/fancyDress/mens", async (req, res) => {
  const mens = await Product.find({category:'Mens'});
  res.render("pages/products/fancyDress/clothing/mens", { mens });
});

app.get("/fancyDress/mens/:id", async (req, res) => {
  const { id } = req.params;
  const mens = await Product.findById(id);
  res.render("pages/products/fancyDress/clothing/mensShowPage", { mens });
});

app.get("/fancyDress/womens", async (req, res) => {
  const womens = await Product.find({category:'Womens'});
  res.render("pages/products/fancyDress/clothing/womens", { womens });
});

app.get("/fancyDress/womens/:id", async (req, res) => {
  const { id } = req.params;
  const womens = await Product.findById(id);
  res.render("pages/products/fancyDress/clothing/womensShowPage", { womens });
});

app.get("/fancyDress/kids", async (req, res) => {
  const kids = await Product.find({category:'Kids'});
  res.render("pages/products/fancyDress/clothing/kids", { kids });
});

app.get("/fancyDress/kids/:id", async (req, res) => {
  const { id } = req.params;
  const kids = await Product.findById(id);
  res.render("pages/products/fancyDress/clothing/kidsShowPage", { kids });
});

app.get("/marketplace", async (req, res) => {
  res.render("pages/products/marketplace/marketplaceSplash");
});

app.get("/packages", async (req, res) => {
  const package = await Product.find({ category: 'Packages' });
  res.render("pages/products/packages/packages", {package});
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/basket", async (req, res) => {
  const basketItems = await Basket.find({})
  let total = 0;
  res.render("pages/basket", {basketItems, total});
});

app.post("/basket", async (req, res) => {
  const id = req.body.id
  const balloon = await Product.findById(id)
  const newItemAdded = new Basket({products: balloon, price: balloon.price})
  await newItemAdded.save()
  res.redirect('/basket')
})

app.delete("/basket", async (req, res) => {
  const id = req.body.id
  await Basket.findByIdAndDelete(id);
  console.log(id)
  res.redirect('/basket')
});

//Setting up the applications listener
app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
