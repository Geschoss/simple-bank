import { FC, useCallback } from 'react';
import styles from './range.module.css';

export const Range: FC<{
  onChange: (payload: { type: string; value: string }) => void;
  name: string;
  from: string;
  to: string;
  type: string;
}> = ({ type, onChange, name, from, to }) => {
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
              type={type}
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
              type={type}
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
