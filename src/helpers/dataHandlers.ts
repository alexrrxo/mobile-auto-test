import { ICrypto } from '../types/store/crypto.reducer.type';
import { dateConverter } from './timeConverter';

type ResponseBtcDataType = {
  id: number;
  quote: {
    USD: {
      price: number;
    };
  };
  last_updated: string;
};

export const convertBtcData = (data: ResponseBtcDataType): ICrypto => {
  const btcData = {
    id: String(data.id) + new Date().getTime(),
    date: dateConverter(data.last_updated),
    price: data.quote.USD.price,
    timeStamp: new Date(data.last_updated).getTime(),
  };
  return btcData;
};

export const addBtcToLocalstorage = (btcData: ICrypto) => {
  const localStorageData = localStorage.getItem('btcData');
  if (!localStorageData) {
    localStorage.setItem('btcData', JSON.stringify([btcData]));
  } else {
    const updatedBtcData = JSON.parse(localStorageData);
    updatedBtcData.unshift({ ...btcData });
    localStorage.setItem('btcData', JSON.stringify(updatedBtcData));
  }
};
