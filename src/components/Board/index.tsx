import React from 'react';
import IntervalBar from '../IntervalBar';
import Tables from '../Tables';
import Pagination from '../Pagination';
import { coinMarketApi } from '../../api/coinMarketApi';

const Board = () => {
  const getData = async () => {
    const response = await coinMarketApi.getData();
    console.log(response);
  };

  return (
    <div>
      <IntervalBar />
      <Tables />
      <Pagination />

      <button onClick={getData}>get data from coinApi</button>
    </div>
  );
};

export default Board;
