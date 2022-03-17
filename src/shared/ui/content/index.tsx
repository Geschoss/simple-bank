import { FC } from 'react';
import cn from 'classnames';
import styles from './content.module.css';

export const Content: FC = ({ children }) => {
  return (
    <div
      className={cn(
        styles.exercises,
        styles.content,
        styles.container
      )}
    >
      {children}
    </div>
  );
};
