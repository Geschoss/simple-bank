import { FC, useCallback } from 'react';
import { useStore } from 'effector-react';
import { Model } from 'domains/card';
import { Card } from './card';
import styles from './list.module.css';
import { useNavigate } from 'react-router-dom';

export const List: FC = () => {
  const { data } = useStore(Model.cards.$store);
  let navigate = useNavigate();

  const handleClick = useCallback(
    (cardID: number) => {
      navigate(`/cards/${cardID}`);
    },
    [navigate]
  );

  return (
    <div className={styles.cards}>
      {data.map((card) => {
        return (
          <Card key={card.cardID} card={card} onClick={handleClick} />
        );
      })}
    </div>
  );
};
