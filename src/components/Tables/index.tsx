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
  const sortHandlerLater = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_LATER });
  };
  const sortHandlerEarlier = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_EARLIER });
  };

  return (
    <div className="tables">
      <div className="tables__buttons">
        {dateSort === 'later' ? (
          <TableButton
            clickHandler={sortHandlerEarlier}
            imgSrc={dateSort ? upArrow : ''}
            text="Дата/Время"
          />
        ) : (
          <TableButton
            clickHandler={sortHandlerLater}
            imgSrc={dateSort ? downArrow : ''}
            text="Дата/Время"
          />
        )}

        {priceSort === 'high' ? (
          <TableButton
            clickHandler={sortHandlerLow}
            imgSrc={priceSort ? upArrow : ''}
            text="Цена"
          />
        ) : (
          <TableButton
            clickHandler={sortHandlerHigh}
            imgSrc={priceSort ? downArrow : ''}
            text="Цена"
          />
        )}
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
