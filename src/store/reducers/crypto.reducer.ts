import { timeConverter } from '../../helpers/timeConverter';
import { InitialState } from '../../types/store/crypto.reducer.type';
import { coinMarketApi } from './../../api/coinMarketApi';

const initialState: InitialState = {
  priceSort: null,
  dateSort: null,
  totalNotes: 95,
  currentPage: 4,
  limit: 10,
  data: [],
};

export enum CryptoTypes {
  INITIALIZE_APP = 'INITIALIZE_APP',
  SORT_DATA_LOW = 'SORT_DATA_LOW',
  SORT_DATA_HIGH = 'SORT_DATA_HIGH',
  SORT_DATA_LATER = 'SORT_DATA_LATER',
  SORT_DATA_EARLIER = 'SORT_DATA_EARLIER',
  SET_PAGE = 'SET_PAGE',
  GET_DATA = 'GET_DATA',
}

const cryptoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CryptoTypes.INITIALIZE_APP: {
      const dataFromLocalstorage = localStorage.getItem('btcData');
      return {
        ...state,
        data: !dataFromLocalstorage ? [] : JSON.parse(dataFromLocalstorage),
      };
    }
    case CryptoTypes.SORT_DATA_HIGH: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => b.price - a.price),
        priceSort: 'high' as typeof state.priceSort,
        dateSort: null,
      };
    }
    case CryptoTypes.SORT_DATA_LOW: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => a.price - b.price),
        priceSort: 'low' as typeof state.priceSort,
        dateSort: null,
      };
    }
    case CryptoTypes.SORT_DATA_LATER: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => b.timeStamp - a.timeStamp),
        dateSort: 'later' as typeof state.dateSort,
        priceSort: null,
      };
    }
    case CryptoTypes.SORT_DATA_EARLIER: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => a.timeStamp - b.timeStamp),
        dateSort: 'earlier' as typeof state.dateSort,
        priceSort: null,
      };
    }

    case CryptoTypes.SET_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case CryptoTypes.GET_DATA: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    default:
      return state;
  }
};

export const getData = () => {
  return async (dispatch: any) => {
    const response = await coinMarketApi.getData();
    console.log(response.last_updated);
    const btcData = {
      id: String(response.id) + new Date().getTime(),
      time: timeConverter(response.last_updated),
      price: response.quote.USD.price,
      timeStamp: new Date(response.last_updated).getTime(),
    };
    const localData = localStorage.getItem('btcData');
    if (!localData) {
      localStorage.setItem('btcData', JSON.stringify([btcData]));
    } else {
      const updatedBtcData = JSON.parse(localData);
      updatedBtcData.push({ ...btcData });
      localStorage.setItem('btcData', JSON.stringify(updatedBtcData));
    }

    return dispatch({ type: CryptoTypes.GET_DATA, payload: btcData });
  };
};

export default cryptoReducer;
