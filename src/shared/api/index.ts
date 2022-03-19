import { fakeAxios } from './server';

// axios type
type HTTP = {
  post<R>(url: string, payload?: Record<string, any>): Promise<R>;
};

const apiSDK = (http: HTTP) => {
  // somethink like token
  let cardAccount = -1;
  return {
    post<R>(url: string, payload?: Record<string, any>) {
      return http.post<R>(url, { ...payload, cardAccount });
    },
    setToken(token) {
      cardAccount = token;
    },
  };
};

export const api = apiSDK(fakeAxios);
