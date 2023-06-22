import React, { useEffect } from 'react';
import './IntervalBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { CryptoTypes, getData } from '../../store/reducers/crypto.reducer';
import { IRootState } from '../../store';

const IntervalBar = () => {
  const dispatch = useDispatch();
  const { updateInterval, data } = useSelector(
    (state: IRootState) => state.crypto
  );
  const getDataHandler = () => {
    dispatch<any>(getData());
  };

  const sendRequest = () => {
    setInterval(() => {
      getDataHandler();
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
