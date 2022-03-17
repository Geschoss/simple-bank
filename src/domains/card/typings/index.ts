import { Currency } from 'domains/common';

export type Card = {
  cardID: number;
  cardAccount: number;
  maskedCardNumber: string;
  expireDate: string;
  currency: Currency;
  status: 'active' | 'blocked';
  balance: number;
};
