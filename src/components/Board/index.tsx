import React from 'react';
import IntervalBar from '../IntervalBar';
import Tables from '../Tables';
import Pagination from '../Pagination';
import { getData } from '../../store/reducers/crypto.reducer';
import { useDispatch } from 'react-redux';

import './Board.css';

const Board = () => {
  const dispatch = useDispatch();

  const getDataHandler = () => {
    dispatch<any>(getData());
  };

  return (
    <div className="board">
      <IntervalBar />
      <Tables />
      <Pagination />

      <button onClick={getDataHandler}>get data from coinApi</button>
    </div>
  );
};

export default Board;
