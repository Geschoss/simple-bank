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
  const dateValues = useStore(Model.filters.$dateValues);
  const amountValues = useStore(Model.filters.$amountValues);

  const handleCurrencyChanged = useCallback<CB>(({ target }) => {
    Model.filters.currencyChanged(target.id);
  }, []);

  const handleCardIDChanged = useCallback<CB>(({ target }) => {
    Model.filters.cardIDCahnged(target.id);
  }, []);

  const handleDateChange = useCallback((payload) => {
    Model.filters.dateChanged(payload);
  }, []);

  const handleAmountChange = useCallback((payload) => {
    console.log({ payload });
    Model.filters.amountChanged(payload);
  }, []);

  return (
    <div className={styles.filters}>
      <UI.Range
        type="number"
        name="amount"
        from={amountValues[0]}
        to={amountValues[1]}
        onChange={handleAmountChange}
      />

      <UI.Range
        type="date"
        name="date"
        from={dateValues[0]}
        to={dateValues[1]}
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
