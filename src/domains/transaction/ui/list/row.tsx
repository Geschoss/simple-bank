import { FC } from 'react';
import cn from 'classnames';
import styles from './list.module.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../common/date';

export const Row: FC<{
  id: number;
  info: string;
  date: Date;
  amount: number;
  currency: string;
}> = ({ id, info, date, amount, currency }) => (
  <tr className={styles.table_row}>
    <td className={cn(styles.table_column)}>{formatDate(date)}</td>
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
