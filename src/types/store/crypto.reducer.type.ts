export type InitialState = {
  sortedBy: PriceSort | DateSort;
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

export type PriceSort = 'high' | 'low';
export type DateSort = 'later' | 'earlier';
