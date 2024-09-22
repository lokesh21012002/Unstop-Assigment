const express = require('express');
const router = express.Router();
const {
  initSeats,
  getAllSeats,
  bookSeats,
} = require('../controllers/seatController');

router.get('/init-seats', initSeats);  // Route to initialize seats
router.get('/seats', getAllSeats);  // Route to get all seats
router.post('/book-seats', bookSeats);  // Route to book seats

module.exports = router;  // Exports the router for use in the main file
