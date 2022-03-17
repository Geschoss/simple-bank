import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Transaction } from 'domains';
import { UI } from 'shared';
import styles from './transaction.module.css';

export const Transactions = memo(() => {
  const { transactionID } = useParams();

  return (
    <UI.Content>
      <main>
        <UI.Title>Transactions</UI.Title>
        <Transaction.UI.Filters />
        <Transaction.UI.List />
      </main>
      <aside className={styles.aside}>
        {transactionID && (
          <Transaction.UI.Transaction
            id={parseInt(transactionID, 10)}
          />
        )}
      </aside>
    </UI.Content>
  );
});
