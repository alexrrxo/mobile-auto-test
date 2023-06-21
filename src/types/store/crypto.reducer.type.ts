export type InitialState = {
  isFetching: boolean;
  errorMessage: string | null;
  data: ICrypto[];
};

export type ICrypto = {
  isoTime: string;
  price: number;
  time: string;
};
