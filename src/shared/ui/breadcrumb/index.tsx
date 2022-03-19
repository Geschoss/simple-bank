import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './breadcrumb.module.css';

export const Breadcrumb: FC<{ to: string }> = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      className={cn(styles.breadcrumb, {
        [styles.breadcrumb__active]: active,
      })}
      to={to}
    >
      {children}
      {!active && (
        <span className={styles.breadcrumb_separator}>/</span>
      )}
    </Link>
  );
};
