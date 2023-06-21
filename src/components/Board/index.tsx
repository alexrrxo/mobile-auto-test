import React from 'react';
import IntervalBar from '../IntervalBar';
import Tables from '../Tables';
import Pagination from '../Pagination';
import { coinMarketApi } from '../../api/coinMarketApi';
import { getData } from '../../store/reducers/crypto.reducer';
import { useDispatch } from 'react-redux';

const Board = () => {
  const dispatch = useDispatch();

  const getDataHandler = () => {
    dispatch<any>(getData());
  };

  return (
    <div>
      <IntervalBar />
      <Tables />
      <Pagination />

      <button onClick={getDataHandler}>get data from coinApi</button>
    </div>
  );
};

export default Board;
