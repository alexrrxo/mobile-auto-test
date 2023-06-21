export type InitialState = {
  isFetching: boolean;
  errorMessage: string | null;
  priceSort: IPriceSort;
  dateSort: IDateSort;
  data: ICrypto[];
};

export type ICrypto = {
  id: string;
  timeStamp: number;
  price: number;
  time: string;
};

export type IPriceSort = 'high' | 'low' | null;
export type IDateSort = 'later' | 'earlier' | null;
