import React, { ChangeEventHandler } from "react";
import styles from "./number_input.module.css";
interface IProps {
  name: string;
  value: number | undefined;
  desc: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  periodName?: string;
  onChangePeriod?: ChangeEventHandler<HTMLSelectElement>;
}

export default function NumberInput({
  name,
  value,
  desc,
  onChange,
  periodName,
  onChangePeriod,
}: IProps) {
  return (
    <div>
      <p>{desc}</p>
      <div className={styles.item}>
        <div className={styles.input_wrapper}>
          <span>$</span>
          <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            placeholder="0"
          />
        </div>
        {periodName && (
          <select
            className={styles.select}
            name={periodName}
            onChange={onChangePeriod}
          >
            <option value="year">per year</option>
            <option value="week">per week</option>
          </select>
        )}
      </div>
    </div>
  );
}
