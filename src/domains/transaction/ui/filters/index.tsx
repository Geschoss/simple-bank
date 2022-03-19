import { FC, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import { Model } from 'domains/transaction';
import { UI } from 'shared';
import styles from './filters.module.css';

type CB = React.ChangeEventHandler<HTMLInputElement>;

export const Filters: FC = () => {
  const { filters } = useStore(Model.filters.$filters);
  const { currency, cardID } = filters;

  const cardIDValues = useStore(Model.filters.$cardIDValues);
  const currencyValues = useStore(Model.filters.$currencyValues);
  const [from, to] = useStore(Model.filters.$dateValues);

  const handleCurrencyChanged = useCallback<CB>(({ target }) => {
    Model.filters.currencyChanged(target.id);
  }, []);

  const handleCardIDChanged = useCallback<CB>(({ target }) => {
    Model.filters.cardIDCahnged(target.id);
  }, []);

  const handleDateChange = useCallback((payload) => {
    Model.filters.dateChanged(payload);
  }, []);

  return (
    <div className={styles.filters}>
      <UI.Date
        name="date"
        to={to}
        from={from}
        onChange={handleDateChange}
      />

      <UI.Checkboxs
        name="currency"
        filters={currency}
        values={currencyValues}
        onChange={handleCurrencyChanged}
      />

      <UI.Checkboxs
        name="cardID"
        filters={cardID}
        values={cardIDValues}
        onChange={handleCardIDChanged}
      />
    </div>
  );
};
