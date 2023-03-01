const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/ExpressError")
const methodOverride = require("method-override");
const flash = require ('connect-flash')
const session = require ('express-session')
const passport = require('passport')
const LocalAuth = require('passport-local')
const User = require('./models/user')
const MongoStore = require('connect-mongo')
const Stripe = require('stripe')
const stripe = Stripe("sk_test_51MgRG0AYx3n7HkYcaolBrw29SN2beilaDLgGCEYSzRnnQOPYt2BCM86W5j3DGvCSGcgeCwc4VbB8I5IavwYddYON008lZ0AzGN");

const balloons = require ('./routes/balloons')
const decorations = require ('./routes/decorations')
const themes = require ('./routes/themes')
const fancyDress = require ('./routes/fancyDress')
const packages = require ('./routes/packages')
const marketplace = require ('./routes/marketplace')
const basket = require ('./routes/basket')
const account = require ('./routes/account')
const authorisation = require ('./routes/authorisation')
const checkout = require ('./routes/checkout')
const search = require ('./routes/search')

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

const sessionOptions = {secret: 'Test', resave: false, saveUninitialized: true, store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/partySupplies"}),
cookie: {
  httpOnly: true,
  expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
  maxAge: 120 * 60 * 1000
}}

app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalAuth(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.signedInUser = req.user
  res.locals.session = req.session
  res.locals.params = req.params
  next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.use(express.json())

//Routes
app.use('/balloons', balloons)
app.use('/decorations', decorations)
app.use('/themes', themes)
app.use('/fancyDress', fancyDress)
app.use('/packages', packages)
app.use('/marketplace', marketplace)
app.use('/basket', basket)
app.use('/account', account)
app.use('/', authorisation)
app.use('/checkout', checkout)
app.use('/search', search)



//Additional routes & middleware
app.get("/", (req, res) => {
  res.render("pages/home");
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
