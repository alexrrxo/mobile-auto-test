import React from 'react';
import './IntervalBar.css';

const IntervalBar = () => {
  return (
    <div className="interval-bar">
      <span>Интервал сканирования</span>
      <select>
        <option value={1}>1 мин</option>
        <option value={5}>5 мин</option>
        <option value={30}>30 мин</option>
        <option value={60}>60 мин</option>
      </select>
    </div>
  );
};

export default IntervalBar;
