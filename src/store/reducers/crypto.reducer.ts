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
        data: [...state.data, action],
      };
    }
    default:
      return state;
  }
};

export const getData = () => {
  return async (dispatch: any) => {
    const response = await coinMarketApi.getData();

    debugger;
    dispatch({ type: GET_DATA, action: response });
  };
};

export default cryptoReducer;
