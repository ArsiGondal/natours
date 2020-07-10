const express = require('express');
const authController = require('../controller/authController');
const viewsController = require('../controller/viewController');
const bookingController = require('../controller/bookingController');
const router = express.Router();

router.get('/', authController.IsLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.IsLoggedIn, viewsController.getTour);
router.get('/login', authController.IsLoggedIn, viewsController.getLogInForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/my-tours',
  bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
module.exports = router;
