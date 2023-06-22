import axios from 'axios';

const instance = axios.create({
  headers: {
    'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL:
    'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
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
