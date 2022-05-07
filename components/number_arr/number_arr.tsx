import React, { useEffect, useState } from "react";
import NumberArrItem from "../number_arr_item/number_arr_item";
import styles from "./number_arr.module.css";
interface IProps {
  name: string;
  value: (number | undefined)[];
  desc: string;
  setValue: Function;
  periodName?: string;
  periodValue?: (string | undefined)[];
}

export default function NumberArr({
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
        <NumberArrItem
          key={`${name} ${index}`}
          index={index}
          desc={desc}
          num={num}
          arr={arr}
          setArr={setArr}
          periodArr={periodArr}
          setPeriodArr={setPeriodArr}
          setValue={setValue}
        />
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
