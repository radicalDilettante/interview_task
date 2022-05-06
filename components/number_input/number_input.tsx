import React, { ChangeEventHandler } from "react";
import styles from "./number_input.module.css";
interface IProps {
  name: string;
  value: number;
  desc: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function NumberInput({ name, value, desc, onChange }: IProps) {
  return (
    <div>
      <p>{desc}</p>
      <div className={styles.item}>
        <div className={styles.input_wrapper}>
          <span>$</span>
          <input type="number" name={name} value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
