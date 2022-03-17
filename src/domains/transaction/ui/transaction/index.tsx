import { FC, useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Model } from 'domains/transaction';
import styles from './transaction.module.css';

export const Transaction: FC<{ id: number }> = ({ id }) => {
  const { data, loading } = useStore(Model.transaction.$store);

  useEffect(() => {
    Model.transaction.fetch(id);
  }, [id]);

  return (
    <div className={styles.root}>
      {loading ? (
        'loading...'
      ) : data ? (
        <div className={styles.transaction}>
          <div>{data.merchantInfo}</div>
          <div className={styles.price}>
            <div
              className={cn(styles.amount, {
                [styles.amount__red]: data.amount < 0,
              })}
            >
              {data.amount}
            </div>
            <div>{data.currency}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
