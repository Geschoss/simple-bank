import { FC, useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Model } from 'domains/transaction';
import { date } from 'shared/lib/helpers';
import styles from './transaction.module.css';
import { Actions } from './actions';

export const Transaction: FC<{ id: number }> = ({ id }) => {
  const { transaction, loading } = useStore(Model.transaction.$store);

  useEffect(() => {
    Model.transaction.fetch(id);
  }, [id]);

  return (
    <div>
      <div className={styles.actions}>
        {!loading && transaction && (
          <Actions cardID={transaction.cardID} />
        )}
      </div>
      <div className={styles.root}>
        {loading ? (
          'loading...'
        ) : transaction ? (
          <div className={styles.transaction}>
            <div>
              <div>{transaction.merchantInfo}</div>
              <div>{transaction.transactionID}</div>
              <div>{date.format(transaction.transactionDate)}</div>
            </div>
            <div className={styles.price}>
              <div
                className={cn(styles.amount, {
                  [styles.amount__red]: transaction.amount < 0,
                })}
              >
                {transaction.amount}
              </div>
              <div>{transaction.currency}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
