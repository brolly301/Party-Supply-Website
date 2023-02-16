const mongoose = require("mongoose");
const Product = require("../models/product");
const balloons = require("./balloons");
const decorations = require("./decorations");
const themes = require("./themes");
const fancyDress = require("./fancyDress");
const packages = require("./packages");
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
    await Product.deleteMany({});
    await Product.insertMany(balloons);
    await Product.insertMany(decorations);
    await Product.insertMany(themes);
    await Product.insertMany(fancyDress);
    await Product.insertMany(packages);
}

seedDB().then(() => {
    mongoose.connection.close()
});
