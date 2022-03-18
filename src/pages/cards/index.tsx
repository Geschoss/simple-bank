import { useParams } from 'react-router-dom';
import { UI } from 'shared';
import { Card } from 'domains';
import styles from './cards.module.css';

export const Cards = () => {
  Card.Init.useInitCard();

  const { cardID = '-1' } = useParams();
  const id = parseInt(cardID, 10);

  return (
    <UI.Content>
      <main>
        <UI.Title>Cards</UI.Title>
        <Card.UI.Pagination />
        <Card.UI.List selectedId={id} />
      </main>
      <aside className={styles.aside}>
        {id > 0 && <Card.UI.Card id={id} />}
      </aside>
    </UI.Content>
  );
};
