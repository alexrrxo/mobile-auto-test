import { timeConverter } from '../../helpers/timeConverter';
import { coinMarketApi } from './../../api/coinMarketApi';

const initialState = {
  isFetching: true,
  errorMessage: '',
  data: [],
};

const GET_DATA = 'GET_DATA';

const cryptoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_DATA: {
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
      timeStamp: timeConverter(response.last_updated),
      price: response.quote.USD.price,
    };

    const localData = localStorage.getItem('btcData');
    debugger;
    if (!localData) {
      debugger;
      localStorage.setItem('btcData', JSON.stringify([btcData]));
    } else {
      debugger;
      const updatedBtcData = JSON.parse(localData).push(btcData);
      localStorage.setItem('btcData', JSON.stringify([updatedBtcData]));
    }

    return dispatch({ type: GET_DATA, payload: btcData });
  };
};

export default cryptoReducer;
