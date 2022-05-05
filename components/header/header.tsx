import Link from "next/link";
import React from "react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1>Calculator</h1>
    </header>
  );
}
