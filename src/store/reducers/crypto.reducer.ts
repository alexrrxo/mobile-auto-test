import { cutArray, getDataFromLocalstorage } from '../../helpers/localstorage';
import { intervalConverter, timeConverter } from '../../helpers/timeConverter';
import { ICrypto, InitialState } from '../../types/store/crypto.reducer.type';
import { coinMarketApi } from './../../api/coinMarketApi';
import { IRootState } from '..';

const initialState: InitialState = {
  sortedBy: 'later',
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
  ADD_DATA = 'GET_DATA',
  SET_DATA = 'SET_DATA',
  SET_PAGE_DATA = 'SET_PAGE_DATA',
  SET_UPDATE_INTERVAL = 'SET_UPDATE_INTERVAL',
}

const cryptoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CryptoTypes.INITIALIZE_APP: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case CryptoTypes.SORT_DATA_HIGH: {
      debugger;
      return {
        ...state,
        data: [...state.data].sort((a, b) => b.price - a.price),
        sortedBy: 'high' as typeof state.sortedBy,
      };
    }
    case CryptoTypes.SORT_DATA_LOW: {
      debugger;
      return {
        ...state,
        data: [...state.data].sort((a, b) => a.price - b.price),
        sortedBy: 'low' as typeof state.sortedBy,
      };
    }
    case CryptoTypes.SORT_DATA_LATER: {
      debugger;
      return {
        ...state,
        data: [...state.data].sort((a, b) => b.timeStamp - a.timeStamp),
        sortedBy: 'later' as typeof state.sortedBy,
      };
    }
    case CryptoTypes.SORT_DATA_EARLIER: {
      debugger;
      return {
        ...state,
        data: [...state.data].sort((a, b) => a.timeStamp - b.timeStamp),
        sortedBy: 'earlier' as typeof state.sortedBy,
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

    case CryptoTypes.ADD_DATA: {
      return {
        ...state,
        data: [action.payload, ...state.data],
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

export const addData = () => {
  debugger;
  return async (dispatch: any, getState: () => IRootState) => {
    try {
      const response = await coinMarketApi.getData();
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
        updatedBtcData.unshift({ ...btcData });
        localStorage.setItem('btcData', JSON.stringify(updatedBtcData));
      }

      dispatch({
        type: CryptoTypes.SET_DATA,
        payload: JSON.parse(localStorage.getItem('btcData') as string),
      });

      const { sortedBy } = getState().crypto;

      sortedBy === 'high' && dispatch({ type: CryptoTypes.SORT_DATA_HIGH });
      sortedBy === 'low' && dispatch({ type: CryptoTypes.SORT_DATA_LOW });
      sortedBy === 'later' && dispatch({ type: CryptoTypes.SORT_DATA_LATER });
      sortedBy === 'earlier' &&
        dispatch({ type: CryptoTypes.SORT_DATA_EARLIER });
    } catch (error) {
      alert(error);
    }
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
