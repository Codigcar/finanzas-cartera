import React from "react";

import Image from "next/image";

import styles from "./CLayout.module.scss";

export const CLayout = ({ children }: any) => {
  return (
    <>
      <header className={styles.navbar}>Logo</header>
      <div className={styles.body}>{children}</div>
      <footer>&copy;</footer>
    </>
  );
};
