import { CryptoTypes } from '../store/reducers/crypto.reducer';
import {
  ICrypto,
  IDateSort,
  IPriceSort,
} from '../types/store/crypto.reducer.type';

export const getDataFromLocalstorage = () => {
  const dataFromLocalstorage = localStorage.getItem('btcData');
  const data = dataFromLocalstorage ? JSON.parse(dataFromLocalstorage) : [];

  return data;
};

export const cutArray = (
  pageNumber: number,
  limit: number,
  dataNotes: ICrypto[]
) => {
  if (pageNumber && limit && dataNotes) {
    const from = (pageNumber - 1) * limit;
    const to = pageNumber * limit;
    return dataNotes.slice(from, to);
  }
};
