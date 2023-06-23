import React, { useEffect, useMemo, useState } from 'react';
import './IntervalBar.css';
import { CryptoTypes, addData } from '../../store/reducers/crypto.reducer';
import { clearTimeout } from 'timers';
import { useAppDispatch, useAppSelector } from '../../hooks';

type setTimeoutType = ReturnType<typeof setTimeout>;

const IntervalBar = () => {
  const dispatch = useAppDispatch();
  const [timerId, setTimerId] = useState<setTimeoutType>();

  const { updateInterval, totalNotes } = useAppSelector(
    (state) => state.crypto
  );
  debugger;

  const getDataHandler = () => {
    debugger;
    dispatch(addData());
    dispatch({ type: CryptoTypes.SET_TOTAL_NOTES, payload: totalNotes + 1 });
    sendRequest(updateInterval);
  };

  const sendRequest = (interval: number) => {
    const timer = setTimeout(() => {
      getDataHandler();
    }, interval);
    setTimerId(timer);

    debugger;
  };

  const changeIntervalHandler = (e: any) => {
    dispatch({
      type: CryptoTypes.SET_UPDATE_INTERVAL,
      payload: e.target.value,
    });
    window.clearTimeout(timerId);
    debugger;
    setTimerId(undefined);
    sendRequest(e.target.value * 1000);
  };

  useEffect(() => {
    sendRequest(updateInterval);
    debugger;
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
