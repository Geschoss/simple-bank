import { FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import styles from './list.module.css';
import { Row } from './row';
import { Header } from './header';
import { Model } from 'domains/transaction';

export const List: FC = () => {
  const { data } = useStore(Model.transactions.$store);

  useEffect(() => {
    Model.transactions.init();
    return () => {
      Model.transactions.reset();
    };
  }, []);

  return (
    <table className={styles.root}>
      <tbody>
        <Header />
        {data.map(
          ({
            transactionID,
            transactionDate,
            merchantInfo,
            amount,
            currency,
          }) => (
            <Row
              key={transactionID}
              id={transactionID}
              info={merchantInfo}
              date={transactionDate}
              amount={amount}
              currency={currency}
            />
          )
        )}
      </tbody>
    </table>
  );
};
