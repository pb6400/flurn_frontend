import React, { useState } from 'react';
import { applyLeave } from '../../api/leavesApi';
import { useNavigate } from 'react-router-dom';
const CreateLeave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
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

      await applyLeave(startDate, endDate, reason);
      setSuccess('Leave applied successfully.');
      setError('');
      setStartDate('');
      setEndDate('');
      setReason('');
      console.log("Done Creating leave")
      navigate('/leaves');

    } catch (error) {
      setError('Error applying for leave. Please try again.');
      console.error('Error applying for leave:', error);
    }
  };

  return (
    <div>
      <h2>Create Leave</h2>
      <button onClick={()=>(navigate('/leaves'))}>Dadshboard</button>
      <button onClick={()=>(navigate('/calendar'))}>Calendar</button>

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
        <button type="submit">Apply Leave</button>
      </form>
    </div>
  );
};

export default CreateLeave;
