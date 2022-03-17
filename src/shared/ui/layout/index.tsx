import { FC } from 'react';
import styles from './layout.module.css';

export const Layout: FC = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);
