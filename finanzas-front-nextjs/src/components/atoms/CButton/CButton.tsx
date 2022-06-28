import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

import styles from './CButton.module.scss';

export const CButton = React.memo((props: any) => {
  const {
    label,
    loading = false,
    disable = false,
    colorSpinner = "#f1f0eb",
    ...rest
  } = props;

  return (
    <div className={styles.div}>
      <button
        className={`${styles.button} ${(disable || loading) && "disable"}`}
        disabled={disable || loading}
        {...rest}
      >
        {loading ? (
          <BeatLoader color={colorSpinner} loading={true} size={15} />
        ) : (
          label
        )}
      </button>
    </div>
  );
});

CButton.displayName = "CButton";
