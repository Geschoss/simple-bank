import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Transaction } from 'domains';
import { UI } from 'shared';
import styles from './transaction.module.css';

export const Transactions = memo(() => {
  const { transactionID = '-1' } = useParams();
  const id = parseInt(transactionID, 10);

  return (
    <UI.Content>
      <main>
        <UI.Breadcrumb to="/transactions">Transactions</UI.Breadcrumb>
        {id > 0 && (
          <UI.Breadcrumb to={`/transactions/${id}`}>
            {id}
          </UI.Breadcrumb>
        )}
        <Transaction.UI.Pagination />
        <Transaction.UI.List selectedId={id} />
      </main>
      <aside className={styles.aside}>
        {id > 0 && (
          <Transaction.UI.Transaction
            id={parseInt(transactionID, 10)}
          />
        )}
      </aside>
    </UI.Content>
  );
});
