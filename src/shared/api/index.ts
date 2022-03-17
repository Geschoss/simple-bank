import { fakeAxios } from './mocks';

// axios type
type HTTP = {
  post<R>(url: string, payload?: Record<string, any>): Promise<R>;
};

const apiSDK = (http: HTTP) => {
  // somethinf like token
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
