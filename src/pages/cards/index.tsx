import { memo } from 'react';
import { UI } from 'shared';
import { Card } from 'domains';
import styles from './cards.module.css';

export const CardsPage = memo(() => (
  <UI.Content>
    <main>
      <div>
        <UI.Breadcrumb to={`/cards`}>Cards</UI.Breadcrumb>
      </div>
      <Card.UI.Pagination />
      <Card.UI.List />
    </main>
    <aside className={styles.aside}>
      <div className={styles.ad}>Try our new credit!</div>
    </aside>
  </UI.Content>
));
