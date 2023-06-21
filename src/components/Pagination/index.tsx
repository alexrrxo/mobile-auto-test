import React from 'react';
import './Pagination.css';

const Pagination = () => {
  return (
    <div className="pagination">
      <button>1</button>
      <button>...</button>
      <button>3</button>
      <button className="currentPage">4</button>
      <button>5</button>
      <button>...</button>
      <button>7</button>
    </div>
  );
};

export default Pagination;
