import React, { ChangeEventHandler } from "react";

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
      <input type="number" name={name} value={value} onChange={onChange} />
    </div>
  );
}
