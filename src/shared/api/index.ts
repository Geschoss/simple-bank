import { transactions, user } from './mocks';

type HTTP = {
  post<R>(url: string, payload?: Record<string, any>): Promise<R>;
};

const apiSDK = (http: HTTP) => {
  return {
    post<R>(url: string, payload?: Record<string, any>) {
      return http.post<R>(url, payload);
    },
  };
};

// MOCKS
const transactionsPerPage = 10;
const fakeEndpoinst = {
  '/user': () => user,
  '/transaction': (_, { id }) => {
    return transactions.find(
      (transaction) => transaction.transactionID === id
    );
  },
  '/transactions': (_, { page = 1 }) => {
    return {
      page,
      pageCount: Math.ceil(transactions.length / transactionsPerPage),
      data: transactions.slice(
        (page - 1) * transactionsPerPage,
        page * transactionsPerPage
      ),
    };
  },
};

const fakeAxios = {
  post<R>(url: string, payload: Record<string, any> = {}) {
    const endpoin = fakeEndpoinst[url];
    if (!endpoin) {
      throw new Error(`Cant find endpoints ${url}`);
    }
    const response: R = endpoin(url, payload);
    console.log(`fetch: ${url}`);
    console.log({ response });
    return new Promise<R>((res) => {
      setTimeout(() => {
        res(response);
      }, 300);
    });
  },
};
// MOCKS

export const api = apiSDK(fakeAxios);
