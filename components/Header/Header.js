import React, { useState } from "react";
import styles from '../Header/Header.module.css';
import { signOut } from "next-auth/react";


export default function Header() {
  return (
    <header>
      <div className={styles.header}>
        <h1 className={styles.title}>Julie&apos;s Gardening Blog</h1>
        <p className={styles.logout} onClick={signOut}>
          Logout
        </p>
      </div>
    </header>
  );
}
