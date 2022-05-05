import React, { ReactChild } from "react";

import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./style.module.css";

interface IProps {
  children: ReactChild;
}

export default function Layout({ children }: IProps) {
  return (
    <div className={styles.container}>
      <Header />
      <section>{children}</section>
      <Footer />
    </div>
  );
}
