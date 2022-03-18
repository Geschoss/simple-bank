import { useParams } from 'react-router-dom';
import { UI } from 'shared';
import { Card } from 'domains';

export const Cards = () => {
  Card.Init.useInitCard();

  const { cardID } = useParams();

  return (
    <UI.Content>
      <main>
        <UI.Title>Cards</UI.Title>
        <Card.UI.Pagination />
        <Card.UI.List />
      </main>
    </UI.Content>
  );
};
