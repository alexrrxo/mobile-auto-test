import React, { useEffect, useMemo, useState } from 'react';
import './IntervalBar.css';
import { CryptoTypes, addData } from '../../store/reducers/crypto.reducer';
import { clearTimeout } from 'timers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { intervals } from '../../mocks/intervals';

const IntervalBar = () => {
  const dispatch = useAppDispatch();
  const [timerId, setTimerId] = useState();

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
        {intervals.map((interval) => (
          <option key={interval.name} value={interval.value}>
            {interval.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IntervalBar;
