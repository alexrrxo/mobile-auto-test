import axios from 'axios';

const instance = axios.create({
  headers: {
    'X-CMC_PRO_API_KEY': '43d28735-e5b2-4456-890b-25d0c9e70c6a',
  },
  baseURL:
    'https://coin-realy.mobilauto.com.ua/v1/cryptocurrency/quotes/latest',
  params: {
    symbol: 'BTC',
  },
});

class CoinMarketApi {
  async getData() {
    try {
      const response = await instance.get('');
      if (response.status === 200) {
        return response.data.data.BTC;
      }
    } catch (error) {
      return error;
    }
  }
}

export const coinMarketApi = new CoinMarketApi();
