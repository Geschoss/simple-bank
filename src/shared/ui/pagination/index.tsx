import { FC, useCallback } from 'react';
import cn from 'classnames';
import { array } from 'shared/lib';
import styles from './pagination.module.css';

export const Pagination: FC<{
  page: number;
  count: number;
  onClick: (page: number) => void;
}> = ({ page, count, onClick }) => {
  const handleClick = useCallback<
    React.MouseEventHandler<HTMLLIElement>
  >((event) => {
    // @ts-ignore react dont know that i have data-value
    const page = parseInt(event.target.dataset.value, 10);
    onClick(page);
  }, []);
  return (
    <ul className={styles.pagination}>
      {array.range(count).map((index) => {
        const value = index + 1;
        const active = page === value;
        return (
          <li
            className={cn(styles.item, { [styles.active]: active })}
            data-value={value}
            key={value}
            onClick={handleClick}
          >
            {`${value}`}
          </li>
        );
      })}
    </ul>
  );
};
