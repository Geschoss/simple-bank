import { FC, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import styles from './filters.module.css';
import { Model } from 'domains/transaction';
import { UI } from 'shared';

export const Filters: FC = () => {
  const [opened, toggleFilters] = useState(false);
  const { page, pageCount } = useStore(Model.transactions.$store);

  const handlePageChange = useCallback((page: number) => {
    Model.pagination.paginate(page);
  }, []);

  const handleToggleFilters = useCallback(() => {
    toggleFilters((state) => !state);
  }, [toggleFilters]);

  return (
    <div>
      <div className={styles.pagination}>
        <UI.Pagination
          page={page}
          count={pageCount}
          onClick={handlePageChange}
        />
        <div className={styles.filter_button}>
          <UI.Button onClick={handleToggleFilters}>Filters</UI.Button>
        </div>
      </div>
      {opened && <div className={styles.filter}>Filters</div>}
    </div>
  );
};
