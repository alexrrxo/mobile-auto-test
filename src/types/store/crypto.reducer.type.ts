export type InitialState = {
  sortedBy: PriceSort | DateSort;
  totalNotes: number;
  currentPage: number;
  limit: number;
  updateInterval: number;
  pageData: ICrypto[];
  data: ICrypto[];
  timerId: number | null;
};

// type setTimeoutType = ReturnType<typeof setTimeout>;
export type ICrypto = {
  id: string;
  timeStamp: number;
  price: number;
  date: string;
};

export type PriceSort = 'high' | 'low';
export type DateSort = 'later' | 'earlier';
