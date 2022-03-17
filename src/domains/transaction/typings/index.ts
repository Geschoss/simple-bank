export type Transaction = {
  transactionID: number;
  cardAccount: number;
  cardID: number;
  amount: number;
  currency: 'AZN' | 'EUR' | 'USD';
  transactionDate: Date;
  merchantInfo: string;
};
