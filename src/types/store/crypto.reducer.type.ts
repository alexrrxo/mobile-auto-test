export type InitialState = {
  priceSort: IPriceSort;
  dateSort: IDateSort;
  totalNotes: number;
  currentPage: number;
  limit: number;
  updateInterval: number;
  pageData: ICrypto[];
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
