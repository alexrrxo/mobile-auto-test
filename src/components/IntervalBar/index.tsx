import React, { useEffect } from 'react';
import './IntervalBar.css';

const IntervalBar = () => {
  useEffect(() => {}, []);

  return (
    <div className="interval-bar">
      <span>Интервал сканирования</span>
      <select>
        <option value={1}>1 мин</option>
        <option value={30}>30 мин</option>
        <option value={60}>1 час</option>
      </select>
    </div>
  );
};

export default IntervalBar;
