import React from "react";
import styles from "./number_arr_item.module.css";

interface IProps {
  index: number;
  desc: string;
  num: number | undefined;
  setValue: Function;
  arr: (number | undefined)[];
  setArr: Function;
  periodArr?: (string | undefined)[];
  periodName?: string;
  setPeriodArr?: Function;
}

export default function NumberArrItem({
  index,
  desc,
  num,
  setValue,
  arr,
  setArr,
  periodName,
  periodArr,
  setPeriodArr,
}: IProps) {
  return (
    <div key={`${name} ${index}`}>
      <p>
        {desc} #{index + 1}
      </p>
      <div className={styles.item}>
        <div className={styles.input_wrapper}>
          <span>$</span>
          <input
            type="number"
            value={num}
            placeholder="0"
            onChange={(e) => {
              const { value } = e.target;
              const newArr = [...arr];
              newArr[index] = parseInt(value);
              setArr(newArr);
              setValue(name, newArr);
            }}
          />
        </div>
        <div className={styles.button_wrapper}>
          {periodName && (
            <select
              className={styles.select}
              name={periodName}
              onChange={(e) => {
                const { value } = e.target;
                const newArr = [...periodArr!];
                newArr[index] = value;
                setPeriodArr!(newArr);
                setValue(periodName, newArr);
              }}
            >
              <option value="year">per year</option>
              <option value="week">per week</option>
            </select>
          )}
          <button
            className={styles.delete_button}
            onClick={(e) => {
              e.preventDefault();
              const newArr = arr;
              newArr.splice(index, 1);
              setArr(newArr);
              setValue(name, newArr);

              if (periodName) {
                const newPeriodArr = periodArr;
                newPeriodArr!.splice(index, 1);
                setPeriodArr!(newPeriodArr);
                setValue(periodName!, newPeriodArr!);
              }
            }}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}
