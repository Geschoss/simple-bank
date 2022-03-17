import { FC, useCallback } from 'react';
import cn from 'classnames';
import { Typings } from 'domains/card';
import styles from './list.module.css';
import { CardLogo } from './cardLogo';

// TODO
const currentDate = new Date();
const getStatus = ({ expireDate, status }: Typings.Card) => {
  if (currentDate > expireDate) {
    return 'expired';
  }
  if (status === 'blocked') {
    return 'blocked';
  }

  return '';
};

export const Card: FC<{
  card: Typings.Card;
  onClick: (id: number) => void;
}> = ({ card, onClick }) => {
  const { cardID, maskedCardNumber, balance } = card;
  const status = getStatus(card);
  const handleClick = useCallback(() => {
    onClick(cardID);
  }, [cardID, onClick]);

  return (
    <div
      className={cn(styles.card, styles[`status__${status}`])}
      onClick={handleClick}
    >
      <div>
        <div className={styles.title}>
          <div>_Bank</div>
          {status && <div className={styles.blocked}>{status}</div>}
        </div>
        <div>{maskedCardNumber}</div>
      </div>
      <div className={styles.footer}>
        <CardLogo />
        <div className={styles.balance}>{balance}</div>
      </div>
    </div>
  );
};
