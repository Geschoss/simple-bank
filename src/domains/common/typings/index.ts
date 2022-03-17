export type Currency = 'AZN' | 'EUR' | 'USD';

export type Pagination<R> = {
  page: number;
  pageCount: number;
  data: R[];
};
