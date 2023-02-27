const mongoose = require("mongoose");
const Product = require("../models/product");
const Basket = require("../models/basket");
const balloons = require("./balloons");
const decorations = require("./decorations");
const themes = require("./themes");
const fancyDress = require("./fancyDress");
const packages = require("./packages");
const {kids, mens, womens} = require("./clothing");
const easter = require("./themes/easter");
const halloween = require("./themes/halloween");
const christmas = require("./themes/christmas");
const valentines = require("./themes/valentines");
const paddysDay = require("./themes/paddysDay");
const marketplace = require("./marketplace");
const birthdays = require("./themes/birthdays");

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

const seedDB = async () => {


    await Basket.deleteMany({});
    await Product.deleteMany({});
    await Product.insertMany(balloons);
    await Product.insertMany(decorations);
    await Product.insertMany(themes);
    await Product.insertMany(fancyDress);
    await Product.insertMany(packages);
    await Product.insertMany(kids);
    await Product.insertMany(mens);
    await Product.insertMany(womens);
    await Product.insertMany(easter);
    await Product.insertMany(halloween);
    await Product.insertMany(christmas);
    await Product.insertMany(paddysDay);
    await Product.insertMany(valentines);
    await Product.insertMany(marketplace);
    await Product.insertMany(birthdays);
}

seedDB().then(() => {
    mongoose.connection.close()
});
