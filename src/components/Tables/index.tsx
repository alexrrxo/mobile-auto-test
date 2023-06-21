import React from 'react';
import './Tables.css';

import upArrow from '../../assets/icons/up-arrow.svg';
import downArrow from '../../assets/icons/down-arrow.svg';

const Tables = () => {
  return (
    <div className="tables">
      <div className="tables__buttons">
        <button className="tables__button">
          Дата/Время
          <img className="arrow" src={upArrow} alt="" />
        </button>
        <button className="tables__button">
          Цена
          <img className="arrow" src={downArrow} alt="" />
        </button>
      </div>
      <div className="tables__data">
        <div>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
        <div>
          <p>2.99</p>
          <p>4.00</p>
          <p>6.23</p>
          <p>4.21</p>
          <p>5.22</p>
        </div>
      </div>
    </div>
  );
};

export default Tables;
