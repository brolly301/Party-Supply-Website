const express = require('express')
const router = express.Router();
const account = require('../controllers/account')
const catchAsync = require("../utilities/catchAsync");

router.get("/:username", account.displayUserAccount);

router.get("/:username/reviews", account.displayUserReviews);

router.delete("/:username/reviews", catchAsync(account.deleteUserReviews));    

router.get("/:username/listings", account.displayUserListings);

router.get("/:username/orders", account.displayUserOrders);

router.get("/:username/orders/:id", account.displayUserOrderDetails);

router.get("/:username/:edit", account.displayUserEditPage);

router.put("/:username", catchAsync(account.editUserAccount))

module.exports = router;