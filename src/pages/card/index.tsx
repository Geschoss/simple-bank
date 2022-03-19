import { useParams } from 'react-router-dom';
import { UI } from 'shared';
import { Card } from 'domains';

export const CardPage = () => {
  const { cardID = '-1' } = useParams();
  const id = parseInt(cardID, 10);

  return (
    <UI.Content>
      <main>
        <div>
          <UI.Breadcrumb to={`/cards`}>Cards</UI.Breadcrumb>
          <UI.Breadcrumb to={`/cards/${id}`}>{id}</UI.Breadcrumb>
        </div>
        <Card.UI.Card id={id} />
      </main>
    </UI.Content>
  );
};
