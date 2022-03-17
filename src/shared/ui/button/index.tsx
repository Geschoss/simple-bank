import { FC, MouseEventHandler } from 'react';
import cn from 'classnames';
import styles from './button.module.css';

export const Button: FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(styles.button, styles.button__blue)}
    >
      {children}
    </button>
  );
};
