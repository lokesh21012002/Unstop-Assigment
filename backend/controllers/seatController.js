const Seat = require('../models/Seat');

// Initialize seats for the train with default data
exports.initSeats = async (req, res) => {
  try {
    const seats = await Seat.find();  // Checks if seats already exist
    if (seats.length === 0) {  // If no seats exist, initialize them
      const seatLayout = [];
      for (let i = 1; i <= 80; i++) {  // Creates 80 seats
        seatLayout.push({ seatNumber: i });
      }
      await Seat.insertMany(seatLayout);  // Inserts the seats into the database
      return res.status(201).json({ message: 'Seats initialized successfully' });
    }
    res.status(200).json({ message: 'Seats already initialized' });
  } catch (error) {
    res.status(500).json({ error: 'Error initializing seats' });  // Handles any other errors
  }
};

// Fetch all seat data
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();  // Retrieves all seats from the database
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching seats' });  // Handles errors
  }
};

// Book a number of seats
exports.bookSeats = async (req, res) => {
  const { numberOfSeats } = req.body;  // Number of seats to book from request body

  // Validation for number of seats requested
  if (numberOfSeats < 1 || numberOfSeats > 7) {
    return res.status(400).json({ message: 'You can only book between 1 and 7 seats' });
  }

  try {
    const availableSeats = await Seat.find({ isBooked: false });  // Finds all unbooked seats
    if (availableSeats.length < numberOfSeats) {  // Checks if enough seats are available
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Selects the seats to be booked
    let bookedSeats = [];
    for (let i = 0; i < availableSeats.length && bookedSeats.length < numberOfSeats; i++) {
      bookedSeats.push(availableSeats[i]._id);
    }

    // Updates the booked status of the selected seats
    await Seat.updateMany({ _id: { $in: bookedSeats } }, { $set: { isBooked: true } });

    res.status(200).json({ message: 'Seats booked successfully', bookedSeats });
  } catch (error) {
    res.status(500).json({ error: 'Error booking seats' });  // Handles errors
  }
};
