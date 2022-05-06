import React from "react";
import styles from "./toggle_button_item.module.css";

interface IProps {
  status: string;
  keyValue: boolean;
  currentValue: boolean;
  setValue: Function;
}

export default function ToggleButtonItem({
  status,
  keyValue,
  currentValue,
  setValue,
}: IProps) {
  return (
    <div
      className={`${styles.container} ${
        currentValue == keyValue ? styles.activated : styles.deactivated
      }`}
      onClick={() => {
        setValue(keyValue);
      }}
    >
      {status}
    </div>
  );
}
