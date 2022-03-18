import { FC, useCallback } from 'react';
import { useStore } from 'effector-react';
import { Model } from 'domains/card';
import { Card } from './card';
import styles from './list.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const List: FC<{ selectedId: number }> = ({ selectedId }) => {
  const { cards } = useStore(Model.cards.$store);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (cardID: number) => {
      navigate(`/cards/${cardID}${location.search}`);
    },
    [navigate, location]
  );

  return (
    <div className={styles.cards}>
      {cards.map((card) => {
        return (
          <Card
            key={card.cardID}
            card={card}
            selected={card.cardID === selectedId}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
};
