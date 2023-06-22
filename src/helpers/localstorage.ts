import { ICrypto } from '../types/store/crypto.reducer.type';

export const getDataFromLocalstorage = () => {
  const dataFromLocalstorage = localStorage.getItem('btcData');
  const data = dataFromLocalstorage
    ? JSON.parse(dataFromLocalstorage).reverse()
    : [];

  return data;
};

export const cutArray = (
  pageNumber?: number,
  limit?: number,
  dataNotes?: ICrypto[]
) => {
  if (pageNumber && limit && dataNotes) {
    const from = (pageNumber - 1) * limit;
    const to = pageNumber * limit;
    debugger;
    return dataNotes.slice(from, to);
  }
};
