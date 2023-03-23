const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const packages = require('../controllers/packages')
const ExpressError = require("../utilities/ExpressError")

router.get("/", catchAsync(packages.displayPackages));
  
router.get("/:id", catchAsync(packages.displayPackageShow));

module.exports = router;