import cn from 'classnames';
import styles from './list.module.css';

export const Header = () => (
  <tr className={cn(styles.table_row, styles.table_row__heading)}>
    <th
      className={cn(
        styles.table_column,
        styles.table_column__heading,
        styles.table_column__date
      )}
    >
      Date
    </th>
    <th
      className={cn(
        styles.table_column,
        styles.table_column__heading,
        styles.table_column__full_width
      )}
    >
      Info
    </th>
    <th
      className={cn(
        styles.table_column,
        styles.table_column__heading
      )}
    >
      Price
    </th>
    {/* <th className={cn(styles.table_column, styles.table_column__heading)}>
      Номер ОМС
    </th> */}
  </tr>
);
