import { FC } from 'react';
import { useStore } from 'effector-react';
import styles from './list.module.css';
import { Row } from './row';
import { Header } from './header';
import { Model } from 'domains/transaction';

export const List: FC = () => {
  const { data } = useStore(Model.transactions.$store);

  return (
    <table className={styles.root}>
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
              transactionDate={transactionDate}
            />
          )
        )}
      </tbody>
    </table>
  );
};
