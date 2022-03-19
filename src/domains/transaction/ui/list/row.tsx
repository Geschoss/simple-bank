import { FC } from 'react';
import cn from 'classnames';
import styles from './list.module.css';
import { Link } from 'react-router-dom';
import { date } from 'shared/lib/helpers';

export const Row: FC<{
  id: number;
  info: string;
  transactionDate: Date;
  amount: number;
  selected: boolean;
  currency: string;
}> = ({ id, info, transactionDate, amount, currency, selected }) => (
  <tr
    className={cn(styles.table_row, {
      [styles.table_row__selected]: selected,
    })}
  >
    <td className={cn(styles.table_column)}>
      {date.format(transactionDate)}
    </td>
    <td className={styles.table_column}>
      <div className={styles.table__info}>
        <Link
          className={styles.table_link}
          to={`/transactions/${id}`}
        >
          {info}
        </Link>
      </div>
    </td>
    <td className={cn(styles.table_column)}>
      <div
        className={cn(styles.amount, {
          [styles.amount__red]: amount < 0,
        })}
      >
        {amount}
      </div>
      <div>{currency}</div>
    </td>
  </tr>
);
