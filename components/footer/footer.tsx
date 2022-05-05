import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const date = new Date();
  return (
    <footer className={styles.container}>
      (C) {date.getFullYear()}. Wayne Choi. All rights reserved.
    </footer>
  );
}
