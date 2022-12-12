import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from '../Header/Header.module.css';
import { CgProfile } from 'react-icons/cg';

export default function Header() {
  return (
    <header>
        <div className={styles.header}>
          <h1 className={styles.title}>Julie Yudowitch Gardening Blog</h1>
          <i className={styles.profileIcon}>
            <CgProfile size={30} />
          </i>
        </div>
    </header>
  );
}
