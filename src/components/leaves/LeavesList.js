import React, { useEffect, useState } from 'react';
import { getLeaves } from '../../api/leavesApi';
import { useNavigate } from 'react-router-dom';

const LeavesList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        // API call to get the list of leaves
        const leavesData = await getLeaves();
        setLeaves(leavesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  if (loading) {
    return <div>Loading leaves...</div>;
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterLeaves = () => {
    const currentDate = new Date();
    const startDate = new Date(customStartDate);
    const endDate = new Date(customEndDate);

    if (filter === 'Current Month') {
      const currentMonthLeaves = leaves.filter(
        (leave) =>
          new Date(leave.start_date).getMonth() === currentDate.getMonth()
      );
      return currentMonthLeaves;
    } else if (filter === 'Last Month') {
      const lastMonthLeaves = leaves.filter(
        (leave) =>
          new Date(leave.start_date).getMonth() ===
          currentDate.getMonth() - 1
      );
      return lastMonthLeaves;
    } else if (filter === 'Last 6 months') {
      const lastSixMonthsLeaves = leaves.filter(
        (leave) =>
          new Date(leave.start_date) >=
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 6,
              currentDate.getDate()
            )
      );
      return lastSixMonthsLeaves;
    } else if (filter === 'Last 1 year') {
      const lastYearLeaves = leaves.filter(
        (leave) =>
          new Date(leave.start_date) >=
            new Date(
              currentDate.getFullYear() - 1,
              currentDate.getMonth(),
              currentDate.getDate()
            )
      );
      return lastYearLeaves;
    } else if (filter === 'Custom dates') {
      const customDateLeaves = leaves.filter(
        (leave) =>
          new Date(leave.start_date) >= startDate &&
          new Date(leave.end_date) <= endDate
      );
      return customDateLeaves;
    }

    return leaves;
  };

  const filteredLeaves = filterLeaves();
  const upcomingLeaves = filteredLeaves.filter(
    (leave) => new Date(leave.start_date) >= new Date()
  );
  const pastLeaves = filteredLeaves.filter(
    (leave) => new Date(leave.start_date) < new Date()
  );

  const handleEditLeave = (leaveId) => {
    // Handle edit leave functionality here
    navigate(`/edit-leave/${leaveId}`);
  };

  return (
    <div>
      <h2>Leaves List</h2>
      <button onClick={() => navigate('/calendar')}>Calendar</button>
      <button onClick={() => navigate('/create-leave')}>Apply For Leave</button>
      <div>
        <label htmlFor="filter">Filter By:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Current Month">Current Month</option>
          <option value="Last Month">Last Month</option>
          <option value="Last 6 months">Last 6 months</option>
          <option value="Last 1 year">Last 1 year</option>
          <option value="Custom dates">Custom dates</option>
        </select>
      </div>
      {filter === 'Custom dates' && (
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={customStartDate}
            onChange={(event) => setCustomStartDate(event.target.value)}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={customEndDate}
            onChange={(event) => setCustomEndDate(event.target.value)}
          />
        </div>
      )}
      {upcomingLeaves.length === 0 && pastLeaves.length === 0 ? (
        <p>No leaves found.</p>
      ) : (
        <div>
          {upcomingLeaves.length > 0 && (
            <div>
              <h3>Upcoming Leaves</h3>
              <ul>
                {upcomingLeaves.map((leave) => (
                  <li key={leave.id}>
                    <strong>Start Date:</strong> {leave.start_date} <br />
                    <strong>End Date:</strong> {leave.end_date} <br />
                    <strong>Reason:</strong> {leave.reason} <br />
                    <button onClick={() => handleEditLeave(leave.id)}>
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pastLeaves.length > 0 && (
            <div>
              <h3>Past Leaves</h3>
              <ul>
                {pastLeaves.map((leave) => (
                  <li key={leave.id}>
                    <strong>Start Date:</strong> {leave.start_date} <br />
                    <strong>End Date:</strong> {leave.end_date} <br />
                    <strong>Reason:</strong> {leave.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default LeavesList;
