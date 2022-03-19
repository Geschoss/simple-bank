import { Transaction } from 'domains';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI } from 'shared';

export const Actions: FC<{ cardID: number }> = ({ cardID }) => {
  const navigate = useNavigate();

  const handleGoCard = useCallback(() => {
    Transaction.Model.filters.cardSelected(`${cardID}`);
    navigate(`/transactions`);
  }, [navigate, cardID]);

  return (
    <div>
      <UI.Button onClick={handleGoCard}>
        Show card transactions
      </UI.Button>
    </div>
  );
};
