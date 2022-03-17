import { FC } from 'react';
import styles from './logo.module.css';

export const Logo: FC = ({ children }) => {
  return (
    <a href="/" className={styles.logo}>
      {children}
    </a>
  );
};
