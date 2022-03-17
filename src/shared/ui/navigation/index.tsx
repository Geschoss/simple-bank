import { FC } from 'react';
import cn from 'classnames';
import { Link, useLocation, Location } from 'react-router-dom';
import styles from './navigation.module.css';

const match = (url: string, { pathname }: Location) =>
  pathname.split('/')[1] === url;

const Item: FC<{ to: string }> = ({ to, children }) => {
  let location = useLocation();

  return (
    <Link
      className={cn(styles.item, {
        [styles.active]: match(to, location),
      })}
      to={to}
    >
      {children}
    </Link>
  );
};

export const Navigation: FC = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Item to="cards">Cards</Item>
        </li>
        <li>
          <Item to="transactions">Transactions</Item>
        </li>
      </ul>
    </nav>
  );
};
