const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/ExpressError")
const methodOverride = require("method-override");
const balloons = require ('./routes/balloons')
const decorations = require ('./routes/decorations')
const themes = require ('./routes/themes')
const fancyDress = require ('./routes/fancyDress')
const packages = require ('./routes/packages')
const marketplace = require ('./routes/marketplace')
const basket = require ('./routes/basket')
const flash = require ('connect-flash')
const session = require ('express-session')

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

const sessionOptions = {secret: 'Test', resave: false, saveUninitialized: true, 
cookie: {
  httpOnly: true,
  expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
  maxAge: 1000 * 60 * 60 * 24 * 2
}}

app.use(session(sessionOptions))
app.use(flash())

app.use((req,res,next) => {
  res.locals.addedToBasket = req.flash('success')
  res.locals.removeFromBasket = req.flash('success')
  next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use('/balloons', balloons)
app.use('/decorations', decorations)
app.use('/themes', themes)
app.use('/fancyDress', fancyDress)
app.use('/packages', packages)
app.use('/marketplace', marketplace)
app.use('/basket', basket)

//Additional routes & middleware
app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.all('*', (req,res,next) => {
   next(new ExpressError('Page Not Found', 404)) 
})

app.use((err, req, res, next) => {
  const {statusCode = 500} = err
  res.status(statusCode).render('pages/error', {err})
})

//Setting up the applications listener
app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
