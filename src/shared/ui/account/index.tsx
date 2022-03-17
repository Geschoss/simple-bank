import { User } from 'domains';
import { FC } from 'react';
import styles from './account.module.css';

export const Account: FC<{ user: User.Typings.User }> = ({
  user,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <span>{user.fullName}</span>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.avatar}
        >
          <rect width="40" height="40" rx="20" fill="#3c50e0"></rect>{' '}
          <rect
            x="-10"
            y="10"
            width="40"
            height="5"
            fill="#071838"
            transform="translate(2 -2) rotate(134 20 20)"
          ></rect>{' '}
          <circle
            cx="20"
            cy="20"
            fill="#7c25c8"
            r="8"
            transform="translate(-1 -1)"
          ></circle>{' '}
          <line
            x1="0"
            y1="20"
            x2="40"
            y2="20"
            strokeWidth="2"
            stroke="#ffffff"
            transform="translate(0 0) rotate(268 20 20)"
          ></line>
        </svg>
      </div>
    </div>
  );
};
