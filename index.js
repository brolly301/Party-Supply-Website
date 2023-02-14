const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override')

//Mongoose Setup
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/partySupplies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
    .catch((err) => {
        console.log("OH NO MONGO ERROR!")
        console.log(err)
    })

app.engine("ejs", ejsMate);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('pages/home')
})

app.get('/products', (req, res) => {
    res.render('pages/products')
})

app.get('/packages', (req, res) => {
    res.render('pages/packages')
})

app.get('/blog', (req, res) => {
    res.render('pages/blog')
})

app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.get('/register', (req, res) => {
    res.render('pages/register')
})

//Setting up the applications listener
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})