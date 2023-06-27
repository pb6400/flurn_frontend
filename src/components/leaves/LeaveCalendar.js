import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getLeaves } from '../../api/leavesApi';
import { useNavigate } from 'react-router-dom';
import './calendar.css'
const LeaveCalendar = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const leavesData = await getLeaves();
        setLeaves(leavesData);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);



  function tileContent({ date, view }) {
    const highlightedDates = [];
  
    leaves.forEach((l) => {
      const startDate = new Date(l.start_date);
      const endDate = new Date(l.end_date);
  
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        highlightedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  
    if (view === 'month' && highlightedDates.find((d) => d.toDateString() === date.toDateString())) {
      return <div className="leave_date">-</div>;
    }
    return null;
  }
  



  if (loading) {
    return <div>Loading leaves...</div>;
  }

  return (
    <div>
      <h2>Leave Calendar</h2>
      <button onClick={()=>navigate('/leaves')}>Dashboard</button>
      <Calendar tileContent={tileContent}  />
    </div>
  );
};

export default LeaveCalendar;
