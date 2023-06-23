import { cutArray, getDataFromLocalstorage } from '../../helpers/localstorage';
import { intervalConverter } from '../../helpers/timeConverter';
import { InitialState } from '../../types/store/crypto.reducer.type';
import { coinMarketApi } from './../../api/coinMarketApi';
import { RootState } from '..';
import {
  addBtcToLocalstorage,
  convertBtcData,
} from '../../helpers/dataHandlers';
import { Dispatch } from 'react';

const initialState: InitialState = {
  sortedBy: 'later',
  totalNotes: 10,
  currentPage: 1,
  limit: 10,
  updateInterval: 60000,
  pageData: [],
  data: [],
  timerId: null,
};

export enum CryptoTypes {
  SORT_DATA_LOW = 'SORT_DATA_LOW',
  SORT_DATA_HIGH = 'SORT_DATA_HIGH',
  SORT_DATA_LATER = 'SORT_DATA_LATER',
  SORT_DATA_EARLIER = 'SORT_DATA_EARLIER',
  SET_PAGE = 'SET_PAGE',
  SET_TOTAL_NOTES = 'SET_TOTAL_NOTES',
  ADD_DATA = 'ADD_DATA',
  SET_DATA = 'SET_DATA',
  SET_PAGE_DATA = 'SET_PAGE_DATA',
  SET_UPDATE_INTERVAL = 'SET_UPDATE_INTERVAL',
  SET_TIMER_ID = 'SET_TIMER_ID',
}

const cryptoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CryptoTypes.SORT_DATA_HIGH: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => b.price - a.price),
        sortedBy: 'high' as typeof state.sortedBy,
      };
    }
    case CryptoTypes.SORT_DATA_LOW: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => a.price - b.price),
        sortedBy: 'low' as typeof state.sortedBy,
      };
    }
    case CryptoTypes.SORT_DATA_LATER: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => b.timeStamp - a.timeStamp),
        sortedBy: 'later' as typeof state.sortedBy,
      };
    }
    case CryptoTypes.SORT_DATA_EARLIER: {
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
      return {
        ...state,
        totalNotes: getDataFromLocalstorage().length,
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

    case CryptoTypes.SET_TIMER_ID: {
      return {
        ...state,
        timerId: action.payload,
      };
    }
  }
};

export const addData = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    try {
      const { sortedBy } = getState().crypto;
      const data = await coinMarketApi.getData();
      const btcData = convertBtcData(data);
      addBtcToLocalstorage(btcData);

      dispatch({
        type: CryptoTypes.SET_DATA,
        payload: JSON.parse(localStorage.getItem('btcData') as string),
      });

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
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { limit, currentPage } = getState().crypto;
    const data = getDataFromLocalstorage();
    const pageData = cutArray(currentPage, limit, data);

    dispatch({ type: CryptoTypes.SET_TOTAL_NOTES });
    dispatch({ type: CryptoTypes.SET_DATA, payload: data });
    dispatch({ type: CryptoTypes.SET_PAGE_DATA, payload: pageData });
  };
};

export const setPage = (pageNumber: number) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { limit, data } = getState().crypto;
    const pageData = cutArray(pageNumber, limit, data);

    dispatch({ type: CryptoTypes.SET_PAGE_DATA, payload: pageData });
    dispatch({ type: CryptoTypes.SET_PAGE, payload: pageNumber });
  };
};

export default cryptoReducer;
