import { FC, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import { Model } from 'domains/card';
import { UI } from 'shared';
import styles from './filters.module.css';

export const Filters: FC = () => {
  const [opened, toggleFilters] = useState(false);
  const { page, pageCount, loading } = useStore(Model.cards.$store);

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
          <UI.Button onClick={handleToggleFilters}>
            {loading ? 'Loading...' : 'Filters'}
          </UI.Button>
        </div>
      </div>
      {opened && <div className={styles.filter}>Filters</div>}
    </div>
  );
};
