import React, { useEffect } from 'react';
import './Tables.css';

import upArrow from '../../assets/icons/up-arrow.svg';
import downArrow from '../../assets/icons/down-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { ICrypto } from '../../types/store/crypto.reducer.type';
import { CryptoTypes } from '../../store/reducers/crypto.reducer';
import TableButton from './TableButton';
import { cutArray } from '../../helpers/localstorage';

const Tables = () => {
  const dispatch = useDispatch();
  const { sortedBy, pageData, data, currentPage, limit } = useSelector(
    (state: IRootState) => state.crypto
  );

  const sortHighHandler = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_HIGH });
  };
  const sortLowHandler = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_LOW });
  };
  const sortLaterHandler = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_LATER });
  };
  const sortEarlierHandler = () => {
    dispatch({ type: CryptoTypes.SORT_DATA_EARLIER });
  };

  useEffect(() => {
    const pageData = cutArray(currentPage, limit, data);

    dispatch({ type: CryptoTypes.SET_PAGE_DATA, payload: pageData });
  }, [data]);

  return (
    <div className="tables">
      <div className="tables__buttons">
        {sortedBy === 'later' || sortedBy === null ? (
          <TableButton
            clickHandler={sortEarlierHandler}
            imgSrc={upArrow}
            text="Дата/Время"
          />
        ) : (
          <TableButton
            clickHandler={sortLaterHandler}
            imgSrc={sortedBy === 'earlier' ? downArrow : ''}
            text="Дата/Время"
          />
        )}

        {sortedBy === 'high' ? (
          <TableButton
            clickHandler={sortLowHandler}
            imgSrc={sortedBy === 'high' ? upArrow : ''}
            text="Цена"
          />
        ) : (
          <TableButton
            clickHandler={sortHighHandler}
            imgSrc={sortedBy === 'low' ? downArrow : ''}
            text="Цена"
          />
        )}
      </div>
      <div className="tables__data">
        {pageData.map((crypto: ICrypto) => (
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
