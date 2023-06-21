import React from 'react';
import './Tables.css';

import upArrow from '../../assets/icons/up-arrow.svg';
import downArrow from '../../assets/icons/down-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { ICrypto } from '../../types/store/crypto.reducer.type';
import { CryptoTypes } from '../../store/reducers/crypto.reducer';
import TableButton from './TableButton';

const Tables = () => {
  const dispatch = useDispatch();
  const { data, priceSort, dateSort } = useSelector(
    (state: IRootState) => state.crypto
  );

  const sortHandlerHigh = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_HIGH });
  };
  const sortHandlerLow = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_LOW });
  };

  return (
    <div className="tables">
      <div className="tables__buttons">
        <button className="tables__button">
          Дата/Время
          <img className="arrow" src={upArrow} alt="" />
        </button>

        <TableButton
          clickHandler={sortHandlerHigh}
          imgSrc={downArrow}
          text="Цена"
        />
        <TableButton
          clickHandler={sortHandlerLow}
          imgSrc={upArrow}
          text="Цена"
        />
      </div>
      <div className="tables__data">
        {data.map((crypto: ICrypto) => (
          <div className="table__row" key={crypto.id}>
            <div>{crypto.time}</div>
            <div>{crypto.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
