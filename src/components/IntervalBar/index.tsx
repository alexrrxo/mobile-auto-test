import React, { useEffect, useMemo, useState } from 'react';
import './IntervalBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { CryptoTypes, addData } from '../../store/reducers/crypto.reducer';
import { IRootState } from '../../store';
import { clearTimeout } from 'timers';

const IntervalBar = () => {
  const dispatch = useDispatch();
  const { updateInterval, data, totalNotes } = useSelector(
    (state: IRootState) => state.crypto
  );

  const getDataHandler = () => {
    dispatch<any>(addData());
    dispatch({ type: CryptoTypes.SET_TOTAL_NOTES, payload: totalNotes + 1 });
    sendRequest();
  };

  const sendRequest = () => {
    setTimeout(() => {
      getDataHandler();
    }, updateInterval);
  };

  const changeIntervalHandler = (e: any) => {
    dispatch({
      type: CryptoTypes.SET_UPDATE_INTERVAL,
      payload: e.target.value,
    });
  };

  // useEffect(() => {
  //   sendRequest();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      sendRequest();
    }, 1000);
  }, [data]);

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
