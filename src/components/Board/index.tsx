import React from 'react';
import IntervalBar from '../IntervalBar';
import Tables from '../Tables';
import Pagination from '../Pagination';
import { addData } from '../../store/reducers/crypto.reducer';

import './Board.css';
import { useAppDispatch } from '../../hooks';

const Board = () => {
  const dispatch = useAppDispatch();

  const addDataHandler = () => {
    dispatch(addData());
  };

  return (
    <div className="board">
      <IntervalBar />
      <Tables />
      <Pagination />

      <button onClick={addDataHandler}>123</button>
    </div>
  );
};

export default Board;
