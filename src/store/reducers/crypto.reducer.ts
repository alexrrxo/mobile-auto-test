import { timeConverter } from '../../helpers/timeConverter';
import { InitialState } from '../../types/store/crypto.reducer.type';
import { coinMarketApi } from './../../api/coinMarketApi';

const initialState: InitialState = {
  isFetching: true,
  errorMessage: '',
  data: [],
};

export enum CryptoTypes {
  INITIALIZE_APP = 'INITIALIZE_APP',
  GET_DATA = 'GET_DATA',
}

type PriceSort = 'High' | 'Low';
type DateSort = 'Earlier' | 'Later';

const cryptoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CryptoTypes.INITIALIZE_APP: {
      const dataFromLocalstorage = localStorage.getItem('btcData');
      return {
        ...state,
        data: !dataFromLocalstorage ? [] : JSON.parse(dataFromLocalstorage),
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
    const btcData = {
      time: timeConverter(response.last_updated),
      price: response.quote.USD.price,
      isoTime: response.last_updated,
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
