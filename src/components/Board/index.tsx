import React from 'react';
import IntervalBar from '../IntervalBar';
import Tables from '../Tables';
import Pagination from '../Pagination';
import { CryptoTypes, addData } from '../../store/reducers/crypto.reducer';
import { useDispatch, useSelector } from 'react-redux';

import './Board.css';
import { IRootState } from '../../store';

const Board = () => {
  const dispatch = useDispatch();
  const { totalNotes } = useSelector((state: IRootState) => state.crypto);

  const addDataHandler = () => {
    dispatch<any>(addData());
    dispatch({ type: CryptoTypes.SET_TOTAL_NOTES, payload: totalNotes + 1 });
  };

  return (
    <div className="board">
      <IntervalBar />
      <Tables />
      <Pagination />

      <button onClick={addDataHandler}>add data from coinApi</button>
    </div>
  );
};

export default Board;
