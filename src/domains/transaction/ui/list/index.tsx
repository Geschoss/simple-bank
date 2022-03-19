import { FC } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';
import { Row } from './row';
import { Header } from './header';
import { Model } from 'domains/transaction';
import styles from './list.module.css';

export const List: FC<{ selectedId: number }> = ({ selectedId }) => {
  const { data, loading } = useStore(Model.transactions.$store);

  return (
    <table className={cn(styles.root, { [styles.loading]: loading })}>
      <tbody>
        <Header />
        {data.map(
          ({
            amount,
            currency,
            merchantInfo,
            transactionID,
            transactionDate,
          }) => (
            <Row
              key={transactionID}
              amount={amount}
              id={transactionID}
              info={merchantInfo}
              currency={currency}
              selected={selectedId === transactionID}
              transactionDate={transactionDate}
            />
          )
        )}
      </tbody>
    </table>
  );
};
