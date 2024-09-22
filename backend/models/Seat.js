const mongoose = require('mongoose');

// Defines the schema for a seat in the train
const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },  // Unique seat number, must be provided
  isBooked: { type: Boolean, default: false },   // Booking status of the seat, defaults to false
});

const Seat = mongoose.model('Seat', seatSchema);  // Creates the model from the schema
module.exports = Seat;  // Exports the model for use in controllers
