import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FunctionLogo.module.css';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Link to="/" className={styles.logoLink}>
        <h1 className={styles.logo}>
          <span className={styles.dark}>Dark</span>
          <span className={styles.hosting}>Hosting</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;