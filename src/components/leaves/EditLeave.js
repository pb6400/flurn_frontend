import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  editLeave } from '../../api/leavesApi';

const EditLeave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        // Make API call to get the leave details
        const leaveData = await editLeave(id,startDate,endDate);
        console.log(leaveData);
        setStartDate(leaveData.startDate);
        setEndDate(leaveData.endDate);
        setReason(leaveData.reason);
      } catch (error) {
        setError('Error fetching leave details. Please try again.');
        console.error('Error fetching leave:', error);
      }
    };

    fetchLeave();
  });

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // client-side validation
      if (!startDate || !endDate) {
        setError('Please provide both start and end dates.');
        return;
      }

      await editLeave(id, startDate, endDate, reason);
      setSuccess('Leave updated successfully.');
      setError('');
      navigate('/leaves')

    } catch (error) {
      setError('Error updating leave. Please try again.');
      console.error('Error updating leave:', error);
    }
  };

  return (
    <div>
      <h2>Edit Leave</h2>
      <button onClick={()=>(navigate('/leaves'))}>Dadshboard</button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={handleStartDateChange} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </div>
        <div>
          <label>Reason:</label>
          <textarea value={reason} onChange={handleReasonChange} />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Update Leave</button>
      </form>
    </div>
  );
};

export default EditLeave;
