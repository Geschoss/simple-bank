import { FC, useCallback, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { useSearchParams } from 'react-router-dom';
import { Model } from 'domains/card';
import { Filter } from './filter';
import styles from './filters.module.css';
import { initValues, updateState } from './utils';

export const Filters: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [statusValues, setStatus] = useState<string[]>(
    initValues('status', searchParams)
  );
  const [currencyValues, setCurrency] = useState<string[]>(
    initValues('currency', searchParams)
  );
  const [cardIDValues, setCardID] = useState<string[]>(
    initValues('cardID', searchParams)
  );

  const { filters } = useStore(Model.filters.$store);
  const { status, currency, cardID } = filters;

  const handleStatusChanged = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { id } = event.target;
      const state = updateState(statusValues, id);
      setStatus(state);
    },
    [statusValues]
  );

  const handleCurrencyChanged = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { id } = event.target;
      const state = updateState(currencyValues, id);
      setCurrency(state);
    },
    [currencyValues]
  );

  const handleCardIDChanged = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { id } = event.target;
      const state = updateState(cardIDValues, id);
      setCardID(state);
    },
    [cardIDValues]
  );

  useEffect(() => {
    let searchParams: Record<string, string> = {};
    if (statusValues.length !== 0) {
      searchParams.status = statusValues.join(',');
    }

    if (currencyValues.length !== 0) {
      searchParams.currency = currencyValues.join(',');
    }
    if (cardIDValues.length !== 0) {
      searchParams.cardID = cardIDValues.join(',');
    }

    setSearchParams(searchParams);
  }, [statusValues, currencyValues, cardIDValues]);

  return (
    <div className={styles.filters}>
      <Filter
        name="status"
        filters={status}
        values={statusValues}
        onChange={handleStatusChanged}
      />

      <Filter
        name="currency"
        filters={currency}
        values={currencyValues}
        onChange={handleCurrencyChanged}
      />

      <Filter
        name="cardID"
        filters={cardID}
        values={cardIDValues}
        onChange={handleCardIDChanged}
      />
    </div>
  );
};
