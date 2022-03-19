import { FC } from 'react';
import styles from './checkbox.module.css';

export const Checkboxs: FC<{
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  filters: string[] | number[];
  values: string[] | number[];
}> = ({ onChange, filters, name, values }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.filterName}>{name}</div>
      <div className={styles.checkboxs}>
        {filters.map((value) => {
          return (
            <div key={value} className={styles.checkbox}>
              <label htmlFor={`${value}`}>
                <input
                  type="checkbox"
                  id={`${value}`}
                  // @ts-ignore //TODO think about types
                  checked={values.includes(`${value}`)}
                  onChange={onChange}
                />
                {value}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
