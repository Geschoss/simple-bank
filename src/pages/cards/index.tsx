import { useParams } from 'react-router-dom';
import { Card } from 'domains';
import { UI } from 'shared';

export const Cards = () => {
  const { cardID } = useParams();

  return (
    <UI.Content>
      <main>
        <UI.Title>Cards</UI.Title>
        <Card.UI.Filters />
        <Card.UI.List />
      </main>
    </UI.Content>
  );
};
