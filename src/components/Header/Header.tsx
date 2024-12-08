// src/components/Header/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Weather App</Link>
      </h1>
    </header>
  );
};

export default Header;
