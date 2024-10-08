import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


function SeatBooking() {
  const [seats, setSeats] = useState([]); // State to store seat data
  const [numberOfSeats, setNumberOfSeats] = useState(1);


  // Fetch seat layout from backend
  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    // Fetch the inditial seat data
    const res = await axios.get('https://unstop-assigment.onrender.com/api/seats');
    setSeats(res.data);
  };

  const handleBooking = async () => {
    try {
      // Making API call to backend for book seats
      const res = await axios.post('https://unstop-assigment.onrender.com/api/book-seats', {
        numberOfSeats,
      });
      
      
      // alert(res.data.message)
      swal("Seat Booked sucessfully");
      fetchSeats(); // Refresh seat layout
    } catch (error) {
      swal(error.response.data.message);
      
      
      // alert(error.response.data.message)
    }
  };

  return (
    <div>
      <h1> Seat Booking</h1>

       <div className='booking'>
        <input
          type="number"
          min="1"
          max="7"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(e.target.value)}
        />
        <button onClick={handleBooking}>Book Seats</button>
      </div>
      
      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat.seatNumber}
            className={`seat ${seat.isBooked ? 'booked' : 'available'}`}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default SeatBooking;
