import React, { useEffect, useState } from "react";
import styles from "./number_arr_input.module.css";
interface IProps {
  name: string;
  value: (number | undefined)[];
  desc: string;
  setValue: Function;
  periodName?: string;
  periodValue?: string[];
}

export default function NumberArrInput({
  name,
  value,
  desc,
  setValue,
  periodName,
  periodValue,
}: IProps) {
  const [arr, setArr] = useState(value);
  const [periodArr, setPeriodArr] = useState(periodValue);

  useEffect(() => {
    setValue(name, arr);
  }, [arr]);

  return (
    <div>
      {arr.map((num, index) => (
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
                    setPeriodArr(newArr);
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
                    setPeriodArr(newPeriodArr);
                    setValue(periodName!, newPeriodArr!);
                  }
                }}
              >
                x
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        className={styles.add_button}
        onClick={(e) => {
          e.preventDefault();
          const newArr = arr;
          newArr.push(undefined);
          setArr(newArr);
          setValue(name, newArr);

          if (periodName) {
            const newPeriodArr = periodArr;
            newPeriodArr?.push("year");
            setPeriodArr(newPeriodArr);
            setValue(periodName!, newPeriodArr!);
          }
        }}
      >
        Add {name}
      </button>
    </div>
  );
}
