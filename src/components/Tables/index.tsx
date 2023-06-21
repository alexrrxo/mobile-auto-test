import React from 'react';
import './Tables.css';

import upArrow from '../../assets/icons/up-arrow.svg';
import downArrow from '../../assets/icons/down-arrow.svg';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { ICrypto } from '../../types/store/crypto.reducer.type';

const Tables = () => {
  const { data } = useSelector((state: IRootState) => state.crypto);

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
          {data.map((crypto: ICrypto) => (
            <p>{crypto.time}</p>
          ))}
        </div>
        <div>
          {data.map((crypto: ICrypto) => (
            <p>{crypto.price}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tables;
