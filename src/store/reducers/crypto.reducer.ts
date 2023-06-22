import { IRootState } from '..';
import { cutArray, getDataFromLocalstorage } from '../../helpers/localstorage';
import { getPagesArray } from '../../helpers/pagination';
import { intervalConverter, timeConverter } from '../../helpers/timeConverter';
import { ICrypto, InitialState } from '../../types/store/crypto.reducer.type';
import { coinMarketApi } from './../../api/coinMarketApi';

const initialState: InitialState = {
  priceSort: null,
  dateSort: null,
  totalNotes: 10,
  currentPage: 1,
  limit: 10,
  updateInterval: 60000,
  pageData: [],
  data: [],
};

export enum CryptoTypes {
  INITIALIZE_APP = 'INITIALIZE_APP',
  SORT_DATA_LOW = 'SORT_DATA_LOW',
  SORT_DATA_HIGH = 'SORT_DATA_HIGH',
  SORT_DATA_LATER = 'SORT_DATA_LATER',
  SORT_DATA_EARLIER = 'SORT_DATA_EARLIER',
  SET_PAGE = 'SET_PAGE',
  SET_TOTAL_NOTES = 'SET_TOTAL_NOTES',
  GET_DATA = 'GET_DATA',
  SET_DATA = 'SET_DATA',
  SET_PAGE_DATA = 'SET_PAGE_DATA',
  SET_UPDATE_INTERVAL = 'SET_UPDATE_INTERVAL',
}

const cryptoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CryptoTypes.INITIALIZE_APP: {
      // const dataFromLocalstorage = localStorage.getItem('btcData');
      return {
        ...state,
        data: action.payload,
        // data: !dataFromLocalstorage
        //   ? []
        //   : JSON.parse(dataFromLocalstorage).reverse(),
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

    case CryptoTypes.SET_TOTAL_NOTES: {
      const dataFromLocalstorage = localStorage.getItem('btcData');
      return {
        ...state,
        totalNotes: dataFromLocalstorage
          ? JSON.parse(dataFromLocalstorage).length
          : 0,
      };
    }

    case CryptoTypes.GET_DATA: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case CryptoTypes.SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case CryptoTypes.SET_PAGE_DATA: {
      return {
        ...state,
        pageData: action.payload,
      };
    }

    case CryptoTypes.SET_UPDATE_INTERVAL: {
      return {
        ...state,
        updateInterval: intervalConverter(action.payload),
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

export const initializeApp = () => {
  return (dispatch: any) => {
    dispatch({ type: CryptoTypes.SET_TOTAL_NOTES });

    const data = getDataFromLocalstorage();
    const pageData = cutArray(1, 10, data);

    dispatch({ type: CryptoTypes.INITIALIZE_APP, payload: data });
    dispatch({ type: CryptoTypes.SET_PAGE_DATA, payload: pageData });
  };
};

export const setPage = (
  pageNumber: number,
  limit: number,
  dataNotes: ICrypto[]
) => {
  return (dispatch: any) => {
    const pageData = cutArray(pageNumber, limit, dataNotes);

    dispatch({ type: CryptoTypes.SET_PAGE_DATA, payload: pageData });
    dispatch({ type: CryptoTypes.SET_PAGE, payload: pageNumber });
  };
};

export default cryptoReducer;
