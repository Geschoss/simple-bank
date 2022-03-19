import { FC, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import { Model } from 'domains/transaction';
import { UI } from 'shared';
import { Filters } from '../filters';
import styles from './pagination.module.css';

export const Pagination: FC = () => {
  const [opened, toggleFilters] = useState(false);
  const filtersCount = useStore(Model.filters.$selectedFiltersCount);
  const { page, pageCount, loading } = useStore(
    Model.transactions.$store
  );

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
          {filtersCount > 0 && (
            <div className={styles.filter_bubble}>{filtersCount}</div>
          )}
        </div>
      </div>
      {opened && <Filters />}
    </div>
  );
};
