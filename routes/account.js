const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");

router.get("/", (req, res) => {
    res.render("pages/account");
  });

  module.exports = router;