import { FC } from 'react';
import cn from 'classnames';
import styles from './title.module.css';

export const Title: FC = ({ children }) => (
  <h2 className={cn(styles.title)}>{children}</h2>
);
