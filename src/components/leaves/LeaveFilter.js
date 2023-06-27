import React, { useState } from 'react';

const LeaveFilter = ({ onFilter }) => {
  const [filterType, setFilterType] = useState('');

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div>
      <h2>Leave Filter</h2>
      <select value={filterType} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="currentMonth">Current Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="last6Months">Last 6 Months</option>
        <option value="lastYear">Last 1 Year</option>
        <option value="custom">Custom Dates</option>
      </select>
    </div>
  );
};

export default LeaveFilter;
