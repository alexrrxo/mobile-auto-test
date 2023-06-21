export type InitialState = {
  isFetching: boolean;
  errorMessage: string | null;
  priceSort: IPriceSort;
  dateSort: IDateSort;
  data: ICrypto[];
};

export type ICrypto = {
  id: string;
  isoTime: string;
  price: number;
  time: string;
};

export type IPriceSort = 'high' | 'low' | null;
export type IDateSort = 'later' | 'earlier' | null;
