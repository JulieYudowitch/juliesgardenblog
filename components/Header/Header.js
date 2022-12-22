import React, { useState } from "react";
import styles from '../Header/Header.module.css';



export default function Header() {
  return (
    <header>
      <div className={styles.header}>
        <h1 className={styles.title}>Julie&apos;s Gardening Blog</h1>
      </div>
    </header>
  );
}
