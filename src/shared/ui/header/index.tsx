import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './header.module.css';

const useScroll = () => {
  const [isSmall, setSmall] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      const yOffset = window.pageYOffset;
      if (isSmall && yOffset < 20) {
        setSmall(false);
        return;
      }
      if (!isSmall && yOffset > 20) {
        setSmall(true);
        return;
      }
    };
  }, [isSmall]);

  return isSmall;
};

export const Header: FC = ({ children }) => {
  const isSmall = useScroll();
  return (
    <div className={styles.navigation}>
      <header
        className={cn(styles.header, {
          [styles.header__small]: isSmall,
        })}
      >
        <div
          className={cn(
            styles.container,
            styles.header__container,
            styles.container__full_width
          )}
        >
          {children}
        </div>
      </header>
    </div>
  );
};
