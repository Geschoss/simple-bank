import { FC, useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Model } from 'domains/card';
import { date } from 'shared/lib/helpers';
import { Actions } from './actions';
import styles from './card.module.css';

export const Card: FC<{ id: number }> = ({ id }) => {
  const { card, loading } = useStore(Model.card.$store);

  useEffect(() => {
    if (id > 0) {
      Model.card.fetch(id);
    }
  }, [id]);

  return (
    <div>
      <div className={styles.actions}>
        {!loading && card && <Actions cardID={card.cardID} />}
      </div>
      <div className={styles.root}>
        {loading ? (
          'loading...'
        ) : card ? (
          <div className={styles.card}>
            <div>
              <div className={styles.cardNumber}>
                {card.maskedCardNumber}
              </div>
              <div>{card.cardID}</div>
              <div>{date.format(card.expireDate)}</div>
            </div>
            <div className={styles.price}>
              <div className={cn(styles.balance)}>{card.balance}</div>
              <div className={styles.footer}>
                <div>{card.status}</div>
                <div>{card.currency}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
