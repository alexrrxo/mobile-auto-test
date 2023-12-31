import { ICrypto } from './../types/store/crypto.reducer.type';

export const getDataFromLocalstorage = () => {
  const dataFromLocalstorage = localStorage.getItem('btcData');
  const data: ICrypto[] = dataFromLocalstorage
    ? JSON.parse(dataFromLocalstorage)
    : [];

  return data;
};

export const cutArray = (
  pageNumber: number,
  limit: number,
  dataNotes: ICrypto[]
) => {
  const from = (pageNumber - 1) * limit;
  const to = pageNumber * limit;
  return dataNotes.slice(from, to);
};
