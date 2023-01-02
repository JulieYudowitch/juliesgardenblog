import React, { useState } from "react";
import styles from '../Header/Header.module.css';



export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Julie&apos;s Gardening Blog</h1>
      <h3>This is a place to celebrate all things plants.</h3>
    </header>
  );
}
