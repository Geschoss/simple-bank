import { FC, useCallback } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Model } from 'domains/card';
import { Card } from './card';
import { useNavigate } from 'react-router-dom';
import styles from './list.module.css';

export const List: FC = () => {
  const { cards, loading } = useStore(Model.cards.$store);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (cardID: number) => {
      navigate(`/cards/${cardID}`);
    },
    [navigate]
  );

  return (
    <div className={cn(styles.cards, { [styles.loading]: loading })}>
      {cards.map((card) => (
        <Card key={card.cardID} card={card} onClick={handleClick} />
      ))}
    </div>
  );
};
