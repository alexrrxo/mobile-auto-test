import React, { useEffect } from 'react';
import './IntervalBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { CryptoTypes, addData } from '../../store/reducers/crypto.reducer';
import { IRootState } from '../../store';
import { IDateSort, IPriceSort } from '../../types/store/crypto.reducer.type';

const IntervalBar = () => {
  const dispatch = useDispatch();
  const { updateInterval, dateSort, priceSort } = useSelector(
    (state: IRootState) => state.crypto
  );
  const getDataHandler = () => {
    dispatch<any>(addData());
  };

  const sendRequest = () => {
    setInterval(() => {
      getDataHandler();
      rerenderData();
    }, updateInterval);
  };

  const changeIntervalHandler = (e: any) => {
    dispatch({
      type: CryptoTypes.SET_UPDATE_INTERVAL,
      payload: e.target.value,
    });
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const rerenderData = () => {
    if (dateSort === 'later') {
      dispatch({ type: CryptoTypes.SORT_DATA_EARLIER });
      dispatch({ type: CryptoTypes.SORT_DATA_LATER });
    }
    if (dateSort === 'earlier') {
      dispatch({ type: CryptoTypes.SORT_DATA_LATER });
      dispatch({ type: CryptoTypes.SORT_DATA_EARLIER });
    }
    if (priceSort === 'high') {
      dispatch({ type: CryptoTypes.SORT_DATA_LOW });
      dispatch({ type: CryptoTypes.SORT_DATA_HIGH });
    }
    if (priceSort === 'low') {
      dispatch({ type: CryptoTypes.SORT_DATA_HIGH });
      dispatch({ type: CryptoTypes.SORT_DATA_LOW });
    }
  };

  return (
    <div className="interval-bar">
      <span>Интервал сканирования</span>
      <select onChange={changeIntervalHandler}>
        <option value={60}>1 мин</option>
        <option value={1800}>30 мин</option>
        <option value={3600}>1 час</option>
      </select>
    </div>
  );
};

export default IntervalBar;
