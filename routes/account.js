const express = require('express')
const router = express.Router();
const account = require('../controllers/account')
const catchAsync = require("../utilities/catchAsync");

router.route("/:username")
.get(account.displayUserAccount)
.put(catchAsync(account.editUserAccount))

router.route("/:username/reviews")
.get(account.displayUserReviews)
.delete(catchAsync(account.deleteUserReviews)) 

router.get("/:username/listings", catchAsync(account.displayUserListings));

router.get("/:username/orders", catchAsync(account.displayUserOrders));

router.get("/:username/orders/:id", catchAsync(account.displayUserOrderDetails));

router.get("/:username/:edit", account.displayUserEditPage);

module.exports = router;