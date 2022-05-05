import React, { ChangeEventHandler, useEffect, useState } from "react";

interface IProps {
  name: string;
  value: number[];
  desc: string;
  setValue: (name: string, value: number[]) => void;
}

export default function NumberArrInput({
  name,
  value,
  desc,
  setValue,
}: IProps) {
  const [arr, setArr] = useState(value);

  useEffect(() => {
    setValue(name, arr);
  }, [arr]);

  return (
    <div>
      <p>{desc}</p>
      {arr.map((num, index) => (
        <div key={`${name} ${index}`}>
          <input
            type="number"
            value={num}
            onChange={(e) => {
              const { value } = e.target;
              const newArr = [...arr];
              newArr[index] = parseInt(value);
              setArr(newArr);
              setValue(name, newArr);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              const newArr = arr;
              newArr.splice(index, 1);
              setArr(newArr);
              setValue(name, newArr);
            }}
          >
            x
          </button>
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          const newArr = arr;
          newArr.push(0);
          setArr(newArr);
          setValue(name, newArr);
        }}
      />
    </div>
  );
}
