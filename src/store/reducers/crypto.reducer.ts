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

    console.log(response.last_updated);

    const btcData = {
      time: timeConverter(response.last_updated),
      price: response.quote.USD.price,
      isoTime: response.last_updated,
    };

    const localData = localStorage.getItem('btcData');
    debugger;
    if (!localData) {
      debugger;
      localStorage.setItem('btcData', JSON.stringify([btcData]));
    } else {
      // const updatedBtcData = JSON.parse(localData).push(btcData);
      const updatedBtcData = JSON.parse(localData);
      updatedBtcData.push({ ...btcData });
      debugger;
      localStorage.setItem('btcData', JSON.stringify(updatedBtcData));
    }

    return dispatch({ type: GET_DATA, payload: btcData });
  };
};

export default cryptoReducer;
