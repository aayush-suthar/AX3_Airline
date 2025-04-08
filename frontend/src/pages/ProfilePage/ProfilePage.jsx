import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; 
import Navbar from '../../Components/Navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
const fetch_url = import.meta.env.VITE_BACKEND_URL
const ProfilePage = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [flights, setFlights] = useState([]);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    if (!user) {
      alert("Please Login First");
      navigate("/login");
    }
  }, [navigate]);

  const fetchUpcomingFlights = async () => {
    try {
      const response = await fetch(fetch_url + '/get_user_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      setFlights(data.presentbook || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUpcomingFlights();
    }
  }, [temp, user]);

  const handleCancelFlight = async (flight) => {
    try {
      const postData = { items: flight, user_info: user };
      const response = await fetch(fetch_url + '/cancle_flight', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      setTemp(temp + 1);
      if (!response.ok) {
        throw new Error('Failed to cancel flight');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error cancelling flight:', error);
    }
  };

  if (!user) {
    return null;
  }

  const { email, name, phone, username } = user;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <h1>User Profile</h1>
          <div className="profile-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Username:</strong> {username}</p>
          </div>
          <div className="flights-container">
            {flights.length > 0 ? (
              flights.map((flight, index) => (
                <div key={index} className="flight-card">
                  <div className="flightcard_1">
                    <p><strong>Flight Number:</strong> {flight.Num}</p>
                    <p><strong>Departure:</strong> {flight.Departure_City_Name} at {flight.Departure_Time} on {flight.Departure_Date}</p>
                    <p><strong>Arrival:</strong> {flight.Arrival_City_Name} at {flight.Arrival_Time} on {flight.Arrival_Date}</p>
                    <p><strong>Seat:</strong> {flight.Seat}</p>
                  </div>
                  <div className="flight_cancel" onClick={() => handleCancelFlight(flight)}>
                    <span>Cancel</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming flights</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
