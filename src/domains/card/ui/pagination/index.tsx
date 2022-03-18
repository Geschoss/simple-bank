import { FC, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Model } from 'domains/card';
import { Filters } from '../filters';
import { UI } from 'shared';
import styles from './pagination.module.css';

export const Pagination: FC = () => {
  const location = useLocation();
  const hasFilters = location.search !== '';

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
          {hasFilters && <div className={styles.filter_buble} />}
        </div>
      </div>
      {opened && <Filters />}
    </div>
  );
};
