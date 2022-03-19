import { FC, useCallback } from 'react';
import cn from 'classnames';
import { Typings } from 'domains/card';
import styles from './card.module.css';
import { UI } from 'shared';

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
  const { cardID, maskedCardNumber, balance, currency } = card;

  const status = getStatus(card);
  const handleClick = useCallback(() => {
    onClick(cardID);
  }, [cardID, onClick]);

  return (
    <div
      className={cn(
        styles.card,
        styles[`status__${status}`],
        styles[`currency__${currency}`]
      )}
      onClick={handleClick}
    >
      <div>
        <div className={styles.header}>
          <div className={styles.title}>_Bank</div>
          {status && <div className={styles.blocked}>{status}</div>}
        </div>
        <div>{cardID}</div>
        <div>{maskedCardNumber}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.cardLogo}>
          <UI.Icons.CardLogo />
        </div>
        <div className={styles.currency}>{currency}</div>
        <div className={styles.balance}>{balance}</div>
      </div>
    </div>
  );
};
