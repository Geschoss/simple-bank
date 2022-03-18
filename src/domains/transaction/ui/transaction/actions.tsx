import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI } from 'shared';

export const Actions: FC<{ cardID: number }> = ({ cardID }) => {
  const navigate = useNavigate();

  const handleGoCard = useCallback(() => {
    navigate(`/cards/${cardID}`);
  }, [cardID, navigate]);

  return (
    <div>
      <UI.Button onClick={handleGoCard}>Go to card</UI.Button>
    </div>
  );
};
