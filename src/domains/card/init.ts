import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Model } from '.';

export const useInitCard = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let filters: Record<string, string[] | number[]> = {};
    const status = searchParams.get('status');
    if (status) {
      filters.status = status.split(',');
    }

    const currency = searchParams.get('currency');
    if (currency) {
      filters.currency = currency.split(',');
    }

    const cardID = searchParams.get('cardID');
    if (cardID) {
      filters.cardID = cardID
        .split(',')
        .map((value) => parseInt(value, 10));
    }

    Model.cards.init(filters);
    Model.filters.fetchFilters();

    return () => {
      Model.cards.reset();
    };
  }, [searchParams]);
};
