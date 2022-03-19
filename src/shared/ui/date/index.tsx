import { FC, useCallback } from 'react';
import styles from './date.module.css';

export const Date: FC<{
  onChange: (payload: { type: string; value: string }) => void;
  name: string;
  from: string;
  to: string;
}> = ({ onChange, name, from, to }) => {
  const handleDateChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    ({ target }) => {
      onChange({ type: target.id, value: target.value });
    },
    [onChange]
  );

  return (
    <div className={styles.filter}>
      <div className={styles.filterName}>{name}</div>
      <div className={styles.range}>
        <div className={styles.date}>
          <label htmlFor="from">
            from:
            <input
              type="date"
              id="from"
              value={from}
              onChange={handleDateChange}
            ></input>
          </label>
        </div>
        <div className={styles.date}>
          <label htmlFor="to">
            to:
            <input
              type="date"
              id="to"
              value={to}
              onChange={handleDateChange}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
};
