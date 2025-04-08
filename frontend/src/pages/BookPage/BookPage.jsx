import React, { useState, useEffect, useContext } from 'react';
import './BookPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import FlightUserDetails from '../../Components/FlightUserDetails/FlightUserDetails';
import SeatShow from '../../Components/SeatShow/SeatShow';
import Payment from '../../Components/Payment/Payment';
import Review from '../../Components/Review/Review';
import Rating from '../../Components/Rating/Rating';
import { AuthContext } from '../../context/AuthContext'; 
const fetch_url = import.meta.env.VITE_BACKEND_URL
const BookPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [items, setItems] = useState(state?.pass_items || []);
  const [seat, setSeat] = useState('none');
  const [temp, setTemp] = useState(0);

  const handleSeat = (mySeat) => {
    setSeat(mySeat);
  };

  useEffect(() => {
    if(!user){
      alert("Please Login")
      navigate("/login")
    }
  }, [navigate])

  const getFlightData = async () => {
    const postData = { items: state?.pass_items };
    try {
      const response = await fetch(fetch_url + '/get_Updated_Flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const responseData = await response.json();
      setItems(responseData[0]);
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
    }
  };

  useEffect(() => {
    getFlightData();
  }, [temp]);

  const handleUpdateBookPage = () => {
    setTemp((prevTemp) => prevTemp + 1);
  };

  return (
    <div className='Complete_Booking'>
      <Navbar/>
      <div>
        <div className='Flight_Book_Parent'>
          <FlightUserDetails items={items} user_info={user} />
        </div>
        <div className='Seat_Select_Parent'>
          <SeatShow items={items} user_info={(user) ? user : {}} getSeat={handleSeat} />
        </div>
      </div>
      <div className='MakePayment'>
        <Payment items={items} user_info={(user) ? user : {}} selected_seat={seat} Update_Book_Page={handleUpdateBookPage} />
      </div>
      <div className='Reiview_Rating'>
        <div className='Review'>
          <Review items={items} user_info={(user) ? user : {}} Update_Book_Page={handleUpdateBookPage} />
        </div>
        <div className='Rating'>
          <Rating items={items} Update_Book_Page={handleUpdateBookPage} />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
