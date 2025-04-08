import React, { useEffect, useState } from 'react'
import rupee from '../../assets/FlightCardPics/rupee.svg';
import './FlightUserDetails.css'

const FlightUserDetails = ({ items, user_info }) => {
  if(!user_info){
    return (<></>)
  }

  function DateDifference(date1, date2) {
    let startDate = new Date(date1);
    let endDate = new Date(date2);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0); 
    let diff = endDate - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days;
}

function TimeDifference(time1, time2) {
  let [hours1, minutes1] = time1.split(':').map(Number);
  let [hours2, minutes2] = time2.split(':').map(Number);
  let startTime = new Date(0, 0, 0, hours1, minutes1);
  let endTime = new Date(0, 0, 0, hours2, minutes2);
  let diff = endTime - startTime;
  if (diff < 0) {
      diff += 24 * 60 * 60 * 1000;
  }
  let hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  let minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  return {
      hours: hours,
      minutes: minutes,
  };
}

  let date_duration = DateDifference(items.Departure_Date , items.Arrival_Date)
  let time_duration = TimeDifference(items.Departure_Time , items.Arrival_Time)

  return (

    <div className='Book_Parent'>

      <div className="Book_Flight">
        <div className="Book_Flight_Num">{items.Num}</div> 
        <div className="Book_Flight_Detail">
          <div className="Book_Depart">
            <div className='Book_Depart_Time'>{items.Departure_Time}</div>
            <div className='Book_Depart_Code'>{items.Departure_City_Code}</div>
            <div className='Book_Depart_Name'>{items.Departure_City_Name}</div>
            <div className='Book_Depart_Airport'>{items.Departure_City_Airport}</div>
          </div>

 
          <div className="Book_Pic">
          <div className='Book_Duration'>{`${date_duration} days : ${time_duration.hours} hours:${time_duration.minutes} minutes`}</div>
          <div className='Book_Single_Line'></div>
          <div><img className='Flight_Card_Little_Plane' width={20} src="https://cdn.iconscout.com/icon/free/png-512/free-airplane-12-84063.png?f=webp&w=256" alt="" /></div>
          </div>

 

          <div className="Book_Arrive">
            <div className='Book_Arrive_Time'>{items.Arrival_Time}</div>
            <div className='Book_Arrive_Code'>{items.Arrival_City_Code}</div>
            <div className='Book_Arrive_Name'>{items.Arrival_City_Name}</div>
            <div className='Book_Arrive_Airport'>{items.Arrival_City_Airport}</div>
          </div>
        </div>
        <div className="Book_Flight_Amount"><img src={rupee} alt="" /><span>{items.Price}</span></div>
      </div>
      <div className="Book_User">
        <div className='Book_User_details'>User</div>
        <div className='Book_User_Name'>{user_info.name}</div>
        <div className='Book_User_Email'>{user_info.email}</div>
        <div className='Book_User_Phone'>{user_info.phone}</div>
      </div>
 
    </div>
  )
}

export default FlightUserDetails
