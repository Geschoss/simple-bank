import { FC } from 'react';
import cn from 'classnames';
import styles from './title.module.css';

export const Title: FC = ({ children }) => {
  return <h1 className={cn(styles.title)}>{children}</h1>;
};
